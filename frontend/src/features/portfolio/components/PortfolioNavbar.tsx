import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useTheme } from "@/providers/ThemeProvider";

export default function PortfolioNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-4 z-50 mb-8"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-8 py-4 shadow-xl backdrop-blur-xl transition-all dark:border-slate-700 dark:bg-slate-900/70">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          MyBuildBoard
        </h1>

        <div className="hidden items-center gap-8 font-medium md:flex">
          <a
            href="#about"
            className="text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            About
          </a>

          <a
            href="#experience"
            className="text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Experience
          </a>

          <a
            href="#projects"
            className="text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full bg-slate-100 p-2 transition hover:scale-110 dark:bg-slate-800"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" size={18} />
            ) : (
              <FaMoon className="text-slate-700" size={18} />
            )}
          </button>

          <button className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaGithub
              size={20}
              className="text-slate-700 dark:text-slate-300"
            />
          </button>

          <button className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaLinkedin
              size={20}
              className="text-blue-600"
            />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
