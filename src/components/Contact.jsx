import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import MagneticButton from './MagneticButton';

const Contact = () => {
  const formRef = useRef();

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const loadingToast = toast.loading("Processing your request...");

    try {
      // Triggering both templates simultaneously
      const sendToMe = emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Notification to you
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const sendToUser = emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID, // Auto-reply to sender
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Wait for both to complete
      await Promise.all([sendToMe, sendToUser]);

      toast.success("Message sent successfully! 🚀", { id: loadingToast });
      formRef.current.reset();

    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message. Please try again.", { id: loadingToast });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
          Get In <span className="text-blue-500">Touch</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Let's build something great.</h3>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href="mailto:thsonu350@gmail.com" className="text-lg font-medium text-white hover:text-blue-400 transition-colors">
                  thsonu350@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <FaPhone className="text-xl" />
              </div>
              {/* <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href="tel:+0000000000" className="text-lg font-medium text-white hover:text-purple-400 transition-colors">
                  +91-000000000
                </a>
              </div> */}
            </div>
          </div>

          <div className="flex-[1.5]">
            <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    required
                    type="text"
                    name="from_name"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    required
                    type="email"
                    name="from_email"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  required
                  type="text"
                  name="subject"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <MagneticButton
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </MagneticButton>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;