import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Smart Living",
    subtitle: "Manage everything in one place",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    title: "Modern Homes",
    subtitle: "Experience the future of apartment life",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/essential-living/image/upload/c_fill,g_auto,w_800/f_auto/q_auto/v1/Developments/Dressage%20Court/Apartments/3%20Bed/dressage-court-3-bed-b27_11.jpg?_a=ATO2BAA0",
    title: "FlatFlow Lifestyle",
    subtitle: "Connect, control & simplify",
  },
];

const Banner = () => {
  const scrollRef = useRef(null);
  const intervalTime = 5000; // 5 seconds

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        currentIndex = (currentIndex + 1) % images.length;
        scrollRef.current.scrollTo({
          left: scrollRef.current.offsetWidth * currentIndex,
          behavior: "smooth",
        });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory scrollbar-hide"
    >
      {images.map((img, index) => (
        <motion.div
          key={img.id}
          className="inline-block w-screen h-[70vh] relative snap-start"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-[0.5]"
            style={{ backgroundImage: `url(${img.url})` }}
          ></div>

          {/* Overlay content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
            <motion.h1
              className="text-5xl font-bold mb-4 drop-shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {img.title}
            </motion.h1>
            <motion.p
              className="text-xl mb-6 drop-shadow-lg"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {img.subtitle}
            </motion.p>
            <motion.button
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              Explore FlatFlow
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Banner;
