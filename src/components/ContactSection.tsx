import { motion } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    // let Netlify handle it
  };

  return (import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    // Netlify will handle submission
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">

      {/* ✅ Hidden Netlify form (DO NOT REMOVE) */}
      <form name="contact" method="POST" data-netlify="true" hidden>
        <input name="name" />
        <input name="email" />
        <input name="subject" />
        <textarea name="message"></textarea>
      </form>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE (TEXT) */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Let's Create Something Special
          </h2>

          <p className="text-muted-foreground mb-8">
            Whether you're planning a corporate event, private party, or
            looking to book Johnny for your venue, we'd love to hear from
            you. Fill out the form or reach out directly.
          </p>

          <div className="space-y-4">
            <p><strong>Email:</strong> bookings@johnnywatson.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Based In:</strong> Los Angeles, California</p>
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
          {/* REQUIRED FOR NETLIFY */}
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
    <section id="contact" className="py-24 md:py-32 relative">

      {/* ✅ Hidden Netlify form */}
      <form name="contact" method="POST" data-netlify="true" hidden>
        <input name="name" />
        <input name="email" />
        <input name="subject" />
        <textarea name="message"></textarea>
      </form>

      <div className="container mx-auto px-6">
        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="card-theatrical p-8 space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />

          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Message" required />

          <button type="submit">Send Message</button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
