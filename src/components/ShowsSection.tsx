import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

const upcomingShows = [
  {
    id: 1,
    venue: "The Comedy Store",
    city: "Los Angeles, CA",
    date: "Feb 15, 2026",
    time: "8:00 PM",
    status: "available",
  },
  {
    id: 2,
    venue: "Gotham Comedy Club",
    city: "New York, NY",
    date: "Feb 22, 2026",
    time: "9:00 PM",
    status: "limited",
  },
  {
    id: 3,
    venue: "Zanies Comedy Club",
    city: "Chicago, IL",
    date: "Mar 8, 2026",
    time: "7:30 PM",
    status: "available",
  },
  {
    id: 4,
    venue: "Helium Comedy Club",
    city: "Philadelphia, PA",
    date: "Mar 15, 2026",
    time: "8:00 PM",
    status: "soldout",
  },
];

const ShowsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-green-500/20 text-green-400 rounded-full">
            Available
          </span>
        );
      case "limited":
        return (
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary/20 text-primary rounded-full">
            Limited Seats
          </span>
        );
      case "soldout":
        return (
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-red-500/20 text-red-400 rounded-full">
            Sold Out
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="shows" className="py-24 md:py-32 relative">
      <div className="section-divider mb-24" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-gradient-gold">Shows</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Catch Johnny live at a venue near you. From intimate club shows to
            theater performances, every night is an unforgettable experience.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {upcomingShows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card-theatrical p-6 flex flex-col md:flex-row md:items-center gap-6 group"
            >
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {show.venue}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    {show.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {show.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" />
                    {show.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {getStatusBadge(show.status)}
                {show.status !== "soldout" ? (
                  <button className="btn-outline-gold text-sm py-2 px-4 rounded group-hover:bg-primary group-hover:text-primary-foreground">
                    Get Tickets
                    <ArrowRight size={14} className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="text-primary hover:text-gold-light transition-colors inline-flex items-center gap-2 font-medium"
          >
            View All Shows
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowsSection;
