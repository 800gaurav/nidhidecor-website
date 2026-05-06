import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../utils/CommonContainer";
import { Card } from "../reuseis/Card";
import { FaCheckSquare, FaChartBar, FaBitcoin } from "react-icons/fa";
import { exchanges, nftData, tabs, testimonials } from "../data/Data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import ExchangeGrid from "../reuseis/ExchangeGrid";
import { NavLink, useNavigate } from "react-router-dom";
import GradientButton from "../reuseis/GradientButton";
// import WhatIsGROWIFYSection from "./WhatIsGROWIFYSection";
import HomeSection3 from "./HomeSection/HomeSection3";
import { FaShieldAlt, FaChartLine, FaUsers } from "react-icons/fa";
import { User, TrendingUp, ArrowRight, Shield } from "lucide-react";
// import GROWIFYCard from "../components/GROWIFYCard";

function HomeRouter() {
  const navigate = useNavigate()
  return (
    <>
      <Layout fullWidth={true}>
        <HomeSection1  navigate={navigate}/>
        {/* <LevelIncomeSection /> */}
        {/* <CategoriesHome2Section /> */}
        < InvestmentCategoriesSection navigate={navigate} />
        {/* <HomeSection3 /> */}
        {/* <WhyChooseUsSection />
        <HowItWorksSection />
        <SecuritySection />
        <TestimonialSlider /> */}
        {/* <HomeSection4 /> */}
        {/* <ExchangeGrid exchanges={exchanges} /> */}
        {/* <TestimonialSlider /> */}
      </Layout>
    </>
  );
}



