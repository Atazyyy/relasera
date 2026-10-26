# Relasera — CRM Pipeline untuk Bisnis Jasa

> **Kategori proyek: Web App — CRM (Customer Relationship Management).**
> Papan pipeline 5 tahap: Kontak Baru → Follow-up → Penawaran → Negosiasi → Deal.

CRM ringan untuk freelancer dan bisnis jasa kecil yang sehari-hari mencatat
calon klien di catatan ponsel. Proyek ini adalah **concept demo** untuk
portofolio jasa pembuatan web — studio "Kara Digital", semua usaha, kontak,
dan nilai deal bersifat fiktif. Nama "Relasera" sengaja dibuat unik (belum
dipakai entitas mana pun di internet).

**Live:** https://relasera.vercel.app

## Fitur

- **Pipeline 5 tahap** (kanban horizontal) dengan tombol lanjut/mundur per
  deal dan hapus deal.
- Kartu deal: nama usaha, kontak person, produk yang ditawarkan, nilai
  deal, sumber lead, catatan (klik kartu untuk membuka detail).
- **Pengingat follow-up**: tanggal tindak lanjut per deal; yang sudah
  lewat jatuh tempo ditandai merah.
- Statistik: total nilai pipeline, nilai deal dimenangkan, win rate, dan
  jumlah follow-up yang jatuh tempo hari ini.
- **Form tambah deal** dengan validasi + tombol reset data demo.
- Semua data tersimpan di **localStorage**.

## Untuk siapa demo ini?

Freelancer, agensi, kontraktor, konsultan — siapa pun yang menutup
penjualan lewat percakapan dan butuh papan untuk melihat "posisi tiap
calon klien" sekarang.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (reveal animasi)
- Lucide Icons

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # build produksi ke folder dist/
```

## Catatan

- Seluruh deal adalah data contoh (seed) yang disimpan di localStorage
  browser — tidak ada backend sungguhan.
- Dibuat sebagai concept demo portofolio oleh
  [Agni Miftah Fauzi](https://github.com/Atazyyy).
