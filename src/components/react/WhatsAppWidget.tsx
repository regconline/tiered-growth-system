import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "27640826855";
const DEFAULT_MSG = "Hi REGC Digital! I'd like to learn more about your healthcare marketing services.";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const send = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Chat with REGC Digital</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground">Hi! 👋 How can we help your practice grow?</p>
            <button onClick={() => send(DEFAULT_MSG)} className="w-full text-left text-sm bg-muted hover:bg-muted/70 rounded-lg px-3 py-2 transition-colors">💬 Start a conversation</button>
            <button onClick={() => send("I'd like to book a free consultation.")} className="w-full text-left text-sm bg-muted hover:bg-muted/70 rounded-lg px-3 py-2 transition-colors">📅 Book a free consultation</button>
            <button onClick={() => send("Please send me pricing information.")} className="w-full text-left text-sm bg-muted hover:bg-muted/70 rounded-lg px-3 py-2 transition-colors">💰 Get pricing info</button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open WhatsApp chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </>
  );
}
