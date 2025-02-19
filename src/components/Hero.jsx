import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-black to-secondary-dark overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            Transform Your Customer Service with Our AI Call Agent
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white opacity-90">
            Boost efficiency, reduce costs, and resolve customer queries faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-dark text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Get Started Now
            </button>
            <button className="border-2 border-primary hover:bg-primary/10 text-primary px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Schedule a Demo
            </button>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
    </section>
  );
}
