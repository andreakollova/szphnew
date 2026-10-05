"use client";

export function NewsletterForm() {
  return (
    <form className="flex w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Váš e-mail"
        className="flex-1 sm:w-72 px-5 py-3 font-medium text-[#051937] placeholder-[#94a3b8] outline-none"
        style={{ fontSize: "13px", background: "rgba(255,255,255,0.95)", borderRadius: "50px 0 0 50px" }}
      />
      <button
        type="submit"
        className="shrink-0 px-6 py-3 font-bold text-white transition-all hover:bg-[#b0001f]"
        style={{ background: "#d80027", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "0 50px 50px 0" }}
      >
        Odoberať
      </button>
    </form>
  );
}
