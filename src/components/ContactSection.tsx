import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import contactData from "../content/contact.json";

const ContactSection = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <form name="contact" method="POST" data-netlify="true" hidden>
        <input name="name" />
        <input name="email" />
        <input name="subject" />
        <textarea name="message"></textarea>
      </form>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Let's Create Something Special
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you're planning a corporate event or private party, we'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${contactData.email}`} className="font-medium hover:text-primary transition-colors">
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href={`tel:${contactData.phone}`} className="font-medium hover:text-primary transition-colors">
                  {contactData.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Based In</p>
                <p className="font-medium">{contactData.location}</p>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-theatrical p-8 flex flex-col items-center justify-center text-center space-y-4"
          >
            <CheckCircle size={56} className="text-green-400" />
            <h3 className="text-2xl font-display font-semibold">Message Sent!</h3>
            <p className="text-muted-foreground">
              Thanks for reaching out! Johnny will get back to you as soon as possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-outline-gold rounded-sm mt-4"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="card-theatrical p-8 space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Your Name" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg" />
              <input type="email" name="email" placeholder="Email Address" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg" />
            </div>
            <input type="text" name="subject" placeholder="Booking Inquiry" required
              value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg" />
            <textarea name="message" placeholder="Tell us about your event..." rows={5} required
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg resize-none" />
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold rounded-sm w-full"
            >
              <Send size={18} className="inline mr-2" />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
