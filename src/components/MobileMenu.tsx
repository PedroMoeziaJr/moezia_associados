"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="flex h-11 w-11 items-center justify-center rounded-md text-moezia-dark/80 hover:text-moezia-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-moezia-red"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full border-t border-black/5 bg-white shadow-sm"
        >
          <nav className="container-page flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/5 py-3 text-base font-medium text-moezia-dark/80 last:border-b-0 hover:text-moezia-red"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal/login"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-moezia-red px-6 py-3 text-center text-sm font-semibold text-white hover:bg-moezia-red-dark"
            >
              Portal do Cliente
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
