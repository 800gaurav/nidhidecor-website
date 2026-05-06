import { motion } from "framer-motion";

export const Card = ({ title, avatar, points }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#10141b] dark:bg-[#0d1117] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4 border border-gray-800 hover:border-gray-600 transition-all duration-300"
    >
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.img 
          src={avatar} 
          alt={title} 
          className="w-12 h-12"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-teal-400 via-lime-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h3>
      </motion.div>
      <ul className="list-disc pl-5 text-gray-400 space-y-2">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: i * 0.15,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ color: "#ffffff", x: 5 }}
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};