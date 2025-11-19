import { Toaster } from 'sonner';
import CommentSection from './components/CommentSection';
import { DeComProvider } from './context/DeComContext';
import { CONTRACT_ADDRESS } from './config/contract';

function App() {
  return (
    <DeComProvider contractAddress={CONTRACT_ADDRESS}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-success selection:text-white">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-16 text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-accents-5 bg-clip-text text-transparent">
              DeCom React
            </h1>
            <p className="text-xl text-accents-5 max-w-2xl mx-auto">
              A decentralized, censorship-resistant comment system for the permanent web.
              Packaged as a lightweight React component.
            </p>
          </header>

          <div className="grid gap-16">
            {/* Documentation Section */}
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <div className="p-4 rounded-lg bg-accents-1 border border-accents-2 font-mono text-sm overflow-x-auto">
                  npm install decom-react wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>

                <div className="space-y-2">
                  <p className="text-accents-5">1. Import styles in your root file (e.g., main.tsx):</p>
                  <div className="p-4 rounded-lg bg-accents-1 border border-accents-2 font-mono text-sm overflow-x-auto">
                    import 'decom-react/style.css';
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-accents-5">2. Wrap your application with the Provider:</p>
                  <div className="p-4 rounded-lg bg-accents-1 border border-accents-2 font-mono text-sm overflow-x-auto whitespace-pre">
                    {`import { DeComProvider } from 'decom-react';

function App() {
  return (
    <DeComProvider contractAddress="0xYourContractAddress...">
      <YourApp />
    </DeComProvider>
  );
}`}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-accents-5">3. Embed the comment section anywhere:</p>
                  <div className="p-4 rounded-lg bg-accents-1 border border-accents-2 font-mono text-sm overflow-x-auto whitespace-pre">
                    {`import { CommentSection } from 'decom-react';

<CommentSection topic="unique-topic-slug" />`}
                  </div>
                </div>
              </div>
            </section>

            {/* Live Demo Section */}
            <section className="border-t border-accents-2 pt-16">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-2">Live Demo</h2>
                <p className="text-accents-5">
                  Interact with the actual component below. Data is persisted on the blockchain.
                </p>
              </div>

              <div className="p-8 rounded-xl border border-accents-2 bg-background shadow-sm">
                <CommentSection topic="demo-documentation-page" />
              </div>
            </section>
          </div>
        </main>
        <Toaster position="bottom-right" theme="system" />
      </div>
    </DeComProvider>
  );
}

export default App;