export const HomeSection1 = ({navigate}) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#3A0CA3] via-[#7B2CBF] to-[#3A0CA3] text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00BFFF]/30 to-[#FF4D6D]/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated grid background */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik02MCAwSDBWNjBNNjAgMEwwNjAiIHN0cm9rZT0iIzAwQkZGRiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-30" /> */}

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#00BFFF] text-sm sm:text-base font-medium tracking-widest uppercase mb-2"
            >
              Digital Growth Solutions
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-white">Autonix</span>{" "}
              <br />
              Your Digital
              <br />
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#00BFFF] bg-clip-text text-transparent">Growth Partner</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-md"
          >
            <p className="text-gray-200 text-base sm:text-lg mb-8">
              We help businesses scale their digital presence with cutting-edge solutions, data-driven strategies, and innovative technology.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <GradientButton
                to="/Signup"
                size="large"
                icon="🚀"
                className="w-full sm:w-auto bg-gradient-to-r from-[#FF4D6D] to-[#7B2CBF] hover:from-[#FF4D6D] hover:to-[#3A0CA3] text-white font-semibold shadow-lg shadow-[#FF4D6D]/30"
              >
                GET STARTED
              </GradientButton>
            </motion.div>


          </div>


        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Main image */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src="/Images/Home2.png"
                alt="Digital Growth"
                className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[480px] rounded-2xl shadow-2xl shadow-[#00BFFF]/20"
              />

              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-[#00BFFF]/20 blur-2xl rounded-full scale-90" />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-br from-[#FF4D6D] to-[#7B2CBF] p-3 rounded-lg shadow-lg z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-xs font-bold text-white">+42% Growth</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-[#3A0CA3] to-[#7B2CBF] p-3 rounded-full shadow-lg z-20 border border-[#00BFFF]/30"
              animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <FaBitcoin className="text-2xl text-[#00BFFF]" />
            </motion.div>

            {/* Animated circles */}
            <motion.div
              className="absolute top-1/2 -left-10 w-20 h-20 rounded-full border-2 border-[#00BFFF]/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
              className="absolute bottom-10 -right-8 w-16 h-16 rounded-full border-2 border-[#FF4D6D]/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            />

            {/* Additional floating element */}
            <motion.div
              className="absolute top-10 -right-12 bg-gradient-to-br from-[#00BFFF] to-[#3A0CA3] p-2 rounded-md z-20 shadow-lg"
              animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            >
              <div className="text-xs font-bold text-white">AI Powered</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// second section

export const InvestmentCategoriesSection = ({navigate}) => {
  const categories = [
    {
      title: "1. STARTER MEMBERSHIP",
      avatar: "/Images/coin-basic.png",
      points: [
        "Begin your MLM journey with basic access",
        "Build your initial network team",
        "Access to fundamental training resources",
        "Earn from direct referrals and first level",
        "Perfect for newcomers to network marketing"
      ],
      color: "from-[#00BFFF] to-[#7B2CBF]",
      bgColor: "bg-gradient-to-br from-[#00BFFF]/10 to-[#3A0CA3]/10"
    },
    {
      title: "2. EXECUTIVE MEMBERSHIP",
      avatar: "/Images/coin-growth.png",
      points: [
        "Expand your network with advanced tools",
        "Access to leadership training programs",
        "Earn from multiple levels of your team",
        "Monthly performance bonuses",
        "Priority customer support",
        "Team building webinars"
      ],
      color: "from-[#00BFFF] to-[#7B2CBF]",
      bgColor: "bg-gradient-to-br from-[#00BFFF]/10 to-[#3A0CA3]/10"
    },
    {
      title: "3. DIAMOND MEMBERSHIP",
      avatar: "/Images/coin-premium.png",
      points: [
        "Premium network building resources",
        "Highest commission percentage rates",
        "Exclusive leadership retreats",
        "Personal business coach",
        "International expansion opportunities",
        "Luxury reward programs",
        "Residual income for life"
      ],
      roi: "Elite Tier",
      color: "from-[#00BFFF] to-[#7B2CBF]",
      bgColor: "bg-gradient-to-br from-[#00BFFF]/10 to-[#3A0CA3]/10"
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#3A0CA3]/5 to-[#7B2CBF]/5 py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      <div className="w-full max-w-8xl mx-auto">
        {/* Heading Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center mb-6 sm:mb-8 lg:mb-12 gap-3 sm:gap-4 text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#7B2CBF] bg-clip-text text-transparent leading-tight">
            MEMBERSHIP LEVELS
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
            Join our network marketing family and unlock your earning potential through our tiered membership system
          </p>
        </motion.div>

        {/* Cards with animation */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${cat.bgColor} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70 group-hover:opacity-100`}></div>

              <div className="relative bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 h-full overflow-hidden shadow-lg">
                {/* ROI Badge */}
                

                {/* Package Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-white to-white/80 flex items-center justify-center shadow-lg border border-white/30">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cat.color} flex items-center justify-center shadow-inner`}>
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
                  {cat.title}
                </h3>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {cat.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${cat.color} flex items-center justify-center shadow-sm`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                            <path d="M2.75 4.75L1.5 3.5L0.75 4.25L2.75 6.25L7.25 1.75L6.5 1L2.75 4.75Z" />
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${cat.color} hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md`} onClick={()=>{ navigate('/signup')}}>
                  Join Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Build your network, develop leadership skills, and create residual income that grows with your team. Our proven system helps you achieve financial freedom through community and mentorship.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#00BFFF] to-[#7B2CBF] hover:from-[#00BFFF] hover:to-[#FF4D6D] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Benefits
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export const LevelIncomeSection = () => {
  const levels = [
    {
      level: "Level 1",
      investment: "$50 – $499",
      team: "—",
      income: "1.25%",
      description: "Entry-level earnings as soon as you invest."
    },
    {
      level: "Level 2",
      investment: "$500 – $1,900",
      team: "3 direct referrals, 7 in levels 2 & 3 combined",
      income: "1.50%",
      description: "Unlock additional income with a small team."
    },
    {
      level: "Level 3",
      investment: "$2,000 – $4,999",
      team: "10 directs, 40 in levels 2 & 3",
      income: "1.80%",
      description: "Growth with focused team expansion."
    },
    {
      level: "Level 4",
      investment: "$5,000 – $9,999",
      team: "25 directs, 90 in levels 2 & 3",
      income: "2.10%",
      description: "Enjoy higher earnings with leadership scale."
    },
    {
      level: "Level 5",
      investment: "$10,000 - 19,999 ",
      team: "40 directs, 150 in levels 2 & 3",
      income: "2.75%",
      description: "Top-tier level: premium income and legacy rewards."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-[#e0f7fa] via-[#e8fce9] to-[#fdebd0] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10% left-5% w-20 h-20 rounded-full bg-teal-400"></div>
        <div className="absolute top-30% right-10% w-16 h-16 rounded-full bg-lime-400"></div>
        <div className="absolute bottom-20% left-15% w-24 h-24 rounded-full bg-pink-400"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-600 via-lime-500 to-pink-500 bg-clip-text text-transparent">
              Level Income Plans
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Earn more as you grow through our structured multi-level income system
          </p>
        </motion.div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {levels.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white hover:border-teal-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                  {item.level}
                </h3>
                <div className="text-2xl font-bold text-lime-500">{item.income}</div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Investment</p>
                <p className="text-gray-800 font-semibold">{item.investment}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Team Criteria</p>
                <p className="text-gray-800 text-sm">{item.team}</p>
              </div>

              <p className="text-gray-700 text-sm">{item.description}</p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-gradient-to-r from-teal-400 to-lime-400 hover:from-teal-500 hover:to-lime-500 text-white font-semibold rounded-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
export const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: <FaShieldAlt className="text-2xl text-teal-500" />,
      title: "Transparent Level Unlocks",
      description: "All requirements and benefits are clearly defined with no hidden conditions."
    },
    {
      icon: <FaChartBar className="text-2xl text-lime-500" />,
      title: "Automated Commission Flow",
      description: "Instant income credit as referrals earn with real-time tracking."
    },
    {
      icon: <FaCheckSquare className="text-2xl text-pink-500" />,
      title: "Secure & Auditable Setup",
      description: "Built with modern safeguards and complete audit trails for all transactions."
    },
    {
      icon: <FaChartLine className="text-2xl text-teal-500" />,
      title: "Easy Dashboard Analytics",
      description: "Track your growth, referrals and income at a glance with intuitive visuals."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-lime-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Our Platform?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We've designed our platform with your success and security in mind
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-teal-500/30"
            >
              <div className="flex items-center mb-4 gap-3">
                <div className="p-3 bg-gray-700 rounded-xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Register & Invest",
      description: "Securely enroll and make the minimum investment to start (e.g., $50).",
      icon: <User className="w-8 h-8 text-white" />
    },
    {
      step: "02",
      title: "Refer & Grow",
      description: "Build your first level of direct referrals—unlock income based on their activity.",
      icon: <FaUsers className="w-8 h-8 text-white" />
    },
    {
      step: "03",
      title: "Income Credited",
      description: "Earn daily commissions directly to your wallet with transparent tracking.",
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      step: "04",
      title: "Withdraw Easily",
      description: "Request withdrawal with 2-step verification, admin approval, and seamless payout.",
      icon: <ArrowRight className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-[#e0f7fa] via-[#e8fce9] to-[#fdebd0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-600 via-lime-500 to-pink-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From sign-up to withdrawal, our process is designed for simplicity and success
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-20 bottom-20 w-1 bg-gradient-to-b from-teal-400 via-lime-400 to-pink-400 transform -translate-x-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 lg:pl-12 lg:pr-12"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-lime-500 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-left">
                  <span className="text-sm font-semibold text-teal-600">{item.step}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{item.title}</h3>
                  <p className="text-gray-600 mt-3">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



// Security Section
export const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-teal-500" />,
      title: "Secure Wallet Management",
      description: "Your balance is locked and editable only after validations and security checks."
    },
    {
      icon: <FaCheckSquare className="w-8 h-8 text-lime-500" />,
      title: "OTP-Based Withdrawal",
      description: "Protects your account; approval required before sending any transactions."
    },
    {
      icon: <FaChartBar className="w-8 h-8 text-pink-500" />,
      title: "Audit Trail & Admin Oversight",
      description: "Every transaction is logged, and admins can approve or reject safely."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-lime-400 to-pink-400 bg-clip-text text-transparent">
              Security & Payout Workflow
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Your security is our priority with multiple layers of protection
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GradientButton
            to="/signup"
            size="large"
            className="bg-gradient-to-r from-teal-400 via-lime-400 to-pink-400 hover:from-teal-500 hover:via-lime-500 hover:to-pink-500 text-white font-semibold px-8 py-4"
          >
            Join & Start Earning Today
          </GradientButton>


        </motion.div>
      </div>
    </section>
  );
};

// Testimonial Slider
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction > 0 ? -90 : 90,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    rotateY: direction < 0 ? 90 : -90,
    scale: 0.8,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

export const TestimonialSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([
      (page + newDirection + testimonials.length) % testimonials.length,
      newDirection,
    ]);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 w-full bg-[#0D0D0D] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 text-white">

      {/* <h2 className="text-lime-400 text-lg sm:text-xl font-semibold mb-6 lg:mb-8 text-center">
        Our Testimonials
      </h2> */}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-teal-400 via-lime-400 to-pink-400 bg-clip-text text-transparent">
          Our Testimonials
        </span>
      </h2>
      <div className="relative w-full max-w-6xl">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-[#111] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl flex flex-col gap-4"
          >
            <Quote className="text-lime-400 w-6 h-6 sm:w-8 sm:h-8" />
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed font-light text-white">
              {testimonials[page].text}
            </p>
            {/* <div className="flex items-center mt-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-lime-400 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{testimonials[page].name}</p>
                <p className="text-gray-400 text-sm">{testimonials[page].role}</p>
              </div>
            </div> */}
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
          <button
            onClick={() => paginate(-1)}
            className="bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
          <button
            onClick={() => paginate(1)}
            className="bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeRouter;
