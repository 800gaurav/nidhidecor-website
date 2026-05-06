import { motion } from "framer-motion";

const Footer = () => {
  // cgvhjkl;'

  return (
    <footer className="bg-[#390ca3c4] backdrop-blur-md border-b border-[#00BFFF]/30 text-white px-6 py-12 shadow-inner ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <motion.div
          className="space-y-4 text-center"
          whileHover={{ scale: 1.02, rotateZ: -1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src="/Images/Home2.jpg"
              alt="Logo"
              className="h-40 w-40 rounded-full object-cover border-4 border-white bg-amber-50 shadow-lg"
            />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-white bg-clip-text text-transparent">
                Autonix
              </span>
            </h2>
          </div>


        </motion.div>


        {/* Resources */}
        <motion.div
          className="space-y-2"
          whileHover={{ rotateY: 5 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <h2 className="font-semibold text-lg text-white">Resources</h2>
          {[
            "Docs",
            "Invite friends",
            "How to buy",
            "Tutorials",
            "Artist Application Form",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-white dark:text-gray-400 dark:hover:text-white transition duration-200"
            >
              {item}
            </a>
          ))}
        </motion.div>

        {/* News */}
        <motion.div
          whileHover={{ rotateX: 5 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <h2 className="font-semibold text-lg mb-2">News</h2>
          <a
            href="#"
            className="text-white dark:text-gray-400 dark:hover:text-white transition duration-200"
          >
            Blog
          </a>
        </motion.div>

        {/* Company - Newsletter */}
        <motion.div
          className="space-y-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <h2 className="font-semibold text-lg">Company</h2>
          <p className="text-sm  dark:text-gray-400">
            Join our mailing list to stay in the loop with our newest feature
            releases, Autonix listing, tips and tricks.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-2 pr-24 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 rounded-xl bg-gradient-to-r from-[#00d4aa] to-[#00f5d4] hover:from-[#00c29a] hover:to-[#00e5c4] text-black font-semibold transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs dark:text-gray-400">
        © {new Date().getFullYear()} Autonix 
      </div>
    </footer>
  );
};

export default Footer;
