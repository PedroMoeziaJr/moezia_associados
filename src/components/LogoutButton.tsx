"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({
  loginPath,
  variant = "light",
}: {
  loginPath: string;
  variant?: "light" | "dark";
}) {
  const classes =
    variant === "dark"
      ? "border-white/20 text-white/80 hover:bg-white/10"
      : "border-black/10 text-moezia-dark/70 hover:bg-moezia-dark/5";

  return (
    <button
      onClick={() => signOut({ callbackUrl: loginPath })}
      className={`rounded-full border px-4 py-1.5 font-medium ${classes}`}
    >
      Sair
    </button>
  );
}
