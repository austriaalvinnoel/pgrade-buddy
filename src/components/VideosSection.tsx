import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Stand-Up Special Highlights",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=340&fit=crop",
    duration: "12:34",
    views: "1.2M views",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Family Life Comedy Routine",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=340&fit=crop",
    duration: "8:45",
    views: "890K views",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Best of 2025 Tour",
    thumbnail: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=600&h=340&fit=crop",
    duration: "15:20",
    views: "2.1M views",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const VideosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  return (
    <section id="videos" className="py-24 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Watch <span className="text-gradient-gold">Johnny</span> Live
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Can't make it to a show? Get a taste of the comedy from the comfort
            of your home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-300" />
                
                {/* Play Button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: hoveredVideo === video.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-shadow duration-300">
                    <Play size={24} className="text-primary-foreground ml-1" />
                  </div>
                </motion.div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/90 rounded text-xs font-medium">
                  {video.duration}
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{video.views}</p>
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
            href="https://www.youtube.com/user/WatsonnWatson"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold rounded-sm inline-flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Visit YouTube Channel
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideosSection;
