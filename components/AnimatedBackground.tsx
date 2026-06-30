"use client";

/**
 * Soft animated blue blobs + dot-grid overlay. Drop into any section that has
 * `relative isolate overflow-hidden`. Pure CSS — no JS animations.
 *
 *   <section className="relative isolate overflow-hidden">
 *     <AnimatedBackground variant="hero" />
 *     <div>content</div>
 *   </section>
 *
 * `isolation: isolate` on the parent + `zIndex: -1` on the background ensures
 * the background sits behind sibling content without escaping the section.
 */
export default function AnimatedBackground({
  variant = "hero",
}: {
  variant?: "hero" | "soft" | "navy";
}) {
  const wrapperClass =
    "pointer-events-none absolute inset-0 overflow-hidden";
  const wrapperStyle: React.CSSProperties = { zIndex: -1 };

  if (variant === "navy") {
    return (
      <div aria-hidden className={wrapperClass} style={wrapperStyle}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #1d2842 0%, #1c2eae 60%, #1f44f5 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.07] pattern-grid" />
        <div className="blob blob-sky left-[-10%] top-[-10%] h-[420px] w-[420px] animate-blob-float" />
        <div className="blob blob-brand right-[-10%] bottom-[-10%] h-[460px] w-[460px] animate-blob-float-slow opacity-50" />
      </div>
    );
  }
  if (variant === "soft") {
    return (
      <div aria-hidden className={wrapperClass} style={wrapperStyle}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-60 pattern-dots" />
      </div>
    );
  }
  // hero
  return (
    <div aria-hidden className={wrapperClass} style={wrapperStyle}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, #dae6ff 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, #e0eefe 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-40 pattern-dots" />
      <div className="blob blob-brand left-[5%] top-[-8%] h-[460px] w-[460px] animate-blob-float opacity-50" />
      <div className="blob blob-sky right-[-8%] top-[20%] h-[420px] w-[420px] animate-blob-float-slow opacity-60" />
      <div className="blob blob-navy left-[40%] bottom-[-15%] h-[360px] w-[360px] animate-blob-float opacity-30" />
    </div>
  );
}
