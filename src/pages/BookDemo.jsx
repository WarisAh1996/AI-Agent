import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { createLead } from '../services/leadService';
import SuccessModal from '../components/SuccessModal';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Customer Service Director",
    company: "TechCorp Inc.",
    content: "Implementing the AI Call Agent has transformed our customer service operations. We've seen a 40% reduction in response times and significantly improved customer satisfaction scores.",
    image: "/testimonials/sarah.jpg"
  },
  {
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Global Solutions",
    content: "The AI Call Agent's ability to handle multiple languages and complex queries has been a game-changer for our international business. Our team can now focus on high-value interactions.",
    image: "/testimonials/michael.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "CEO",
    company: "StartUp Innovations",
    content: "As a growing startup, we needed a solution that could scale with us. This AI Call Agent not only met our expectations but exceeded them in terms of flexibility and performance.",
    image: "/testimonials/emma.jpg"
  }
];

export default function BookDemo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });
    console.log('Submitting form with data:', formData);

    try {
      const { error } = await createLead(formData);
      
      if (error) {
        console.error('Error from createLead:', error);
        throw new Error(error);
      }

      setSubmitStatus({
        loading: false,
        error: null,
        success: true
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });

      // Show success modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        loading: false,
        error: `Failed to submit form: ${error.message}`,
        success: false
      });
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-black to-secondary-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-primary"
            >
              Experience the Future of Customer Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Book a personalized demo and see how our AI Call Agent can transform your business
            </motion.p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-secondary border-2 border-primary/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Schedule Your Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-primary/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-primary/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-primary/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Company</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-primary/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Message (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-primary/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-32"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={submitStatus.loading}
                className={`w-full ${submitStatus.loading ? 'bg-primary/50' : 'bg-primary hover:bg-primary-dark'} 
                  text-black font-semibold py-3 rounded-lg transition-colors flex justify-center items-center`}
              >
                {submitStatus.loading ? (
                  <span className="inline-block animate-spin mr-2">↻</span>
                ) : null}
                {submitStatus.loading ? 'Submitting...' : 'Book Demo'}
              </button>
              {submitStatus.error && (
                <p className="text-red-500 text-center mt-2">{submitStatus.error}</p>
              )}
              {submitStatus.success && (
                <p className="text-primary text-center mt-2">Successfully submitted! We'll contact you soon.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary border-2 border-primary/20 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{testimonial.name}</h3>
                    <p className="text-white text-sm">{testimonial.role}</p>
                    <p className="text-primary/70 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-white">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleCloseSuccessModal} 
      />
    </div>
  );
}
