'use client';

import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#EEF2FF] px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-4xl">
        <motion.header 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-[#1F2937] md:text-5xl"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Contact <motion.span 
              className="text-[#4F46E5]"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Balaveerulu
            </motion.span>
          </motion.h1>
          <motion.p 
            className="mt-3 text-[#6B7280]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We'd love to hear from you! Send us a message using the form below.
          </motion.p>
        </motion.header>
        
        <ContactForm />
        
        <motion.section 
          className="my-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h2 
            className="mb-8 text-center text-2xl font-semibold text-[#1F2937] md:text-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, type: 'spring' }}
          >
            Connect with Me
          </motion.h2>
          <SocialLinks />
        </motion.section>
        
        <Footer />
      </div>
      <Toaster />
    </main>
  );
}
