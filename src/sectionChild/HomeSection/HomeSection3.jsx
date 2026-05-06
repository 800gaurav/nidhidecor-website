import { motion } from "framer-motion";
import { FaCheckSquare, FaChartBar, FaRocket, FaCoins } from "react-icons/fa";

const HomeSection3 = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-[#e0f7fa] via-[#e8fce9] to-[#fdebd0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10% left-5% w-20 h-20 rounded-full bg-teal-400"></div>
        <div className="absolute top-30% right-10% w-16 h-16 rounded-full bg-lime-400"></div>
        <div className="absolute bottom-20% left-15% w-24 h-24 rounded-full bg-pink-400"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
          {/* Left Text Block */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-teal-600 via-lime-500 to-pink-500 bg-clip-text text-transparent">
                EXPLORE, DISCOVER
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">
                AND EARN BIG WITH
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
                ONE OF THE TOP WEB3
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 via-lime-500 to-pink-500 bg-clip-text text-transparent">
                Autonix MARKETPLACES IN
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">
                THE WORLD
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-lime-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </button>
              <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right Info Cards */}
          <motion.div 
            className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Card 1 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white hover:border-teal-100"
            >
              <div className="flex items-center mb-4 gap-3">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <FaCheckSquare className="text-2xl text-teal-500" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">Multi-Reward</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Autonix STOKE Fun leverages a proprietary AI-powered algorithmic
                trading model, and provides a dual earnings mechanism with trading
                rewards as well as referral rewards.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white hover:border-lime-100"
            >
              <div className="flex items-center mb-4 gap-3">
                <div className="p-3 bg-lime-50 rounded-xl">
                  <FaChartBar className="text-2xl text-lime-500" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-lime-600 to-lime-400 bg-clip-text text-transparent">Earn Future Value</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Autonix STOKE Fun reduces the entry hurdles of the Autonix market and
                expands the boundaries through its AI algorithmic trading process
                and rewarding financial model.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white hover:border-pink-100"
            >
              <div className="flex items-center mb-4 gap-3">
                <div className="p-3 bg-pink-50 rounded-xl">
                  <FaRocket className="text-2xl text-pink-500" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Fast Transactions</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Experience lightning-fast transactions with our optimized blockchain
                technology, ensuring quick and secure Autonix trading with minimal gas fees.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white hover:border-blue-100"
            >
              <div className="flex items-center mb-4 gap-3">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FaCoins className="text-2xl text-blue-500" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Multiple Earnings</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Diversify your income streams with our multi-tiered reward system
                that includes staking bonuses, liquidity mining, and exclusive Autonix drops.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection3;