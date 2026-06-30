import { Shirt } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Empty state untuk produk yang belum punya foto — bukan foto palsu. */
export function NoPhoto({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-soft-border/40',
        className,
      )}
    >
      <Shirt className="h-8 w-8 text-warm-gray/50" aria-hidden />
    </div>
  )
}
