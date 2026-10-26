import { useState } from "react";
import { Github, Handshake, Target } from "lucide-react";
import Pipeline from "./components/Pipeline";
import {
  addDeal,
  deleteDeal,
  loadDeals,
  moveDeal,
  resetDeals,
} from "./utils/deals";

export default function App() {
  const [deals, setDeals] = useState(() => loadDeals());

  return (
    <div className="min-h-screen bg-night font-sans text-cream antialiased">
      {/* topbar */}
      <header className="border-b border-edge bg-night/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3.5 md:px-8">
          <p className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <Handshake className="h-5 w-5 text-ember" />
            Relase<span className="text-ember">ra</span>
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-panel px-3.5 py-1.5 text-xs font-bold text-sand">
            <Target className="h-3.5 w-3.5 text-ember" />
            CRM Pipeline — Studio Web Fiktif "Kara Digital"
          </p>
        </div>
      </header>

      <main>
        <section className="border-b border-edge">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ember">
              Untuk Freelancer & Bisnis Jasa
            </p>
            <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Semua calon klien terlihat — dari{" "}
              <span className="text-ember">halo pertama</span> sampai deal.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sand">
              Pindahkan deal antar tahap dengan satu klik, pantau nilai
              pipeline, dan jangan sampai follow-up terlewat. Data demo
              tersimpan di browser.
            </p>
          </div>
        </section>

        <Pipeline
          deals={deals}
          onMove={(id, dir) => setDeals(moveDeal(id, dir))}
          onAdd={(data) => setDeals(addDeal(data))}
          onDelete={(id) => setDeals(deleteDeal(id))}
          onReset={() => setDeals(resetDeals())}
        />
      </main>

      <footer className="border-t border-edge">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-sand/60 sm:flex-row sm:items-center md:px-8">
          <p>© 2026 Relasera · "Kara Digital" adalah studio fiktif (concept demo).</p>
          <p className="inline-flex items-center gap-1.5">
            Dibuat oleh{" "}
            <a
              href="https://github.com/Atazyyy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-cream"
            >
              <Github className="h-3.5 w-3.5" /> Agni Miftah Fauzi
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
