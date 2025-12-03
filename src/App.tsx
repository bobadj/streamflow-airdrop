import { useState } from "react";
import { FilterTabs } from "./components/FilterTabs";
import { StatsCard } from "./components/StatsCard";
import { AirdropCard } from "./components/AirdropCardProps";
import { Icon, WalletIcon } from "./components/ui/Icon";

const mockAirdrops = [
  {
    id: 1,
    name: "Solana Summer",
    symbol: "SOLS",
    totalAmount: "1,000,000 SOLS",
    recipients: 5000,
    status: "active" as const,
    startDate: "Dec 1, 2025",
    endDate: "Dec 15, 2025",
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Phantom Rush",
    symbol: "PHAN",
    totalAmount: "500,000 PHAN",
    recipients: 3200,
    status: "active" as const,
    startDate: "Nov 28, 2025",
    endDate: "Dec 12, 2025",
    image:
      "https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "DeFi Warriors",
    symbol: "DEFW",
    totalAmount: "2,500,000 DEFW",
    recipients: 8000,
    status: "upcoming" as const,
    startDate: "Dec 5, 2025",
    endDate: "Dec 20, 2025",
    image:
      "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Cosmic Token",
    symbol: "COSM",
    totalAmount: "750,000 COSM",
    recipients: 4500,
    status: "upcoming" as const,
    startDate: "Dec 8, 2025",
    endDate: "Dec 22, 2025",
    image:
      "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Genesis Drop",
    symbol: "GEND",
    totalAmount: "1,200,000 GEND",
    recipients: 6000,
    status: "completed" as const,
    startDate: "Nov 15, 2025",
    endDate: "Nov 30, 2025",
    image:
      "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "Moon Blast",
    symbol: "MOON",
    totalAmount: "3,000,000 MOON",
    recipients: 10000,
    status: "completed" as const,
    startDate: "Nov 1, 2025",
    endDate: "Nov 25, 2025",
    image:
      "https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "upcoming" | "completed"
  >("all");

  const filteredAirdrops =
    activeTab === "all"
      ? mockAirdrops
      : mockAirdrops.filter((airdrop) => airdrop.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />

      <main className="container mx-auto px-6 py-8 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center max-w-md">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-3xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <WalletIcon />
              {/* <Icon title="wallet" /> */}
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Connect Your Wallet
            </h2>
          </div>
        </div>

        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Airdrops"
              value="6"
              change="+2"
              icon={<Icon title="poker_chip" />}
            />
            <StatsCard
              title="Active Campaigns"
              value="2"
              icon={<Icon title="trending_up" />}
            />
            <StatsCard
              title="Total Recipients"
              value="36.7K"
              change="+12%"
              icon={<Icon title="groups" />}
            />
            <StatsCard
              title="Total Value"
              value="$8.9M"
              change="+8%"
              icon={<Icon title="wallet" />}
            />
          </div>

          <div className="mb-6">
            <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAirdrops.map((airdrop) => (
              <AirdropCard key={airdrop.id} {...airdrop} />
            ))}
          </div>

          {filteredAirdrops.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-12 max-w-md mx-auto">
                {/* <Coins className="w-16 h-16 text-slate-600 mx-auto mb-4" /> */}
                <Icon title="poker_chip" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No Airdrops Found
                </h3>
                <p className="text-slate-400">
                  There are no {activeTab} airdrops at the moment. Check back
                  later!
                </p>
              </div>
            </div>
          )}
        </>
        {/* )} */}
      </main>
    </div>
  );
}

export default App;
