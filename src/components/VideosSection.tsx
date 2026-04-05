import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, ExternalLink } from "lucide-react";

type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  duration: string;
  views: string;
};

const VideosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const modules = import.meta.glob("../content/videos/*.json");
        const loaded = await Promise.all(
          Object.entries(modules).map(async ([, mod], index) => {
            const data = (await mod()) as any;
            return { ...data.default, id: index + 1 };
          })
        );
        setVideos(loaded);
      } catch (e) {
        console.error("Failed to load videos:", e);
        setVideos([
          { id: 1, title: "Johnny Watson Comedian", youtubeId: "f56PDtheuGw", duration: "1:00", views: "389 views" },
          { id: 2, title: "Johnny Watson Comedian", youtubeId: "maokkr-WkLk", duration: "1:02", views: "2.1K views" },
          { id: 3, title: "Functionally Dysfunctional Special Trailer", youtubeId: "fxc5zXGoAkE", duration: "1:01", views: "376 views" },
        ]);
      }
    };
    loadVideos();
  }, []);

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
            Can't make it to a show? Get a taste of the comedy from the comfort of your home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                {playingVideo === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setPlayingVideo(video.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group
