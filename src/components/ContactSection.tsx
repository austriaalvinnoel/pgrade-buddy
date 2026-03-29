return (
  <section>

    {/* 👇 hidden form (add this) */}
    <form name="contact" method="POST" data-netlify="true" hidden>
      <input name="name" />
      <input name="email" />
      <input name="subject" />
      <textarea name="message"></textarea>
    </form>

    {/* 👇 your real form (already exists) */}
    <motion.form ...>
      ...
    </motion.form>

  </section>
);

<motion.form
  name="contact"
  method="POST"
  data-netlify="true"
  initial={{ opacity: 0, x: 50 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.3 }}
  onSubmit={handleSubmit}
  className="card-theatrical p-8 space-y-6"
>
  {/* Netlify hidden input */}
  <input type="hidden" name="form-name" value="contact" />

  <div className="grid sm:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        Your Name
      </label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        required
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
        placeholder="john@example.com"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-foreground mb-2">
      Subject
    </label>
    <input
      type="text"
      name="subject"
      required
      value={formData.subject}
      onChange={(e) =>
        setFormData({ ...formData, subject: e.target.value })
      }
      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
      placeholder="Booking Inquiry"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-foreground mb-2">
      Message
    </label>
    <textarea
      name="message"
      required
      rows={5}
      value={formData.message}
      onChange={(e) =>
        setFormData({ ...formData, message: e.target.value })
      }
      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg resize-none"
      placeholder="Tell us about your event..."
    />
  </div>

  <button type="submit" className="btn-gold rounded-sm w-full">
    <Send size={18} className="inline mr-2" />
    Send Message
  </button>
</motion.form>
