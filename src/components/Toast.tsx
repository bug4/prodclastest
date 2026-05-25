"use client";

import { useEffect } from "react";
import clsx from "clsx";

type Props = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, type, onClose, duration = 5000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "fixed top-24 right-6 z-[100] max-w-md animate-slide-in-toast",
        "rounded-2xl shadow-2xl border backdrop-blur-xl",
        type === "success"
          ? "bg-bg-paper/95 border-brass text-ink"
          : "bg-red-50/95 border-red-300 text-red-900"
      )}
      role="alert"
    >
      <div className="flex items-start gap-4 p-5 pr-12">
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            type === "success" ? "bg-brass text-bg-paper" : "bg-red-500 text-white"
          )}
        >
          {type === "success" ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-sm leading-relaxed font-medium">{message}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="h-0.5 bg-current opacity-20 rounded-b-2xl overflow-hidden">
        <div
          className={clsx(
            "h-full",
            type === "success" ? "bg-brass" : "bg-red-500"
          )}
          style={{
            animation: `toast-progress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}
