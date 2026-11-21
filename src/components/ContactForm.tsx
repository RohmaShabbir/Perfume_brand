"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const subjects = ["Order enquiry", "Bulk / gifting", "Collaboration", "Other"];

const field =
  "w-full border-b border-lux-gold/30 bg-transparent py-3 text-sm text-lux-ivory placeholder:text-lux-ivory/35 transition focus:border-lux-gold focus:outline-none";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: subjects[0], message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hello ${site.name},\n\n` +
      `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nSubject: ${f.subject}\n\n${f.message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <input required value={f.name} onChange={set("name")} placeholder="Your name" className={field} />
      <div className="grid gap-6 sm:grid-cols-2">
        <input required type="email" value={f.email} onChange={set("email")} placeholder="Email" className={field} />
        <input value={f.phone} onChange={set("phone")} placeholder="Phone (optional)" className={field} />
      </div>
      <select value={f.subject} onChange={set("subject")} className={`${field} appearance-none`}>
        {subjects.map((s) => (
          <option key={s} value={s} className="bg-lux-espresso text-lux-ivory">
            {s}
          </option>
        ))}
      </select>
      <textarea
        required
        rows={5}
        value={f.message}
        onChange={set("message")}
        placeholder="How can we help?"
        className={`${field} resize-none`}
      />
      <button
        type="submit"
        className="shimmer rounded-full bg-lux-gold px-12 py-4 text-xs font-medium uppercase tracking-[0.35em] text-lux-black transition hover:brightness-110"
      >
        Send via WhatsApp
      </button>
    </form>
  );
}