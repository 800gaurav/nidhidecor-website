import React from "react";
import { motion } from "framer-motion";
import GradientButton from "../reuseis/GradientButton";

const WhatIsNFTSection = () => {
  const features = [
    {
      icon: (
        <div className="flex items-center justify-center relative">
          <span className="text-2xl">🎵</span>
          <span className="text-lg absolute -top-1 -right-1">✨</span>
        </div>
      ),
      title: "GAME & KEY SALER",
      description: "Free yourself from complexities videos vital aspect.",
    },
    {
      icon: (
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-600 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      ),
      title: "AD GENERATION",
      description: "Free yourself from complexities videos vital aspect.",
    },
    {
      icon: (
        <div className="flex items-center justify-center relative">
          <div className="w-6 h-8 bg-red-400 rounded-sm"></div>
          <div className="absolute -top-1 -right-1 w-4 h-6 bg-blue-400 rounded-sm"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-6 bg-green-400 rounded-sm"></div>
        </div>
      ),
      title: "GAME PROMOTION",
      description: "Free yourself from complexities videos vital aspect.",
    },
    {
      icon: (
        <div className="flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M4 15l4-4-4-4v8zm12 0l4-4-4-4v8z" />
            <path d="M2 21l20-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </div>
      ),
      title: "MORE EARNING",
      description: "Free yourself from complexities videos vital aspect.",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-[#0d1117] to-[#161b22] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 w-full max-w-md mx-auto overflow-hidden"
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-yellow-400 via-lime-400 to-yellow-400 p-[2px] rounded-xl">
                <div className="bg-gradient-to-br from-[#0d1117] to-[#21262d] p-4 rounded-xl">
                  <img
                    src="https://dyatwp.wowtheme7.com/wp-content/uploads/2024/09/1-3.png"
                    alt="NFT Character"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-white space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
              WHAT IS AN NFT?
            </h2>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-yellow-400">
              NFT (NON-FUNGIBLE TOKEN)
            </h3>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300">
              is a unique digital asset that represents ownership or proof of authenticity
              of a specific item, recorded on a blockchain. Unlike cryptocurrencies such as
              Bitcoin or Ethereum, which are fungible and interchangeable, NFTs are
              non-fungible, meaning each token is unique and cannot be exchanged on a
              one-to-one basis with another.
            </p>

            <div className="w-4 h-4 bg-yellow-400 rounded-full hidden sm:block my-2"></div>

            <div className="flex items-center gap-3 py-2">
              <div className="flex items-center text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-yellow-400 mr-2"
                >
                  <path d="M3 18h6l1-1V9l-1-1H3l-1 1v8l1 1zm8-8h10l1 1v6l-1 1H11l-1-1v-6l1-1z" />
                  <path d="M7 14l4-2-4-2v4z" />
                </svg>
                <span className="text-lg sm:text-xl font-semibold">
                  I EARN GREAT REWARDS{" "}
                  <span className="text-yellow-400">(FRIEND)</span>
                </span>
              </div>
            </div>

            <div className="pt-4">
              <GradientButton size="large" icon="" className="w-full sm:w-auto">
                EXPLORE MORE
              </GradientButton>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1c2128] to-[#2d333b] rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-yellow-400"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#00d4aa] to-[#00f5d4] rounded-2xl flex items-center justify-center text-black shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsNFTSection;
