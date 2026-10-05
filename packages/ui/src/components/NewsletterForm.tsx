"use client";

export function NewsletterForm() {
  return (
    <form className="flex w-full sm:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Váš e-mail"
        className="flex-1 sm:w-64 px-4 py-2.5 font-medium text-[#051937] placeholder-[#94a3b8] outline-none"
        style={{ fontSize: "12px", background: "rgba(255,255,255,0.95)", borderRadius: "8px 0 0 8px" }}
      />
      <button
        type="submit"
        className="shrink-0 px-5 py-2.5 font-bold text-white transition-all hover:bg-[#b0001f]"
        style={{ background: "#d80027", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "0 8px 8px 0" }}
      >
        Odoberať
      </button>
    </form>
  );
}
