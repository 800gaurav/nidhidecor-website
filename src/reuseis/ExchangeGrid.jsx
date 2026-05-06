import { motion } from "framer-motion";

export const ExchangeGrid = ({ exchanges }) => {
  return (
   <section className="w-full bg-[#0D0D0D] flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 w-full">
        {exchanges.map((exchange, index) => (
          <motion.div
            key={index}
            className="relative group p-[2px] rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#00f5d4] hover:from-[#00c29a] hover:to-[#00e5c4] transition-all"
            whileHover={{
              rotateY: 10,
              rotateX: 5,
              scale: 1.06,
              transition: { type: "spring", stiffness: 250 },
            }}
          >
            
            <div className="bg-[#0f1c1d] rounded-xl h-full w-full p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-[0_10px_30px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(250,126,30,0.3)] transition duration-300 ease-in-out">
              <motion.img
                src={exchange.logo}
                alt={exchange.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                whileHover={{
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              />
              <span className="text-white font-semibold text-sm sm:text-base lg:text-lg tracking-wide truncate">
                {exchange.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExchangeGrid;
