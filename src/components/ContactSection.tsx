import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, Calendar, Users } from "lucide-react";
import contactData from "../content/contact.json";

const WEB3FORMS_KEY = "4c4f0343-dd53-4037-93e2-942ee699458e";

const ContactSection = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `Booking Inquiry: ${formData.subject}`,
          message: formData.message,
          cc: "thewatsonshows@gmail.com",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
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
        
        {/* TITLE */}
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
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">

          {/* LEFT SIDE INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-semibold mb-6">
                Get In Touch
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href={`mailto:${contactData.email}`}>
                      {contactData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a href={`tel:${contactData.phone}`}>
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Based In</p>
                    <p>{contactData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-theatrical p-6">
              <h4 className="text-sm text-primary mb-4">Available For</h4>

              {[
                { icon: Users, label: "Corporate Events" },
                { icon: Calendar, label: "Private Parties" },
                { icon: MapPin, label: "Comedy Clubs" },
                { icon: Users, label: "Fundraisers & Galas" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon size={14} />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div className="lg:col-span-3">

            {submitted ? (
              <div className="text-center p-10">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p>We’ll get back to you within 24–48 hours.</p>
                <button onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-theatrical p-8 space-y-5">

  <input type="checkbox" name="botcheck" className="hidden" />

  <div className="grid sm:grid-cols-2 gap-5">
    <input
      type="text"
      placeholder="Your Name"
      required
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none text-sm"
    />

    <input
      type="email"
      placeholder="Email Address"
      required
      value={formData.email}
      onChange={(e) =>
        setFormData({ ...formData, email: e.target.value })
      }
      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none text-sm"
    />
  </div>

  <input
    type="text"
    placeholder="Corporate Event, Private Party, etc."
    required
    value={formData.subject}
    onChange={(e) =>
      setFormData({ ...formData, subject: e.target.value })
    }
    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none text-sm"
  />

  <textarea
    placeholder="Date, location, audience size, and any special requests"
    rows={5}
    required
    value={formData.message}
    onChange={(e) =>
      setFormData({ ...formData, message: e.target.value })
    }
    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none resize-none text-sm"
  />

  {error && (
    <p className="text-red-400 text-sm text-center">
      Something went wrong. Please try again.
    </p>
  )}

  <button
    type="submit"
    disabled={submitting}
    className="btn-gold rounded-sm w-full"
  >
    {submitting ? "Sending..." : "Send Booking Inquiry"}
  </button>

</form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;