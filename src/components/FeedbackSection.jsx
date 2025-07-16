import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const feedbacks = [
  {
    name: "Sarah Ahmed",
    comment: "FlatFlow made my apartment search stress-free and smooth. Loved the UI!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Riyad Hasan",
    comment: "Very intuitive platform. The agreement system is simple and effective.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Tanisha K.",
    comment: "Customer support was helpful and the apartment info was detailed.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const FeedbackSection = () => {
  return (
    <section className="bg-favtwo/10 py-20 px-6 md:px-20">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-favone mb-4">User Feedback</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Here's what our happy users have to say about FlatFlow.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbacks.map((feedback, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-xl p-6 rounded-xl hover:shadow-2xl transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{feedback.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeedbackSection;
