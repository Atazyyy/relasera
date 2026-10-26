import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Phone,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import {
  PRODUCTS,
  SOURCES,
  STAGES,
  daysFromToday,
  fmtDate,
  fmtFull,
  todayISO,
} from "../data/crm";

function DealCard({ deal, onMove, onDelete }) {
  const [open, setOpen] = useState(false);
  const due = daysFromToday(deal.nextAction);
  return (
    <div className="rounded-xl border border-edge bg-panel2 p-3">
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-bold leading-snug text-cream">{deal.company}</p>
          <span className="shrink-0 rounded-full bg-ember/15 px-2 py-0.5 text-[10px] font-extrabold text-ember">
            {fmtFull(deal.value)}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-semibold text-sand">
          {deal.person} · {deal.product}
        </p>
        {open && (
          <div className="mt-2 space-y-1 rounded-lg bg-night/60 p-2.5 text-[11px] leading-relaxed text-sand">
            <p>
              <span className="font-bold text-cream">Sumber:</span> {deal.source} ·{" "}
              <span className="font-bold text-cream">WA:</span> {deal.wa}
            </p>
            <p>{deal.note}</p>
          </div>
        )}
        {deal.nextAction && (
          <p
            className={
              "mt-2 inline-flex items-center gap-1 text-[10px] font-bold " +
              (due !== null && due < 0 ? "text-rose-400" : "text-cream/70")
            }
          >
            <CalendarClock className="h-3 w-3" />
            {due !== null && due < 0
              ? `Follow-up lewat ${fmtDate(deal.nextAction)}`
              : `Next: ${fmtDate(deal.nextAction)}`}
          </p>
        )}
      </button>
      <div className="mt-2.5 flex items-center justify-between border-t border-edge pt-2">
        <button
          onClick={() => onDelete(deal.id)}
          className="rounded-lg p-1 text-sand/60 transition hover:text-rose-400"
          title="Hapus deal"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        <div className="flex gap-1.5">
          <button
            onClick={() => onMove(deal.id, -1)}
            className="rounded-lg border border-edge px-2 py-1 text-sand transition hover:text-cream"
            title="Mundur satu tahap"
          >
            <ArrowLeft className="h-3 w-3" />
          </button>
          <button
            onClick={() => onMove(deal.id, 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-ember px-2.5 py-1 text-[10px] font-extrabold text-night transition hover:brightness-105"
          >
            Lanjut <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AddDealForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [person, setPerson] = useState("");
  const [wa, setWa] = useState("");
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [source, setSource] = useState(SOURCES[0]);
  const [value, setValue] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (company.trim().length < 3) return setError("Nama usaha minimal 3 karakter.");
    if (person.trim().length < 2) return setError("Nama kontak wajib diisi.");
    if (!parseInt(value)) return setError("Nilai deal harus angka (tanpa titik).");
    onAdd({
      company: company.trim(),
      person: person.trim(),
      wa: wa.trim() || "—",
      product,
      source,
      value: parseInt(value),
      nextAction: nextAction || null,
      note: "Deal baru dari form.",
    });
    setCompany("");
    setPerson("");
    setWa("");
    setValue("");
    setNextAction("");
    setOpen(false);
  };

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-ember px-4 py-2 text-sm font-extrabold text-night transition hover:brightness-105"
      >
        <Plus className="h-4 w-4" /> Tambah Deal
      </button>
    );

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-2xl border border-edge bg-panel p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-extrabold text-cream">Deal Baru</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg p-1 text-sand hover:text-cream"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nama usaha"
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        />
        <input
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          placeholder="Nama kontak (cth. Pak Dedi)"
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        />
        <input
          value={wa}
          onChange={(e) => setWa(e.target.value)}
          placeholder="No. WA (opsional)"
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nilai deal (cth. 4500000)"
          inputMode="numeric"
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        />
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        >
          {PRODUCTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        >
          {SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          type="date"
          value={nextAction}
          onChange={(e) => setNextAction(e.target.value)}
          className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm font-semibold text-cream outline-none focus:border-ember"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ember px-4 py-2.5 text-sm font-extrabold text-night transition hover:brightness-105"
        >
          <Plus className="h-4 w-4" /> Simpan Deal
        </button>
      </div>
      {error && (
        <p className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}

export default function Pipeline({ deals, onMove, onAdd, onDelete, onReset }) {
  const open = deals.filter((d) => d.stage !== "deal");
  const pipelineValue = open.reduce((a, d) => a + d.value, 0);
  const wonValue = deals
    .filter((d) => d.stage === "deal")
    .reduce((a, d) => a + d.value, 0);
  const winRate = Math.round(
    (deals.filter((d) => d.stage === "deal").length / Math.max(1, deals.length)) * 100
  );
  const today = todayISO();
  const dueToday = open.filter(
    (d) => d.nextAction && d.nextAction <= today
  ).length;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Nilai pipeline", value: fmtFull(pipelineValue), sub: `${open.length} deal terbuka` },
          { label: "Deal dimenangkan", value: fmtFull(wonValue), sub: "akumulasi" },
          { label: "Win rate", value: `${winRate}%`, sub: "dari semua deal" },
          { label: "Follow-up jatuh tempo", value: dueToday, sub: "kirim pesan hari ini" },
        ].map((s) => (
          <Reveal key={s.label}>
            <div className="rounded-2xl border border-edge bg-panel p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-sand">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-cream">{s.value}</p>
              <p className="mt-1 text-xs text-sand">{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-cream">Pipeline Penjualan</h2>
        <div className="flex items-center gap-2">
          <AddDealForm onAdd={onAdd} />
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-edge px-4 py-2 text-xs font-bold text-sand transition hover:text-cream"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 overflow-x-auto pb-2 md:grid-cols-3 xl:grid-cols-5">
        {STAGES.map((stage) => {
          const items = deals.filter((d) => d.stage === stage.id);
          const value = items.reduce((a, d) => a + d.value, 0);
          return (
            <div
              key={stage.id}
              className={
                "min-w-[240px] rounded-2xl border p-3 " +
                (stage.id === "deal"
                  ? "border-ember/40 bg-ember/5"
                  : "border-edge bg-panel")
              }
            >
              <div className="flex items-center justify-between px-1 pb-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-sand">
                  {stage.label}
                </p>
                <span className="text-[10px] font-extrabold text-sand">
                  {items.length}
                </span>
              </div>
              <p className="px-1 pb-2 text-[11px] font-bold text-sand/70">
                {fmtFull(value)}
              </p>
              <div className="space-y-2.5">
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-edge p-4 text-center text-xs text-sand/60">
                    Belum ada deal
                  </p>
                )}
                {items.map((d) => (
                  <DealCard
                    key={d.id}
                    deal={d}
                    onMove={onMove}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-sand/60">
        Klik kartu untuk detail · tombol <Phone size={10} className="inline" /> tidak
        perlu — semua kontak ada di dalam kartu. Data demo di localStorage.
      </p>
    </section>
  );
}
