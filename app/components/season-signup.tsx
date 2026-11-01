"use client";

import { useId, useState, type FormEvent } from "react";
import { DoodleStar } from "./doodles";
import { Sample } from "./signage";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SeasonSignup() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  // No mailing backend yet: the form validates and confirms, but nothing is sent.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(EMAIL.test(email.trim()) ? "done" : "error");
  };

  return (
    <section aria-labelledby={`${id}-title`} className="px-4 py-14 lg:py-20">
      <div className="flood-soft relative mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[28px] border-[3px] border-ink px-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-16 lg:px-14 lg:py-14">
        <DoodleStar className="absolute right-6 top-6 w-12 lg:left-[46%] lg:right-auto lg:top-10 lg:w-16" />
        <div>
          <h2
            id={`${id}-title`}
            className="max-w-[14ch] pr-14 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] lg:pr-0 lg:text-6xl"
          >
            Шинэ бараа ирэхэд мэдэгдэе
          </h2>
          <p className="mt-3 max-w-[40ch] text-lg">Дараагийн улирал хөдлөхөд таны имэйл рүү түрүүлж мэдэгдэнэ.</p>
        </div>

        <div>
        {state === "done" ? (
          <p role="status" className="rounded-3xl bg-paper px-5 py-4 font-semibold text-ink">
            Баярлалаа! {email.trim()} хаягаар шинэ улирлын мэдээг хүлээн авна.
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <label htmlFor={`${id}-email`} className="sr-only">
              Имэйл хаяг
            </label>
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              aria-invalid={state === "error"}
              aria-describedby={state === "error" ? `${id}-error` : undefined}
              placeholder="tany@email.mn"
              className="h-14 min-w-0 rounded-full border-[3px] border-ink bg-paper px-5 text-base text-ink placeholder:text-ink-soft sm:flex-1 lg:flex-none"
            />
            <button
              type="submit"
              className="h-14 rounded-full bg-ink px-7 font-semibold text-white transition-colors hover:bg-black"
            >
              Бүртгүүлэх
            </button>
          </form>
        )}
        {state === "error" && (
          <p id={`${id}-error`} role="alert" className="mt-3 font-semibold">
            Имэйл хаяг буруу байна. Жишээ нь: name@mail.mn
          </p>
        )}
        <Sample className="mt-4 bg-paper">
          Имэйл одоогоор хадгалагдахгүй
        </Sample>
        </div>
      </div>
    </section>
  );
}
