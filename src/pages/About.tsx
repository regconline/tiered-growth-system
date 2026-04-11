import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, Shield, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <header className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            About REGC Digital
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We're a healthcare-focused digital marketing agency dedicated to helping medical practices thrive in the digital age.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              REGC Digital was founded with a clear mission: to bridge the gap between healthcare professionals and the patients who need them. We recognized that many medical practices struggle with digital marketing — not because they lack quality care, but because they lack the digital presence to reach the patients searching for them online.
            </p>
            <p>
              Our team combines deep expertise in digital marketing with a thorough understanding of healthcare industry regulations, including HPCSA advertising guidelines and POPIA compliance. This unique combination allows us to create marketing strategies that are not only effective but also fully compliant with South African healthcare regulations.
            </p>
            <p>
              We believe every healthcare practice deserves a professional digital presence that reflects the quality of care they provide. That's why we've developed a tiered service model that makes professional digital marketing accessible to practices of all sizes — from solo practitioners to multi-location healthcare groups.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Results-Focused", desc: "Every strategy is designed with measurable patient growth outcomes. We don't chase vanity metrics — we drive real appointments and inquiries." },
              { icon: Shield, title: "Compliance-First", desc: "Healthcare marketing requires strict adherence to HPCSA and POPIA regulations. Compliance isn't an afterthought — it's built into everything we do." },
              { icon: Users, title: "Patient-Centric", desc: "We design every digital touchpoint from the patient's perspective — making it easy for them to find, trust, and choose your practice." },
              { icon: TrendingUp, title: "Scalable Growth", desc: "Our tiered model grows with your practice. Start with the basics and scale up as your patient base and budget expand." },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-8 flex gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8">Let's discuss how we can help your healthcare practice grow digitally.</p>
          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
