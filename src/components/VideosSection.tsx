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
        const modules = import.meta.glob("../content/videos/*.md", { as: "raw" });
        const entries = Object.entries(modules);
        if (entries.length === 0) throw new Error("no md files");
        const loaded = await Promise.all(
          entries.map(async ([, mod], index) => {
            const raw = (await mod()) as string;
            const lines = raw.split("\n");
            const data: Record<string, string> = {};
            lines.forEach(line => {
              const match = line.match(/^(\w+):\s*(.+)$/);
              if (match) data[match[1]] = match[2].trim();
            });
            return {
              id: index + 1,
              title: data.title || "",
              youtubeId: data.youtubeId || "",
              duration: data.duration || "",
              views: data.views || "",
            };
          })
        );
        const filtered = loaded.filter(v => v.youtubeId);
        if (filtered.length === 0) throw new Error("no valid videos");
        setVideos(filtered);
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

  const youtubeUrl = "https://www.youtube.com/user/WatsonnWatson";

  return (
    <section id="videos" className="py-24 md:py-32
