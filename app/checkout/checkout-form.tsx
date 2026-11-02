"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { colors, formatPrice } from "@/lib/catalog";
import { aimags, deliveryMethods, districts, type MethodId, type Region } from "@/lib/checkout";
import { useCart, useCartItems } from "../components/cart";
import { BagIcon, CheckIcon, ChevronIcon } from "../components/icons";
import { Sample } from "../components/signage";

type Fields = {
  name: string;
  phone: string;
  email: string;
  district: string;
  khoroo: string;
  building: string;
  apartment: string;
  aimag: string;
  sum: string;
  address: string;
  note: string;
};

const EMPTY: Fields = {
  name: "",
  phone: "",
  email: "",
  district: "",
  khoroo: "",
  building: "",
  apartment: "",
  aimag: "",
  sum: "",
  address: "",
  note: "",
};

type Errors = Partial<Record<keyof Fields | "method", string>>;
type StopId = "contact" | "address" | "delivery" | "payment";

const phoneDigits = (v: string) => v.replace(/\D/g, "").replace(/^976(?=\d{8}$)/, "");

function validate(f: Fields, region: Region, method: MethodId | null): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Нэрээ оруулна уу.";
  if (!/^\d{8}$/.test(phoneDigits(f.phone))) e.phone = "Утасны дугаараа 8 оронтойгоор оруулна уу. Жишээ нь: 99112233";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Имэйл хаяг буруу байна. Жишээ нь: name@mail.mn";
  if (method !== "pickup") {
    if (region === "ub") {
      if (!f.district) e.district = "Дүүргээ сонгоно уу.";
      if (!f.khoroo.trim()) e.khoroo = "Хорооны дугаараа оруулна уу.";
      if (!f.building.trim()) e.building = "Байр эсвэл гудамжаа оруулна уу.";
    } else {
      if (!f.aimag) e.aimag = "Аймгаа сонгоно уу.";
      if (!f.sum.trim()) e.sum = "Сумаа оруулна уу.";
      if (!f.address.trim()) e.address = "Хаягаа дэлгэрэнгүй бичнэ үү.";
    }
  }
  if (!method) e.method = "Хүргэлтийн аргаа сонгоно уу.";
  return e;
}

const stopFields: Record<StopId, (keyof Errors)[]> = {
  contact: ["name", "phone", "email"],
  address: ["district", "khoroo", "building", "aimag", "sum", "address"],
  delivery: ["method"],
  payment: [],
};

