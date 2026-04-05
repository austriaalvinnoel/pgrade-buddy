import { motion } from "framer-motion";
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/user/WatsonnWatson", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/johnnywatsoncomedy/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/comedianwatson", label: "Twitter" },
  { icon: Facebook, href: "https://www.facebook.com/goodcomic", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <a href="#home" className="text-3xl font-display font-bold text-primary">
              Johnny Watson
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Bringing Laughter to Life
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} Johnny Watson. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
