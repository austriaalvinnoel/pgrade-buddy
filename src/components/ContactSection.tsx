import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    // Netlify handles submission
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">

      {/* Hidden Netlify form */}
      <form name="contact" method="POST" data-netlify="true" hidden>
        <input name="name" />
        <input name="email" />
        <input name="subject" />
        <textarea name="message"></textarea>
      </form>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Let's Create Something Special
          </h2>

          <p className="text-muted-foreground mb-8">
            Whether you're planning a corporate event or private party,
            we'd love to hear from you.
          </p>

          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href="mailto:therealjohnnywatson@gmail.com"
                  className="font-medium hover:text-primary transition-colors"
                >
                  therealjohnnywatson@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a
                  href="tel:9736193091"
                  className="font-medium hover:text-primary transition-colors"
                >
                  973-619-3091
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Based In</p>
                <p className="font-medium">New Jersey Bloomingdale, USA</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="card-theatrical p-8 space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Booking Inquiry"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Tell us about your event..."
            rows={5}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg resize-none"
          />

          <button type="submit" className="btn-gold rounded-sm w-full">
            <Send size={18} className="inline mr-2" />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
