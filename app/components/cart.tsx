"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { catalog, colors, formatPrice, stationCode, type ColorId } from "@/lib/catalog";
import { lowestDeliveryFee } from "@/lib/checkout";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from "./icons";
import { Sample } from "./signage";

// One line per product variant: the same jacket in M and L is two lines.
type Line = { key: string; id: string; size?: string; color?: ColorId; qty: number };
type Variant = { size?: string; color?: ColorId };

const STORAGE_KEY = "online-shop.cart.v2";
const EMPTY: Line[] = [];
const listeners = new Set<() => void>();
let lines: Line[] | null = null;

function read(): Line[] {
  if (lines) return lines;
  try {
    lines = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    lines = [];
  }
  return lines!;
}

function write(next: Line[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the cart still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type CartContextValue = {
  lines: Line[];
  count: number;
  add: (id: string, variant?: Variant) => void;
  setQty: (key: string, qty: number) => void;
  open: () => void;
  // False during server render and hydration, before the stored cart is readable.
  ready: boolean;
};

const lineKey = (id: string, v: Variant) => [id, v.size ?? "", v.color ?? ""].join("|");

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

// Cart lines joined with their products; lines whose product no longer exists are dropped.
export function useCartItems() {
  const { lines } = useCart();
  return lines
    .map((l) => ({ ...l, product: catalog.find((p) => p.id === l.id)! }))
    .filter((l) => l.product);
}

const noop = () => () => {};

export function CartProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const [isOpen, setOpen] = useState(false);

  const setQty = useCallback((key: string, qty: number) => {
    write(
      qty > 0
        ? read().map((l) => (l.key === key ? { ...l, qty } : l))
        : read().filter((l) => l.key !== key),
    );
  }, []);

  const add = useCallback((id: string, variant: Variant = {}) => {
    const key = lineKey(id, variant);
    const existing = read().find((l) => l.key === key);
    write(
      existing
        ? read().map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
        : [...read(), { key, id, ...variant, qty: 1 }],
    );
    setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: current,
      count: current.reduce((n, l) => n + l.qty, 0),
      add,
      setQty,
      open: () => setOpen(true),
      ready,
    }),
    [current, add, setQty, ready],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
    </CartContext.Provider>
  );
}

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setQty, count } = useCart();
  const items = useCartItems();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const subtotal = items.reduce((sum, l) => sum + l.qty * l.product.price, 0);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="cart-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-transparent p-0 backdrop:bg-ink/50"
    >
      <div className="drawer-in flex h-full flex-col border-l-[3px] border-ink bg-paper">
        <div className="flood-soft flex items-center justify-between border-b-[3px] border-ink px-4 py-3">
          <h2 id="cart-title" className="font-display text-xl font-bold">
            Таны сагс{count > 0 && <span className="tabular"> · {count}</span>}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border-[3px] border-ink bg-paper hover:bg-platform"
            aria-label="Сагсыг хаах"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <BagIcon size={48} />
            <p className="font-display text-lg font-bold">Сагс хоосон байна</p>
            <p className="text-ink-soft">Улирлын улиралаар аялж, таалагдсан бараагаа нэмээрэй.</p>
            <button
              type="button"
              onClick={onClose}
              className="flood min-h-12 rounded-full px-6 font-semibold text-white"
            >
              Дэлгүүр рүү буцах
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y-2 divide-rule overflow-y-auto px-4">
              {items.map(({ key, qty, size, color, product }) => (
                <li key={key} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 border-ink bg-paper">
                    <Image src={product!.image} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-xs font-semibold text-ink-soft tabular">
                      Буудал {stationCode(product!)}
                    </span>
                    <Link
                      href={`/product/${product!.slug}`}
                      onClick={onClose}
                      className="font-semibold leading-snug no-underline hover:underline"
                    >
                      {product!.name}
                    </Link>
                    {(size || color) && (
                      <span className="text-sm text-ink-soft">
                        {[
                          size && `Хэмжээ ${size}${product!.category === "shoes" ? " мм" : ""}`,
                          color && colors[color].name,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border-2 border-ink">
                        <button
                          type="button"
                          onClick={() => setQty(key, qty - 1)}
                          className="grid size-11 place-items-center"
                          aria-label={qty === 1 ? `${product!.name} хасах` : "Тоо ширхэг багасгах"}
                        >
                          <MinusIcon size={18} />
                        </button>
                        <span className="w-6 text-center font-semibold tabular" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(key, qty + 1)}
                          className="grid size-11 place-items-center"
                          aria-label="Тоо ширхэг нэмэх"
                        >
                          <PlusIcon size={18} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQty(key, 0)}
                        className="min-h-11 px-1 text-sm font-semibold text-ink-soft underline hover:text-ink"
                      >
                        Хасах
                      </button>
                      <span className="font-display font-bold tabular">
                        {formatPrice(qty * product!.price)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t-[3px] border-ink px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
              <dl className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <dt className="font-semibold">Барааны дүн</dt>
                  <dd className="font-display text-lg font-bold tabular">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="flex flex-wrap items-center gap-2 font-semibold">
                    Хүргэлт <Sample />
                  </dt>
                  <dd className="text-right font-semibold tabular">{formatPrice(lowestDeliveryFee)}-өөс</dd>
                </div>
              </dl>
              <p className="mt-2 text-sm text-ink-soft">
                Хүргэлтийн аргаа дараагийн алхамд сонгоход нийт дүн тодорхой болно. Очиж авбал хүргэлтгүй.
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flood mt-4 flex min-h-13 items-center justify-center rounded-full font-display font-bold text-white no-underline"
              >
                Захиалга хийх
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 min-h-11 w-full font-semibold underline"
              >
                Дэлгүүр рүү буцах
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
