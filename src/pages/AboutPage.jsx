import React from "react";
import { motion } from "framer-motion";
import { Home, Users, ShieldCheck, Bolt } from "lucide-react";

const features = [
  {
    icon: <Home className="w-8 h-8 text-blue-500" />,
    title: "Smart Apartment Management",
    description:
      "Manage your apartments easily with our intuitive dashboard and real-time updates.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,  // Changed here
    title: "Community Building",
    description:
      "Connect with your neighbors, organize events, and build a stronger community.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Secure & Reliable",
    description:
      "We prioritize your privacy and security with end-to-end encryption and trusted servers.",
  },
  {
    icon: <Bolt className="w-8 h-8 text-yellow-500" />,
    title: "Fast & Efficient",
    description:
      "Enjoy lightning-fast performance and instant notifications on all your devices.",
  },
];

// The rest of the AboutPage component remains the same as before

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <motion.section
        className="max-w-5xl mx-auto px-6 py-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-blue-600">FlatFlow</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
          Your all-in-one platform to manage apartments, connect with neighbors, and simplify urban living.
          Discover a smarter, safer, and more connected way to live.
        </p>
      </motion.section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose FlatFlow?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map(({ icon, title, description }, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="mb-4 flex justify-center">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Team Section */}
      <motion.section
        className="bg-blue-600 text-white py-20 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-8 max-w-xl mx-auto leading-relaxed">
            Have questions? Want to learn more about FlatFlow? Reach out to us anytime.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-blue-600 font-semibold rounded-full px-8 py-3 hover:bg-gray-200 transition"
          >
            Contact Support
          </a>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutPage;
