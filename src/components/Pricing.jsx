import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const plans = [
  {
    name: 'Basic',
    price: 49,
    features: [
      '1 AI agent',
      'Up to 1000 calls',
      'Basic analytics',
      'Email support',
      'Standard integration'
    ]
  },
  {
    name: 'Pro',
    price: 199,
    features: [
      '5 AI agents',
      'Up to 5000 calls',
      'Advanced analytics',
      'Priority support',
      'Advanced integration'
    ]
  },
  {
    name: 'Enterprise',
    price: 499,
    features: [
      'Unlimited agents',
      'Unlimited calls',
      'Custom analytics',
      '24/7 support',
      'Custom integration'
    ]
  }
];

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary border-2 border-primary/20 rounded-xl shadow-lg p-8 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6 text-white">${plan.price}<span className="text-lg text-primary/70">/mo</span></div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-white">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-3 rounded-lg transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
