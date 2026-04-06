import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, Calendar, Users } from "lucide-react";
import contactData from "../content/contact.json";

const WEB3FORMS_KEY = "4c4f0343-dd53-4037-93e2-942ee699458e";

const ContactSection = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          cc: "thewatsonshow@gmail.com",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Book <span className="text-gradient-gold">Johnny</span> Watson
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Available for corporate events, private parties, comedy clubs, and more.
            Reach out and make your event unforgettable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                Get In Touch
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${contactData.email}`} className="font-medium hover:text-primary transition-colors text-sm">
                      {contactData.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                    <a href={`tel:${contactData.phone}`} className="font-medium hover:text-primary transition-colors text-sm">
                      {contactData.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Based In</p>
                    <p className="font-medium text-sm">{contactData.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-theatrical p-6">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                Available For
              </h4>
              <div className="space-y-3">
                {[
                  { icon: Users, label: "Corporate Events" },
                  { icon: Calendar, label: "Private Parties" },
                  { icon: MapPin, label: "Comedy Clubs" },
                  { icon: Users, label: "Fundraisers & Galas" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <item.icon size={14} className="text-primary flex-shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-theatrical p-10 flex flex-col items-center justify-center text-center space-y-5 min-h-[400px]"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thanks for reaching out! Johnny will get back to you within 24-48 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold rounded-sm mt-2"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="card-theatrical p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Event Type</label>
                  <input
                    type="text"
                    placeholder=""Tell us about your event""
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Tell Us About Your Event</label>
                  <textarea
                    placeholder=""Tell us about your event""
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none text-sm"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold rounded-sm w-full"
                >
                  <Send size={16} className="inline mr-2" />
                  {submitting ? "Sending..." : "Send Booking Inquiry"}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24-48 hours
                </p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
