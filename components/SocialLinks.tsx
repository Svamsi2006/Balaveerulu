'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FaGlobe, FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const SocialLink = ({ href, icon, label, color }: SocialLinkProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -10,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
    >
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full"
        onClick={(e) => {
          // For all social links, ensure they open properly in a new tab
          e.preventDefault();
          window.open(href, '_blank');
          console.log(`Opening ${label} link in new tab: ${href}`);
        }}
      >
        <Card className="h-full overflow-hidden shadow-md transition-all hover:shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
              className="mb-3 flex h-16 w-16 items-center justify-center rounded-full" 
              style={{ backgroundColor: `${color}20`, color: color }}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                {icon}
              </motion.div>
            </motion.div>
            <p className="font-medium text-gray-700">{label}</p>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default function SocialLinks() {
  const socialLinks = [
    {
      href: "https://vamsiseelam.my.canva.site/v",
      icon: <FaGlobe size={28} />,
      label: "Portfolio",
      color: "#4F46E5"
    },
    {
      href: "https://www.instagram.com/__vamsi__2006/",
      icon: <FaInstagram size={28} />,
      label: "@__vamsi__2006",
      color: "#E1306C"
    },
    {
      href: "https://wa.me/919346147336",
      icon: <FaWhatsapp size={28} />,
      label: "+91 9346147336",
      color: "#25D366"
    },
    {
      href: "mailto:seelamvamsisivaganesh@gmail.com",
      icon: <FaEnvelope size={28} />,
      label: "Email",
      color: "#F59E0B"
    },
    {
      href: "https://www.linkedin.com/in/vamsi-/",
      icon: <FaLinkedin size={28} />,
      label: "LinkedIn",
      color: "#0077B5"
    },
    {
      href: "https://github.com/Svamsi2006",
      icon: <FaGithub size={28} />,
      label: "GitHub",
      color: "#333333"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((link, index) => (
        <SocialLink key={index} {...link} />
      ))}
    </motion.div>
  );
}
