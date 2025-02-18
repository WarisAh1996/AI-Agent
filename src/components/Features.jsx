import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'High Accuracy Resolution',
    description: 'Advanced AI algorithms ensure precise issue resolution',
    icon: '🎯'
  },
  {
    title: 'Cost Savings',
    description: 'Reduce operational costs by up to 30%',
    icon: '💰'
  },
  {
    title: 'Seamless Integration',
    description: 'Easy integration with your existing systems',
    icon: '🔄'
  },
  {
    title: '24/7 Availability',
    description: 'Round-the-clock customer support',
    icon: '⏰'
  },
  {
    title: 'Continuous Learning',
    description: 'AI that improves with every interaction',
    icon: '🧠'
  }
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
