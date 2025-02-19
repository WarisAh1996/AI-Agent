import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    // Redirect to home page after closing
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your demo request. Our team will contact you soon to schedule your personalized demo.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
