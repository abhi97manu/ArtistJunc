import React from "react";

const BlankCard = ({ setAddNew, value }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8b5cf6_0%,#6d28d9_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(109,40,217,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
      onClick={() => setAddNew(true)}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </span>
      <span>{value}</span>
    </button>
  );
};

export default BlankCard;
