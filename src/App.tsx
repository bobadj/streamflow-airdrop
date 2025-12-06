import { Icon } from "./components/ui/Icon";
import { ConnectWallet } from "./components/ConnectWallet";
import { useSearchDistributors } from "./hooks/useSearchDistributors";
import { Loader } from "./components/ui/Loader";
import { DistributorCard } from "./components/DistributorCard";

function App() {
  const { isLoading, distributors } = useSearchDistributors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />

      <main className="container mx-auto px-6 py-5 relative min-h-screen h-full flex flex-col">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-end my-5">
              <ConnectWallet />
            </div>

            <div className="flex flex-col gap-6">
              {distributors.map((airdrop) => (
                <DistributorCard
                  key={airdrop.publicKey.toString()}
                  {...airdrop.account.toJSON()}
                />
              ))}
            </div>

            {distributors.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-12 max-w-md mx-auto">
                  <Icon title="poker_chip" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    No Airdrops Found
                  </h3>
                  <p className="text-slate-400">
                    There are no airdrops at the moment. Check back later!
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
