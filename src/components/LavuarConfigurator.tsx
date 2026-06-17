"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ConfiguratorTile = {
  name: string;
  img: string | null;
  slug: string;
};

type Props = {
  tiles: ConfiguratorTile[];
  labels: {
    hint: string;
    finishLabel: string;
    defaultWhite: string;
    loading: string;
  };
};

export function LavuarConfigurator({ tiles, labels }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // -1 = alb default
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // ref catre functia de aplicare finisaj (setata in useEffect)
  const applyFinishRef = useRef<((tile: ConfiguratorTile | null) => void) | null>(null);

  // Verifica daca se poate face scroll stanga/dreapta (pentru sageti pe desktop)
  const updateScrollState = () => {
    const el = swatchRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = swatchRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [tiles.length]);

  const scrollSwatches = (dir: 1 | -1) => {
    const el = swatchRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let disposed = false;
    let rafId = 0;

    /* ============ texturi procedurale (doar albul default) ============ */
    function canvasTex(draw: (g: CanvasRenderingContext2D, s: number) => void) {
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      draw(c.getContext("2d")!, 512);
      return c;
    }
    function plain(color: string, grain: boolean) {
      return canvasTex((g, s) => {
        g.fillStyle = color;
        g.fillRect(0, 0, s, s);
        if (grain) {
          for (let i = 0; i < 5000; i++) {
            g.fillStyle = "rgba(0,0,0," + Math.random() * 0.045 + ")";
            g.fillRect(Math.random() * s, Math.random() * s, 1.4, 1.4);
          }
          for (let i = 0; i < 2500; i++) {
            g.fillStyle = "rgba(255,255,255," + Math.random() * 0.05 + ")";
            g.fillRect(Math.random() * s, Math.random() * s, 1.4, 1.4);
          }
        }
      });
    }
    function plaster() {
      return canvasTex((g, s) => {
        g.fillStyle = "#cfc8bf";
        g.fillRect(0, 0, s, s);
        for (let i = 0; i < 7000; i++) {
          const a = Math.random() * 0.05;
          g.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255," + a + ")" : "rgba(90,80,70," + a + ")";
          g.fillRect(Math.random() * s, Math.random() * s, 2, 2);
        }
      });
    }
    function floorTiles() {
      return canvasTex((g, s) => {
        g.fillStyle = "#d6d2cc";
        g.fillRect(0, 0, s, s);
        for (let i = 0; i < 4000; i++) {
          g.fillStyle = "rgba(120,115,108," + Math.random() * 0.05 + ")";
          g.fillRect(Math.random() * s, Math.random() * s, 2, 2);
        }
        g.strokeStyle = "rgba(120,115,108,.45)";
        g.lineWidth = 2;
        g.strokeRect(0, 0, s, s);
      });
    }

    /* ============ renderer & scenă ============ */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb9b3ab);
    scene.fog = new THREE.Fog(0xb9b3ab, 6, 14);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);

    // mediu pentru reflexii
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x666260);
    ([[0, 4, 0, 5, 5], [3, 2, 3, 3, 2.4], [-4, 2, 1, 2, 3]] as const).forEach((p) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(p[3], p[4]),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      m.position.set(p[0], p[1], p[2]);
      m.lookAt(0, 1, 0);
      envScene.add(m);
    });
    scene.environment = pmrem.fromScene(envScene, 0.04).texture;

    // lumini
    scene.add(new THREE.HemisphereLight(0xfff4e6, 0x4a453f, 0.3));
    const key = new THREE.DirectionalLight(0xfff2e2, 1.05);
    key.position.set(2.2, 4.6, 3.0);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -2;
    key.shadow.camera.right = 2;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -1;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 5;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xcdd6e2, 0.3);
    fill.position.set(-2.4, 1.6, 2.2);
    scene.add(fill);

    /* ============ baie (perete + pardoseală) ============ */
    const plasterTex = new THREE.CanvasTexture(plaster());
    plasterTex.colorSpace = THREE.SRGBColorSpace;
    plasterTex.wrapS = plasterTex.wrapT = THREE.RepeatWrapping;
    plasterTex.repeat.set(7, 2.2);
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 7),
      new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.95, envMapIntensity: 0.3 })
    );
    wall.position.set(0, 2.8, -0.5);
    wall.receiveShadow = true;
    scene.add(wall);

    const floorTex = new THREE.CanvasTexture(floorTiles());
    floorTex.colorSpace = THREE.SRGBColorSpace;
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(25, 25);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.55, metalness: 0.02, envMapIntensity: 0.3 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 14.5);
    floor.receiveShadow = true;
    scene.add(floor);

    /* ============ lavuarul ============ */
    const stoneMat = new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0, envMapIntensity: 0.5 });

    // PROIECTIE PLANARA: in loc sa repetam textura pe fiecare fata (care rupe
    // modelul placilor cu vene mari), proiectam O SINGURA copie a placii peste
    // tot lavuarul, dupa pozitia reala in spatiu. Asa venele curg continuu intre
    // fete - exact cum un fabricant taie un lavuar cu "vein matching".
    //
    // Placile reale sunt in format PORTRET 2:1 (ex. 1200x2780mm = stau "in
    // picioare"). Lavuarul e LAT pe orizontala. Rotim placa 90° (in UV, nu
    // atingem poza) ca latura LUNGA a placii sa cada pe LUNGIMEA lavuarului
    // -> folosim toata placa, fara zoom excesiv si fara intindere.
    const W = 1.5, D = 0.95, H = 0.3;
    const x0 = -0.55, x1 = 0.55;
    const zb = -0.32, zf = 0.32;
    const slabY = 0.03;

    // Dimensiunea reala a placii (in metri). Daca placile tale au alt format,
    // schimba doar aceste doua valori (latura lunga si latura scurta).
    const SLAB_LONG = 2.78;   // latura lunga a placii (m) -> cade pe lungimea lavuarului
    const SLAB_SHORT = 1.2;   // latura scurta a placii (m)
    const halfU = SLAB_LONG / 2;   // centrat pe 0
    const halfV = SLAB_SHORT / 2;

    // TRIPLANAR: fiecare vertex e proiectat pe planul perpendicular pe normala
    // fetei lui. Fata care priveste spre X -> citeste planul (Z,Y); spre Z ->
    // planul (X,Y); spre Y -> planul (X,Z). Toate citesc din ACEEASI placa la
    // pozitia lor mondiala, deci venele curg continuu, dar nicio fata nu se
    // mai intinde in dungi (cum se intampla la proiectia pe o singura axa).
    function projectUV(mesh: THREE.Mesh) {
      const geo = mesh.geometry as THREE.BufferGeometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const nor = geo.attributes.normal as THREE.BufferAttribute;
      const uv = geo.attributes.uv as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      const n = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        v.applyMatrix4(mesh.matrix); // pozitia in spatiul lavuarului
        n.fromBufferAttribute(nor, i);
        n.transformDirection(mesh.matrix); // normala in spatiul lavuarului

        const ax = Math.abs(n.x), ay = Math.abs(n.y), az = Math.abs(n.z);
        let a: number, b: number;
        if (ax >= ay && ax >= az) {
          // fata laterala (priveste spre X) -> foloseste Z (oriz) si Y (vert)
          a = v.z; b = v.y;
        } else if (az >= ax && az >= ay) {
          // fata frontala/spate (priveste spre Z) -> foloseste X si Y
          a = v.x; b = v.y;
        } else {
          // fata orizontala (priveste spre Y) -> foloseste X si Z
          a = v.x; b = v.z;
        }
        // normalizam in [0..1] dupa dimensiunea reala a placii
        const U = (a + halfU) / SLAB_LONG;
        const V = (b + halfV) / SLAB_SHORT;
        // ROTIRE 90°: placa e portret -> o "culcam" ca latura lunga sa fie pe
        // lungimea lavuarului. (Daca venele ies pe directia gresita, inlocuieste
        // linia de mai jos cu: uv.setXY(i, 1 - V, U); )
        uv.setXY(i, V, 1 - U);
      }
      uv.needsUpdate = true;
    }

    const basin = new THREE.Group();
    basin.position.y = 0.55;
    scene.add(basin);

    function slab(w: number, h: number, d: number, x: number, y: number, z: number, rx?: number, rz?: number) {
      const g = new THREE.BoxGeometry(w, h, d);
      const m = new THREE.Mesh(g, stoneMat);
      m.position.set(x, y, z);
      if (rx) m.rotation.x = rx;
      if (rz) m.rotation.z = rz;
      m.castShadow = true;
      m.receiveShadow = true;
      m.updateMatrix();
      projectUV(m);
      basin.add(m);
      return m;
    }

    slab(x0 + W / 2, H, D, (-W / 2 + x0) / 2, H / 2, 0);
    slab(W / 2 - x1, H, D, (x1 + W / 2) / 2, H / 2, 0);
    slab(x1 - x0, H, D / 2 - zf, (x0 + x1) / 2, H / 2, (zf + D / 2) / 2);
    slab(x1 - x0, H, D / 2 + zb, (x0 + x1) / 2, H / 2, (zb - D / 2) / 2);
    slab(x1 - x0 + 0.04, slabY, zf - zb + 0.04, (x0 + x1) / 2, slabY / 2, 0);

    const cx = (x0 + x1) / 2, cw = x1 - x0 + 0.03;
    const yFront = 0.2, yLow = 0.045;
    const zSeam = -0.16;
    const hair = 0.006;

    // (1) panta lungă
    {
      const zA = zf, zB = zSeam;
      const run = zA - zB, drop = yFront - yLow;
      const b = Math.atan2(drop, run), L = Math.hypot(run, drop) + 0.01;
      const g = new THREE.BoxGeometry(cw, 0.02, L);
      const m = new THREE.Mesh(g, stoneMat);
      m.rotation.x = -b;
      m.position.set(cx, (yFront + yLow) / 2 - Math.cos(b) * 0.01, (zA + zB) / 2 + Math.sin(b) * 0.01);
      m.castShadow = m.receiveShadow = true;
      m.updateMatrix();
      projectUV(m);
      basin.add(m);
    }
    // (2) banda plată orizontală
    {
      const zA = zSeam - hair, zB = zb - 0.01;
      const L = zA - zB;
      const g = new THREE.BoxGeometry(cw, 0.02, L);
      const m = new THREE.Mesh(g, stoneMat);
      m.position.set(cx, yLow - 0.01, (zA + zB) / 2);
      m.receiveShadow = true;
      m.updateMatrix();
      projectUV(m);
      basin.add(m);
    }
    // linia de scurgere
    {
      const g = new THREE.BoxGeometry(cw, 0.018, hair);
      const slot = new THREE.Mesh(g, stoneMat);
      slot.position.set(cx, yLow - 0.012, zSeam - hair / 2);
      slot.receiveShadow = true;
      slot.updateMatrix();
      projectUV(slot);
      basin.add(slot);
    }

    /* ============ baterie din alamă ============ */
    const brass = new THREE.MeshStandardMaterial({ color: 0xcfa96a, metalness: 0.95, roughness: 0.28 });
    const faucet = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.13, -0.495),
      new THREE.Vector3(0, 1.13, -0.34),
      new THREE.Vector3(0, 1.1, -0.225),
      new THREE.Vector3(0, 1.01, -0.19),
      new THREE.Vector3(0, 0.96, -0.185),
    ]);
    const spout = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.018, 20), brass);
    spout.castShadow = true;
    faucet.add(spout);
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 20), brass);
    tip.position.set(0, 0.955, -0.185);
    faucet.add(tip);
    const esc1 = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.014, 28), brass);
    esc1.rotation.x = Math.PI / 2;
    esc1.position.set(0, 1.13, -0.492);
    faucet.add(esc1);
    const esc2 = esc1.clone();
    esc2.position.set(0.34, 1.11, -0.492);
    faucet.add(esc2);
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.027, 0.06, 24), brass);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(0.34, 1.11, -0.458);
    knob.castShadow = true;
    faucet.add(knob);
    const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0075, 0.15, 16), brass);
    lever.rotation.x = 0.15;
    lever.position.set(0.34, 1.11 - Math.cos(0.15) * 0.075, -0.452 - Math.sin(0.15) * 0.075);
    lever.castShadow = true;
    faucet.add(lever);
    scene.add(faucet);

    /* ============ aplicare finisaj ============ */
    const whiteTex = new THREE.CanvasTexture(plain("#e9e5de", true));
    whiteTex.colorSpace = THREE.SRGBColorSpace;
    whiteTex.wrapS = whiteTex.wrapT = THREE.ClampToEdgeWrapping;

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const cache: Record<string, THREE.Texture> = {};

    function setWhite() {
      stoneMat.map = whiteTex;
      stoneMat.roughness = 0.92;
      stoneMat.metalness = 0;
      stoneMat.needsUpdate = true;
    }

    function applyFinish(tile: ConfiguratorTile | null) {
      if (!tile || !tile.img) {
        setWhite();
        return;
      }
      const url = tile.img;
      if (cache[url]) {
        stoneMat.map = cache[url];
        stoneMat.roughness = 0.5;
        stoneMat.metalness = 0;
        stoneMat.needsUpdate = true;
        return;
      }
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(
        url,
        (t) => {
          if (disposed) return;
          t.colorSpace = THREE.SRGBColorSpace;
          t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
          t.anisotropy = maxAniso;          // claritate la unghiuri oblice
          t.minFilter = THREE.LinearMipmapLinearFilter;
          t.magFilter = THREE.LinearFilter;
          t.generateMipmaps = true;
          cache[url] = t;
          stoneMat.map = t;
          stoneMat.roughness = 0.5;
          stoneMat.metalness = 0;
          stoneMat.needsUpdate = true;
        },
        undefined,
        () => {
          // eroare la incarcare (CORS / poza lipsa): pune placeholder gri
          if (disposed) return;
          const ph = new THREE.CanvasTexture(plain("#c9c4bc", true));
          ph.colorSpace = THREE.SRGBColorSpace;
          ph.wrapS = ph.wrapT = THREE.ClampToEdgeWrapping;
          cache[url] = ph;
          stoneMat.map = ph;
          stoneMat.needsUpdate = true;
        }
      );
    }

    applyFinishRef.current = applyFinish;
    setWhite(); // default alb

    /* ============ control orbită ============ */
    const target = new THREE.Vector3(0, 0.72, 0);
    let rotY = 0.5, rotX = 0.4, dist = 2.45, auto = true;
    const t0 = performance.now();
    let dragging = false, px = 0, py = 0;
    let pinch0 = 0;
    let pinching = false;

    const clampY = (v: number) => Math.max(-0.92, Math.min(0.92, v));
    const clampX = (v: number) => Math.max(0.06, Math.min(0.8, v));

    function down(x: number, y: number) {
      dragging = true;
      px = x;
      py = y;
      if (auto) auto = false;
      stage!.classList.add("dragging");
    }
    function moveFn(x: number, y: number) {
      if (!dragging || pinching) return;
      rotY = clampY(rotY + (x - px) * 0.008);
      rotX = clampX(rotX + (y - py) * 0.005);
      px = x;
      py = y;
    }
    function up() {
      dragging = false;
      stage!.classList.remove("dragging");
    }

    const onPointerDown = (e: PointerEvent) => {
      // ignoram pointer-ul de tip touch cand deja avem 2 degete (pinch in curs)
      if (pinching) return;
      stage!.setPointerCapture(e.pointerId);
      down(e.clientX, e.clientY);
    };
    const onPointerMove = (e: PointerEvent) => moveFn(e.clientX, e.clientY);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      dist = Math.max(1.5, Math.min(4.6, dist + e.deltaY * 0.0025));
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // intram in mod pinch: oprim orice rotatie in curs
        pinching = true;
        dragging = false;
        stage!.classList.remove("dragging");
        if (auto) auto = false;
        pinch0 = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        dist = Math.max(1.5, Math.min(4.6, dist * (pinch0 / d)));
        pinch0 = d;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      // iesim din pinch doar cand au ramas sub 2 degete
      if (e.touches.length < 2) {
        pinching = false;
        // resincronizam punctul de drag cu degetul ramas, ca sa nu sara
        if (e.touches.length === 1) {
          px = e.touches[0].clientX;
          py = e.touches[0].clientY;
        }
      }
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    stage.addEventListener("touchcancel", onTouchEnd, { passive: true });

    /* ============ loop ============ */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function resize() {
      const w = stage!.clientWidth, h = stage!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    function loop() {
      rafId = requestAnimationFrame(loop);
      if (auto && !reduced) {
        const t = (performance.now() - t0) * 0.001;
        rotY = 0.5 + Math.sin(t * 0.28) * 0.45;
      }
      camera.position.set(
        target.x + Math.sin(rotY) * Math.cos(rotX) * dist,
        target.y + Math.sin(rotX) * dist,
        target.z + Math.cos(rotY) * Math.cos(rotX) * dist
      );
      camera.lookAt(target);
      renderer.render(scene, camera);
    }
    loop();

    /* ============ cleanup ============ */
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
      applyFinishRef.current = null;

      // dispose resurse
      Object.values(cache).forEach((t) => t.dispose());
      whiteTex.dispose();
      plasterTex.dispose();
      floorTex.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === stage) {
        stage.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Cand se schimba selectia, aplica finisajul
  const handleSelect = (index: number) => {
    setActiveIndex(index);
    const fn = applyFinishRef.current;
    if (!fn) return;
    if (index === -1) fn(null);
    else fn(tiles[index]);
  };

  return (
    <div className="flex flex-col">
      {/* Stage 3D */}
      <div
        ref={stageRef}
        className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[65vh] min-h-[360px] rounded-2xl overflow-hidden bg-bg-deep border border-line cursor-grab [&.dragging]:cursor-grabbing [&>canvas]:block [&>canvas]:w-full [&>canvas]:h-full"
        style={{ touchAction: "none" }}
      >
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 text-[11.5px] text-bg-paper/70 tracking-[0.06em] pointer-events-none whitespace-nowrap bg-ink/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {labels.hint}
        </div>
      </div>

      {/* Swatch-uri */}
      <div className="mt-6">
        <div className="text-[11px] tracking-[0.16em] uppercase text-ink-muted mb-4">
          {labels.finishLabel}
        </div>
        <div className="relative">
          {/* Sageata stanga (doar desktop) */}
          <button
            type="button"
            aria-label="Înapoi"
            onClick={() => scrollSwatches(-1)}
            className={`hidden lg:flex absolute left-0 top-[40px] -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-bg-paper border border-line shadow-md text-ink transition-opacity ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M8 2 L4 6 L8 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Sageata dreapta (doar desktop) */}
          <button
            type="button"
            aria-label="Înainte"
            onClick={() => scrollSwatches(1)}
            className={`hidden lg:flex absolute right-0 top-[40px] -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-bg-paper border border-line shadow-md text-ink transition-opacity ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M4 2 L8 6 L4 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div ref={swatchRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 scroll-smooth">
          {/* Optiune alb default */}
          <button
            type="button"
            onClick={() => handleSelect(-1)}
            className={`group flex-shrink-0 flex flex-col items-center gap-2 transition-opacity ${
              activeIndex === -1 ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
          >
            <span
              className={`block w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 transition-all ${
                activeIndex === -1 ? "border-brass ring-2 ring-brass/30" : "border-line"
              }`}
              style={{ backgroundColor: "#e9e5de" }}
            />
            <span className="text-[10px] leading-tight tracking-[0.08em] text-ink-soft w-20 text-center line-clamp-2">
              {labels.defaultWhite}
            </span>
          </button>

          {/* Placile din catalog */}
          {tiles.map((tile, i) => (
            <button
              key={tile.slug}
              type="button"
              onClick={() => handleSelect(i)}
              className={`group flex-shrink-0 flex flex-col items-center gap-2 transition-opacity ${
                activeIndex === i ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              <span
                className={`block w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden transition-all ${
                  activeIndex === i ? "border-brass ring-2 ring-brass/30" : "border-line"
                }`}
                style={{ backgroundColor: "#c9c4bc" }}
              >
                {tile.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tile.img}
                    alt={tile.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </span>
              <span className="text-[10px] leading-tight tracking-[0.08em] text-ink-soft w-20 text-center line-clamp-2">
                {tile.name}
              </span>
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}