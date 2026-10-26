export const STAGES = [
  { id: "kontak", label: "Kontak Baru" },
  { id: "followup", label: "Follow-up" },
  { id: "penawaran", label: "Penawaran" },
  { id: "negosiasi", label: "Negosiasi" },
  { id: "deal", label: "Deal ✅" },
];

export const SOURCES = ["Website", "Referensi", "Instagram", "Google Maps", "Event"];

export const PRODUCTS = [
  "Website Company Profile",
  "Toko Online",
  "Web App / Sistem",
  "Landing Page",
  "Maintenance",
];

export const fmtIDR = (n) =>
  "Rp" + (n || 0).toLocaleString("id-ID", { notation: n >= 1e9 ? "compact" : "standard" });

export const fmtFull = (n) => "Rp" + (n || 0).toLocaleString("id-ID");

export const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });

export const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

export const daysFromToday = (iso) => {
  if (!iso) return null;
  const t = todayISO();
  return Math.round((new Date(iso + "T00:00:00") - new Date(t + "T00:00:00")) / 86400000);
};
