import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO at TechCorp',
    content: 'The AI Call Agent has revolutionized our customer service. We\'ve seen a 40% reduction in response times.',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    content: 'Implementation was seamless, and our customers love the 24/7 availability. It\'s been a game-changer.',
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Michael Chen',
    role: 'CTO at StartupX',
    content: 'The accuracy of issue resolution is impressive. Our team can now focus on more complex tasks.',
    image: 'https://i.pravatar.cc/150?img=3'
  }
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
