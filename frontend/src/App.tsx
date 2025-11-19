import { Toaster } from 'sonner';
import CommentSection from './components/CommentSection';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-success selection:text-white">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <article className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Decentralized Comments Demo</h1>
          <p className="text-xl text-accents-5 mb-6">
            This is a demo of the DeCom microservice embedded in a standard web page.
          </p>
          <div className="prose dark:prose-invert text-accents-6 leading-relaxed space-y-4">
            <p>
              The comment section below is a self-contained component that interacts directly with the blockchain.
              It persists data on-chain, ensuring censorship resistance and permanent availability.
            </p>
            <p>
              Integration is as simple as dropping the <code>&lt;CommentSection /&gt;</code> component into your React application.
            </p>
          </div>
        </article>

        <div className="border-t border-accents-2 pt-12">
          <CommentSection topic="demo-article-slug" />
        </div>
      </main>
      <Toaster position="bottom-right" theme="system" />
    </div>
  );
}

export default App;
