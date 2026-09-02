"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { products, formatNaira } from "@/lib/products";
import { useCart } from "@/components/CartContext";
import { ShoppingBag, Star } from "@/components/icons";

export default function ProductDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [length, setLength] = useState(product?.lengths[0] || 0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24">
        <h1 className="serif text-4xl">Product not found</h1>
        <Link href="/shop" className="text-[#f4d58d]">Back to shop</Link>
      </div>
    );
  }

  const add = () => {
    addItem(product, length, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[.25em] text-[#d7ad54]">{product.category}</p>
          <h1 className="serif mt-3 text-5xl">{product.name}</h1>
          <div className="mt-5 flex gap-1 text-[#d7ad54]">{[1,2,3,4,5].map((i) => <Star key={i} size={14} fill="currentColor" />)}</div>
          <p className="mt-5 text-2xl font-semibold text-[#f4d58d]">{formatNaira(product.price)}</p>
          <p className="mt-6 leading-8 text-white/60">{product.description}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            {[["Texture", product.texture], ["Lace", product.lace], ["Stock", "Available"], ["Length", product.lengths[0] === 0 ? "One Size" : `${product.lengths[0]} inches`]].map(([a,b]) => (
              <div key={a} className="rounded-xl border border-white/10 p-4"><span className="block text-white/35">{a}</span><b className="mt-2 block">{b}</b></div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3"><span className="text-xs text-white/40">Quantity</span><div className="flex gap-4 rounded-full border border-white/10 px-4 py-2"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2"><button onClick={add} className="flex items-center justify-center gap-2 rounded-full bg-[#d7ad54] px-5 py-4 text-xs font-bold uppercase tracking-[.16em] text-black"><ShoppingBag size={16} />{added ? "Added to Cart" : "Add to Cart"}</button><button onClick={() => { add(); router.push("/cart"); }} className="rounded-full border border-white/20 px-5 py-4 text-xs font-bold uppercase tracking-[.16em]">Buy Now</button></div>
          <Link href={`/payment-plans?product=${product.id}`} className="mt-3 block rounded-full border border-[#d7ad54]/35 px-5 py-4 text-center text-xs font-bold uppercase tracking-[.16em] text-[#f4d58d]">Start Payment Plan</Link>
        </div>
      </div>
    </div>
  );
}
