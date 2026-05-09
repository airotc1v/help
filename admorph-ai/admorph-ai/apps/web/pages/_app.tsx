import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useRouter } from "next/router";

// Pages that use the full-shell layout (sidebar + topbar)
const SHELL_PAGES = ["/developer", "/developer/upload", "/developer/placements", "/developer/analytics", "/sponsor", "/sponsor/marketplace", "/sponsor/bids", "/sponsor/analytics"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [role, setRole] = useState<"developer" | "sponsor">("developer");
  const useShell = SHELL_PAGES.includes(router.pathname);

  const toggleRole = () => {
    const next = role === "developer" ? "sponsor" : "developer";
    setRole(next);
    router.push(next === "developer" ? "/developer" : "/sponsor");
  };

  if (!useShell) {
    return <Component {...pageProps} role={role} />;
  }

  return (
    <div className="flex min-h-screen bg-am-black">
      <Sidebar role={role} onRoleToggle={toggleRole} />
      <div className="flex-1 flex flex-col min-w-0">
        <Component {...pageProps} role={role} />
      </div>
    </div>
  );
}