export function CheckoutForm() {
  const { ready } = useCart();
  const items = useCartItems();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [region, setRegion] = useState<Region>("ub");
  const [method, setMethod] = useState<MethodId | null>("ub-courier");
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState<StopId>("contact");

  const errors = validate(fields, region, method);
  const shown = (k: keyof Errors) => (submitted || touched[k] ? errors[k] : undefined);
  const stopDone = (s: StopId) => s !== "payment" && stopFields[s].every((k) => !errors[k]) && stopFields[s].some((k) => k === "method" || fields[k as keyof Fields]);

  const set = (k: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [k]: v }));
  const blur = (k: keyof Errors) => () => setTouched((t) => ({ ...t, [k]: true }));

  const methods = deliveryMethods.filter((m) => m.regions.includes(region));
  const fee = deliveryMethods.find((m) => m.id === method)?.fee ?? 0;
  const subtotal = items.reduce((s, l) => s + l.qty * l.product.price, 0);
  const total = subtotal + (method ? fee : 0);
  const errorCount = Object.keys(errors).length;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errorCount > 0) {
      // Move focus to the first field that needs fixing, in reading order.
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(),
      );
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16" aria-busy="true">
        <p className="text-ink-soft">Сагсыг уншиж байна…</p>
      </div>
    );
  }

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center">
        <BagIcon size={48} />
        <h1 className="font-display text-3xl font-bold">Сагс хоосон байна</h1>
        <p className="text-ink-soft">Захиалга хийхийн өмнө сагсандаа бараа нэмнэ үү.</p>
        <Link href="/" className="flood mt-2 inline-flex min-h-13 items-center rounded-full px-7 font-display font-bold text-white no-underline">
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 lg:py-20">
        <div className="overflow-hidden rounded-[28px] border-[3px] border-ink">
          <div className="flood-soft flex items-center gap-3 border-b-[3px] border-ink px-5 py-4">
            <span className="flood grid size-10 place-items-center rounded-full text-white">
              <CheckIcon />
            </span>
            <h1 className="font-display text-2xl font-bold">Төлбөрийн мэдээлэл</h1>
          </div>
          <div className="space-y-3 px-5 py-5">
            <p className="text-lg font-semibold">
              Баярлалаа, {fields.name.trim()}! Таны захиалгын мэдээлэл бүрэн бөглөгдлөө.
            </p>
            <p className="rounded-2xl border-2 border-dashed border-ink-soft px-4 py-3 text-ink-soft">
              Энэ бол жишээ хуудас: захиалга илгээгдээгүй, төлбөр авагдаагүй. Дэлгүүр захиалга хүлээн авах систем
              холбогдсоны дараа энд баталгаажуулалт гарна.
            </p>
            <p className="font-display text-xl font-bold tabular">Нийт: {formatPrice(total)}</p>
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold">
              Нүүр хуудас руу буцах
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const summary = <OrderSummary items={items} subtotal={subtotal} fee={method ? fee : null} total={total} />;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-4 lg:pt-8">
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] lg:text-5xl">Захиалга</h1>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
        <div className="lg:hidden">
          <MobileSummary count={items.reduce((n, l) => n + l.qty, 0)} total={total}>
            {summary}
          </MobileSummary>
        </div>

        <form id={formId} ref={formRef} onSubmit={submit} noValidate className="min-w-0">
          {submitted && errorCount > 0 && (
            <p role="alert" className="mb-6 rounded-2xl border-[3px] border-spring px-4 py-3 font-semibold text-spring">
              {errorCount} талбарыг засна уу. Улаанаар тэмдэглэсэн талбаруудыг шалгаарай.
            </p>
          )}

          <ol className="relative">
            <span aria-hidden="true" className="flood absolute bottom-10 left-[13px] top-4 w-1.5 rounded-full" />

            <Stop id="contact" title="Холбоо барих" active={active} done={stopDone("contact")} onFocus={setActive}>
              <Field label="Нэр" error={shown("name")}>
                {(p) => (
                  <input {...p} autoComplete="name" value={fields.name} onChange={(e) => set("name")(e.target.value)} onBlur={blur("name")} />
                )}
              </Field>
              <Field label="Утасны дугаар" hint="8 оронтой, жишээ нь 99112233" error={shown("phone")}>
                {(p) => (
                  <div className="flex">
                    <span className="grid place-items-center rounded-l-2xl border-[3px] border-r-0 border-rule bg-platform px-3 font-semibold tabular">
                      +976
                    </span>
                    <input
                      {...p}
                      className={`${p.className} rounded-l-none`}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={fields.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      onBlur={blur("phone")}
                    />
                  </div>
                )}
              </Field>
              <Field label="Имэйл" optional error={shown("email")}>
                {(p) => (
                  <input
                    {...p}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => set("email")(e.target.value)}
                    onBlur={blur("email")}
                  />
                )}
              </Field>
            </Stop>

            <Stop id="address" title="Хүргэлтийн хаяг" active={active} done={stopDone("address") || method === "pickup"} onFocus={setActive}>
              <fieldset className="min-w-0">
                <legend className="mb-2 font-semibold">Хаана хүргэх вэ?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "ub", label: "Улаанбаатар" },
                      { id: "countryside", label: "Орон нутаг" },
                    ] as const
                  ).map((r) => (
                    <label
                      key={r.id}
                      className={`flex min-h-13 cursor-pointer items-center justify-center rounded-2xl border-[3px] px-3 text-center font-semibold has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink ${
                        region === r.id ? "border-ink bg-platform" : "border-rule hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="region"
                        value={r.id}
                        checked={region === r.id}
                        onChange={() => {
                          setRegion(r.id);
                          setMethod(deliveryMethods.find((m) => m.regions.includes(r.id) && m.fee > 0)!.id);
                        }}
                        className="sr-only"
                      />
                      {r.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {region === "ub" ? (
                <>
                  <Field label="Дүүрэг" error={shown("district")}>
                    {(p) => (
                      <select {...p} value={fields.district} onChange={(e) => set("district")(e.target.value)} onBlur={blur("district")}>
                        <option value="">Сонгоно уу</option>
                        {districts.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Хороо" error={shown("khoroo")}>
                      {(p) => (
                        <input {...p} inputMode="numeric" placeholder="Жишээ: 3" value={fields.khoroo} onChange={(e) => set("khoroo")(e.target.value)} onBlur={blur("khoroo")} />
                      )}
                    </Field>
                    <Field label="Тоот" optional>
                      {(p) => <input {...p} value={fields.apartment} onChange={(e) => set("apartment")(e.target.value)} />}
                    </Field>
                  </div>
                  <Field label="Байр / гудамж" error={shown("building")}>
                    {(p) => (
                      <input {...p} autoComplete="address-line1" placeholder="Жишээ: 15-р байр, 2-р орц" value={fields.building} onChange={(e) => set("building")(e.target.value)} onBlur={blur("building")} />
                    )}
                  </Field>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Аймаг" error={shown("aimag")}>
                      {(p) => (
                        <select {...p} value={fields.aimag} onChange={(e) => set("aimag")(e.target.value)} onBlur={blur("aimag")}>
                          <option value="">Сонгоно уу</option>
                          {aimags.map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field label="Сум" error={shown("sum")}>
                      {(p) => <input {...p} value={fields.sum} onChange={(e) => set("sum")(e.target.value)} onBlur={blur("sum")} />}
                    </Field>
                  </div>
                  <Field label="Дэлгэрэнгүй хаяг" error={shown("address")}>
                    {(p) => (
                      <textarea {...p} rows={3} className={`${p.className} h-auto py-3`} value={fields.address} onChange={(e) => set("address")(e.target.value)} onBlur={blur("address")} />
                    )}
                  </Field>
                </>
              )}
              <Field label="Нэмэлт тайлбар" optional hint="Жишээ нь: орцны код, хүргэх цаг">
                {(p) => <textarea {...p} rows={2} className={`${p.className} h-auto py-3`} value={fields.note} onChange={(e) => set("note")(e.target.value)} />}
              </Field>
              {method === "pickup" && <p className="text-sm text-ink-soft">Очиж авах үед хаяг шаардлагагүй.</p>}
            </Stop>

            <Stop id="delivery" title="Хүргэлтийн арга" active={active} done={stopDone("delivery")} onFocus={setActive}>
              <fieldset className="min-w-0" aria-describedby={shown("method") ? `${formId}-method-error` : undefined}>
                {/* <legend className="mb-2 flex flex-wrap items-center gap-2 font-semibold">
                  Хүргэлтээ сонгоно уу <Sample>Жишээ нөхцөл</Sample>
                </legend> */}
                <div className="space-y-2">
                  {methods.map((m) => (
                    <label
                      key={m.id}
                      className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-[3px] px-4 py-3 has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink ${
                        method === m.id ? "border-ink bg-platform" : "border-rule hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={method === m.id}
                        onChange={() => setMethod(m.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`grid size-6 shrink-0 place-items-center rounded-full border-[5px] border-(--line) ${method === m.id ? "flood" : "bg-paper"}`}
                      >
                        {method === m.id && <span className="size-2 rounded-full bg-white" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold">{m.name}</span>
                        <span className="block text-sm text-ink-soft">{m.detail}</span>
                      </span>
                      <span className="font-display font-bold tabular">{m.fee === 0 ? "Төлбөргүй" : formatPrice(m.fee)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {shown("method") && (
                <p id={`${formId}-method-error`} className="font-semibold text-spring">
                  {errors.method}
                </p>
              )}
            </Stop>

            <Stop id="payment" title="Төлбөр" active={active} done={false} onFocus={setActive} last>
              <div className="rounded-2xl border-[3px] border-dashed border-ink-soft px-4 py-4">
                <p className="font-semibold">Төлбөрийн аргууд удахгүй нэмэгдэнэ.</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Одоогоор төлбөр авахгүй бөгөөд захиалга илгээгдэхгүй. Энэ хуудас нь жишээ.
                </p>
                <Sample className="mt-3">Төлбөр тодорхойгүй</Sample>
              </div>
            </Stop>
          </ol>

          <button
            type="submit"
            className="flood mt-2 hidden min-h-14 w-full items-center justify-center rounded-full font-display text-lg font-bold text-white lg:flex"
          >
            Захиалах · {formatPrice(total)}
          </button>
        </form>

        <aside aria-label="Захиалгын дүн" className="hidden lg:block">
          <div className="sticky top-24">{summary}</div>
        </aside>
      </div>

      <div className="buy-bar fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-paper px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Нийт{method ? "" : " (хүргэлтгүй)"}</p>
            <p className="font-display text-lg font-extrabold tabular">{formatPrice(total)}</p>
          </div>
          <button type="submit" form={formId} className="flood min-h-13 rounded-full px-7 font-display font-bold text-white">
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
}

// One stop on the checkout line: black dot while you are in it, filled once it is complete.
function Stop({
  id,
  title,
  active,
  done,
  onFocus,
  last,
  children,
}: {
  id: StopId;
  title: string;
  active: StopId;
  done: boolean;
  onFocus: (id: StopId) => void;
  last?: boolean;
  children: ReactNode;
}) {
  const here = active === id;
  return (
    <li className={`relative pl-12 ${last ? "pb-6" : "pb-10"}`} onFocusCapture={() => onFocus(id)}>
      <span aria-hidden="true" className="absolute left-0 top-0 grid size-8 place-items-center">
        {here ? (
          <span className="block size-8 rounded-full border-[5px] border-paper bg-ink shadow-[0_0_0_4px_var(--color-ink)]" />
        ) : done ? (
          <span className="flood grid size-8 place-items-center rounded-full text-white">
            <CheckIcon size={18} />
          </span>
        ) : (
          <span className="block size-7 rounded-full border-[5px] border-(--line) bg-paper" />
        )}
      </span>
      <h2 className="flex items-center gap-2 font-display text-xl font-bold leading-8 lg:text-2xl">
        {title}
        {done && !here && <span className="sr-only">(бөглөсөн)</span>}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </li>
  );
}

type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  className: string;
};

function Field({
  label,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: (p: ControlProps) => ReactNode;
}) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label}
        {optional && <span className="font-normal text-ink-soft"> (заавал биш)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-0.5 mb-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        className: `h-13 w-full min-w-0 rounded-2xl border-[3px] bg-paper px-4 text-base placeholder:text-ink-soft focus:border-ink focus:outline-none ${
          error ? "border-spring" : "border-rule hover:border-ink-soft"
        }`,
      })}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-semibold text-spring">
          {error}
        </p>
      )}
    </div>
  );
}

type Item = ReturnType<typeof useCartItems>[number];

function OrderSummary({ items, subtotal, fee, total }: { items: Item[]; subtotal: number; fee: number | null; total: number }) {
  return (
    <div className="overflow-hidden rounded-[28px] border-[3px] border-ink bg-paper">
      <div className="flex items-center justify-between border-b-[3px] border-ink px-5 py-3">
        <h2 className="font-display text-lg font-bold">Таны захиалга</h2>
        <Link href="/" className="text-sm font-semibold">
          Дэлгүүр рүү
        </Link>
      </div>
      <ul className="divide-y-2 divide-rule px-5">
        {items.map(({ key, qty, size, color, product }) => (
          <li key={key} className="flex gap-3 py-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border-2 border-ink">
              <Image src={product.image} alt="" fill unoptimized className="object-cover" />
              <span className="absolute -right-2 -top-2 grid min-w-6 place-items-center rounded-full bg-ink px-1 text-xs font-bold text-white tabular">
                {qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-snug">{product.name}</p>
              <p className="text-sm text-ink-soft">
                {[size && `${size}${product.category === "shoes" ? " мм" : ""}`, color && colors[color].name].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span className="font-display font-bold tabular">{formatPrice(qty * product.price)}</span>
          </li>
        ))}
      </ul>
      <dl className="space-y-2 border-t-[3px] border-ink px-5 py-4">
        <div className="flex justify-between">
          <dt>Барааны дүн</dt>
          <dd className="font-semibold tabular">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="flex flex-wrap items-center gap-2">
            Хүргэлт <Sample />
          </dt>
          <dd className="font-semibold tabular">{fee === null ? "Сонгоогүй" : fee === 0 ? "Төлбөргүй" : formatPrice(fee)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t-2 border-rule pt-3">
          <dt className="font-display text-lg font-bold">Нийт</dt>
          <dd className="font-display text-2xl font-extrabold tabular">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}

function MobileSummary({ count, total, children }: { count: number; total: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-[3px] border-ink px-4 font-semibold"
      >
        <span>
          {count} бараа · <span className="font-display font-bold tabular">{formatPrice(total)}</span>
        </span>
        <span className="flex items-center gap-1 text-sm">
          {open ? "Хураах" : "Харах"}
          <ChevronIcon size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      <div id={id} hidden={!open} className="mt-3">
        {children}
      </div>
    </div>
  );
}
