const TEXT =
  'BARU DROP  •  1-OF-1  •  STOK 1  •  LIMITED  •  EKSKLUSIF  •  '

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-soft-border bg-background py-3.5">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-x 22s linear infinite' }}
      >
        {/* Dua kopi untuk loop mulus */}
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-gray">
          {TEXT}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-gray">
          {TEXT}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-gray">
          {TEXT}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-gray">
          {TEXT}
        </span>
      </div>
    </div>
  )
}
