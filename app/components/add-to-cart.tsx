"use client";

import { useCart } from "./cart";
import { PlusIcon } from "./icons";

export function AddToCart({ id, name }: { id: string; name: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(id)}
      aria-label={`Сагсанд нэмэх: ${name}`}
      className="flood grid size-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
    >
      <PlusIcon />
    </button>
  );
}
