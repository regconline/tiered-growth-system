import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

const WHATSAPP_NUMBER = "27640826855";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    practice: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const onChange = (k: keyof typeof form) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi REGC Digital, I'd like to enquire about your services.`,
      ``,
      `*Name:* ${form.name}`,
      form.practice && `*Practice:* ${form.practice}`,
      `*Email:* ${form.email}`,
      form.phone && `*Phone:* ${form.phone}`,
      form.service && `*Service of interest:* ${form.service}`,
      ``,
      `*Message:*`,
      form.message,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const inputCls = "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Your name *</label>
          <input required type="text" value={form.name} onChange={onChange("name")} className={inputCls} placeholder="Dr Jane Smith" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Practice name</label>
          <input type="text" value={form.practice} onChange={onChange("practice")} className={inputCls} placeholder="Smith Medical Centre" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
          <input required type="email" value={form.email} onChange={onChange("email")} className={inputCls} placeholder="you@practice.co.za" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={onChange("phone")} className={inputCls} placeholder="064 082 6855" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Service of interest</label>
        <select value={form.service} onChange={onChange("service")} className={inputCls}>
          <option value="">Select a service…</option>
          <option>Website Design & Development</option>
          <option>SEO & Local Search</option>
          <option>Google Ads & PPC</option>
          <option>Social Media Management</option>
          <option>Reputation & Reviews</option>
          <option>Email & Patient Communication</option>
          <option>Branding & Design</option>
          <option>Photography & Video</option>
          <option>Analytics & Reporting</option>
          <option>Strategy & Consulting</option>
          <option>I'm not sure — please advise</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">How can we help? *</label>
        <textarea required rows={5} value={form.message} onChange={onChange("message")} className={inputCls} placeholder="Tell us about your practice and goals…" />
      </div>
      <button type="submit" className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground rounded-lg px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors">
        <Send className="w-4 h-4" /> Send via WhatsApp
      </button>
      <p className="text-xs text-muted-foreground text-center">Submitting opens WhatsApp with your message ready to send.</p>
    </form>
  );
}
