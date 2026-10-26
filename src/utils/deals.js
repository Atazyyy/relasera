import { STAGES, todayISO } from "../data/crm";

const KEY = "rls-deals-v1";

const DAY = 86400000;

function seedDeals() {
  const t = todayISO();
  const shift = (n) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10);
  const mk = (
    id,
    company,
    person,
    wa,
    product,
    value,
    stage,
    source,
    nextAction,
    note
  ) => ({
    id,
    company,
    person,
    wa,
    product,
    value,
    stage,
    source,
    nextAction,
    note,
    createdAt: Date.now() - Math.floor(Math.random() * 30 * DAY),
  });

  return [
    mk("d1", "Kopi Ruang Seduh", "Pak Dedi", "0812xxxx0001", "Website Company Profile", 4500000, "kontak", "Instagram", shift(2), "Lihat contoh portfolio cafe dulu."),
    mk("d2", "Laundry Wangi Terus", "Bu Rina", "0813xxxx0002", "Landing Page", 2500000, "kontak", "Google Maps", shift(5), "Mau landing page + Google rating."),
    mk("d3", "Bengkel Jaya Motor", "Pak Anton", "0821xxxx0003", "Web App / Sistem", 18000000, "followup", "Referensi", shift(1), "Butuh sistem servis & antrian."),
    mk("d4", "TK Cahaya Ceria", "Bu Fitri", "0822xxxx0004", "Website Company Profile", 6000000, "followup", "Event", shift(3), "Komite perlu approval."),
    mk("d5", "Villa Tepi Sawah", "Mas Wayan", "0851xxxx0005", "Toko Online", 22000000, "penawaran", "Website", shift(2), "Proposal v2 dikirim, minus booking engine."),
    mk("d6", "Katering Bu Sri", "Bu Sri", "0812xxxx0006", "Toko Online", 9500000, "penawaran", "Referensi", shift(4), "Cocok pakai katalog + WA checkout."),
    mk("d7", "Gym FitPoint", "Koko Adit", "0878xxxx0007", "Web App / Sistem", 35000000, "negosiasi", "Instagram", shift(1), "Negosiasi pembayaran 3 tahap."),
    mk("d8", "Dentcare Klinik", "dr. Nadia", "0811xxxx0008", "Landing Page", 4000000, "negosiasi", "Google Maps", shift(-1), "Tunggu jadwal meeting final."),
    mk("d9", "Rajut Kita Studio", "Naya", "0895xxxx0009", "Toko Online", 7500000, "deal", "Instagram", null, "DP 50% masuk, mulai minggu depan."),
    mk("d10", "Trans Nusantara", "Pak Hadi", "0819xxxx0010", "Website Company Profile", 12000000, "deal", "Referensi", null, "Kontrak tanda tangan, konten menyusul."),
    mk("d11", "Barber Cukur Makmur", "Ian", "0857xxxx0011", "Landing Page", 2200000, "followup", "Website", shift(6), "Tanya-tanya harga lagi."),
  ];
}

export function loadDeals() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* abaikan */
  }
  const seeded = seedDeals();
  saveDeals(seeded);
  return seeded;
}

export function saveDeals(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* abaikan */
  }
}

export function moveDeal(id, dir) {
  const next = loadDeals().map((d) => {
    if (d.id !== id) return d;
    const idx = STAGES.findIndex((s) => s.id === d.stage);
    const ni = Math.min(STAGES.length - 1, Math.max(0, idx + dir));
    return { ...d, stage: STAGES[ni].id };
  });
  saveDeals(next);
  return next;
}

export function addDeal(data) {
  const deal = {
    id: "d-" + Date.now(),
    ...data,
    stage: "kontak",
    createdAt: Date.now(),
  };
  const next = [deal, ...loadDeals()];
  saveDeals(next);
  return next;
}

export function deleteDeal(id) {
  const next = loadDeals().filter((d) => d.id !== id);
  saveDeals(next);
  return next;
}

export function resetDeals() {
  const seeded = seedDeals();
  saveDeals(seeded);
  return seeded;
}
