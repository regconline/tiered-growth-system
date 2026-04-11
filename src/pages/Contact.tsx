import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi REGC Digital!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}`;
    window.open(`https://wa.me/27640826855?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Ready to grow your healthcare practice? Reach out and let's discuss how we can help.
          </p>
        </div>
      </header>

      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">Phone / WhatsApp</h3>
                    <a href="tel:+27640826855" className="text-muted-foreground hover:text-secondary transition-colors">064 082 6855</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">Email</h3>
                    <div className="space-y-1">
                      <a href="mailto:info@regcdigital.co.za" className="block text-muted-foreground hover:text-secondary transition-colors text-sm">
                        info@regcdigital.co.za <span className="text-muted-foreground/50">— General</span>
                      </a>
                      <a href="mailto:sales@regcdigital.co.za" className="block text-muted-foreground hover:text-secondary transition-colors text-sm">
                        sales@regcdigital.co.za <span className="text-muted-foreground/50">— Sales</span>
                      </a>
                      <a href="mailto:support@regcdigital.co.za" className="block text-muted-foreground hover:text-secondary transition-colors text-sm">
                        support@regcdigital.co.za <span className="text-muted-foreground/50">— Support</span>
                      </a>
                      <a href="mailto:finance@regcdigital.co.za" className="block text-muted-foreground hover:text-secondary transition-colors text-sm">
                        finance@regcdigital.co.za <span className="text-muted-foreground/50">— Finance</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/27640826855"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary transition-colors text-sm"
                    >
                      Chat with us on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-3">Business Hours</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                  <p>Saturday: 9:00 AM – 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-tier-basic-bg border-2 tier-basic-border rounded-xl p-8 text-center">
                  <p className="text-lg font-display font-bold text-foreground mb-2">Thank you!</p>
                  <p className="text-muted-foreground">Your message has been sent via WhatsApp. We'll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-secondary font-semibold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="john@practice.co.za"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="064 000 0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Service Interested In</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    >
                      <option value="">Select a service...</option>
                      <option value="Website Services">Website Services</option>
                      <option value="SEO Services">SEO Services</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Content Marketing">Content Marketing</option>
                      <option value="Reputation Management">Reputation Management</option>
                      <option value="Patient Communication">Patient Communication Systems</option>
                      <option value="Analytics & Reporting">Analytics & Reporting</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Branding">Branding</option>
                      <option value="Conversion Optimization">Conversion Optimization</option>
                      <option value="Full Package">Full Monthly Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                      placeholder="Tell us about your practice and what you need..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    Send via WhatsApp
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Or email us directly at <a href="mailto:info@regcdigital.co.za" className="text-secondary hover:underline">info@regcdigital.co.za</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
