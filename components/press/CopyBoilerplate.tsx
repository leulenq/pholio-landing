"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyBoilerplateProps {
  text: string;
}

type CopyState = "idle" | "copied" | "error";

export default function CopyBoilerplate({ text }: CopyBoilerplateProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  function showCopiedState() {
    setState("copied");
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => setState("idle"), 4000);
  }

  async function copyText() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(text);
      showCopiedState();
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();

      if (copied) {
        showCopiedState();
      } else {
        setState("error");
      }
    }
  }

  const label =
    state === "copied"
      ? "Boilerplate copied"
      : state === "error"
        ? "Copy failed. Try again"
        : "Copy boilerplate";

  return (
    <button
      type="button"
      onClick={copyText}
      className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-[#A8894E] pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#655126] transition-colors hover:text-[#171712] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8894E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F2] active:translate-y-px"
      aria-live="polite"
    >
      {state === "copied" ? (
        <Check aria-hidden="true" size={15} strokeWidth={1.6} />
      ) : (
        <Copy aria-hidden="true" size={15} strokeWidth={1.6} />
      )}
      <span>{label}</span>
    </button>
  );
}
