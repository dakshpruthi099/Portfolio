import { motion } from 'framer-motion'
import Image from 'next/image'
import { smoothScroll } from '@/utils/smoothScroll'
import { FaFileAlt, FaDownload, FaMapMarkerAlt } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I&apos;m <span className="text-primary">Daksh Pruthi</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2">
            Full Stack Developer
          </h2>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
            <FaMapMarkerAlt className="h-4 w-4" />
            <span className="text-sm">Jersey City, NJ</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            I build exceptional and accessible digital experiences for the web.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, '#contact')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Me
            </a>
            <a
              href="/DakshPruthiResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <FaFileAlt /> View Resume
            </a>
            <a
              href="/DakshPruthiResume.pdf"
              download="Daksh-Pruthi-Resume.pdf"
              className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <FaDownload /> Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-0"
        >
          <div className="relative w-[200px] md:w-[300px] h-[200px] md:h-[300px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/60 rounded-full blur-[32px] md:blur-[64px] animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/50 rounded-full blur-[24px] md:blur-[48px] animate-pulse" />
            <div className="relative w-full h-full p-4">
              <div className="w-full h-full rounded-full border-4 border-primary/30 overflow-hidden shadow-2xl">
                <Image
                  src="/headshot.png"
                  alt="Daksh Pruthi"
                  fill
                  className="rounded-full object-cover transition-transform hover:scale-105 duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}