import React from "react";
import { motion } from "framer-motion";
import { Home, Leaf, Wifi, Users } from "lucide-react";

const features = [
  {
    icon: <Home className="w-8 h-8 text-favone" />,
    title: "Modern Architecture",
    description: "Designed with elegance, open spaces, and a touch of luxury for urban living.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-favone" />,
    title: "Eco-Friendly Design",
    description: "Built using sustainable materials and energy-efficient systems.",
  },
  {
    icon: <Wifi className="w-8 h-8 text-favone" />,
    title: "Smart Connectivity",
    description: "Smart locks, remote lighting, and seamless internet throughout the building.",
  },
  {
    icon: <Users className="w-8 h-8 text-favone" />,
    title: "Community Spaces",
    description: "Enjoy rooftop gardens, lounges, and fitness areas built for interaction.",
  },
];

const AboutBuilding = () => {
  return (
    <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-14"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          About the <span className="text-favone">Building</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Discover a perfect blend of luxury, sustainability, and community in our state-of-the-art apartment building.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-2xl p-6 text-left border-l-4 border-favone hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutBuilding;
