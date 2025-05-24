'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

// Initialize EmailJS with the public key
const EMAILJS_PUBLIC_KEY = 'GYSfQoTOJLBO0WT9s';

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  
  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized with public key');
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(`Form field ${name} updated:`, value);
  };

  const handleRatingChange = (newRating: number) => {
    // Only update if the rating has actually changed
    if (rating !== newRating) {
      console.log('Rating updated in form:', newRating);
      setRating(newRating);
      setFormData(prev => ({
        ...prev,
        rating: newRating
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started with data:', formData);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields',
        variant: 'destructive',
      });
      console.log('Form validation failed - missing fields');
      return;
    }

    setIsSubmitting(true);
    console.log('Sending email via EmailJS...');

    try {
      const result = await emailjs.send(
        'service_iau32kz', 
        'template_02fwxmw',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          rating: formData.rating,
          to_email: 'seelamvamsisivaganesh@gmail.com' // Add recipient email
        },
        'GYSfQoTOJLBO0WT9s'
      );

      console.log('Email sent successfully:', result.text);
      
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us! We\'ll get back to you soon.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: 0
      });
      setRating(0);
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // More detailed error message
      let errorMessage = 'Failed to send your message. Please try again later.';
      if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = `Error: ${error.text}`;
      }
      
      toast({
        title: 'Something went wrong',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      <Card className="w-full overflow-hidden rounded-xl border-none bg-white shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#4F46E5] to-[#10B981] pb-8 pt-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <CardTitle className="text-center text-2xl font-bold text-white">Send Us a Message</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 pt-8">
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-lg border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="rounded-lg border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Message subject"
                className="rounded-lg border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="min-h-[120px] rounded-lg border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                rows={4}
                required
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center py-2"
            >
              <StarRating onRatingChange={handleRatingChange} />
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#10B981] text-white transition-all hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                    />
                    Sending...
                  </span>
                ) : 'Send Message'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
