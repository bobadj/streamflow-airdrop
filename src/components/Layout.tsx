import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />

      <main className="container mx-auto px-6 py-5 relative min-h-screen h-full flex flex-col text-white">
        <div className="flex justify-end my-5">
          <WalletMultiButton />
        </div>

        <Outlet />
      </main>
    </div>
  );
};
