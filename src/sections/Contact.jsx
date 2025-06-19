import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchSiteSettings } from '../lib/sanity';
import RainbowDivider from '../components/ui/RainbowDivider';
import styles from '../assets/styles/Contact.module.scss';

export default function Contact() {
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch contact info from Sanity
  useEffect(() => {
    const getSiteSettings = async () => {
      try {
        const data = await fetchSiteSettings();
        setSiteSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    getSiteSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.rainbowSpinner}></div>
        <p>Loading contact information...</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className={styles.header}>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.title}
        >
          Let's <span>Connect</span>
        </motion.h1>
        <RainbowDivider />
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.info}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2>Get in Touch</h2>
          <p>Have a project in mind or just want to say hello? I'd love to hear from you!</p>
          
          {siteSettings && (
            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon} style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
                  <span role="img" aria-label="Email">✉️</span>
                </div>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${siteSettings.contactEmail}`}>
                    {siteSettings.contactEmail}
                  </a>
                </div>
              </div>
              
              {siteSettings.contactPhone && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ backgroundColor: 'rgba(51, 154, 240, 0.1)' }}>
                    <span role="img" aria-label="Phone">📱</span>
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <a href={`tel:${siteSettings.contactPhone.replace(/[^0-9+]/g, '')}`}>
                      {siteSettings.contactPhone}
                    </a>
                  </div>
                </div>
              )}
              
              {siteSettings.location && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ backgroundColor: 'rgba(204, 93, 232, 0.1)' }}>
                    <span role="img" aria-label="Location">📍</span>
                  </div>
                  <div>
                    <h3>Studio</h3>
                    <p>{siteSettings.location}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {siteSettings?.socialLinks?.length > 0 && (
            <div className={styles.socialLinks}>
              <h3>Follow Me</h3>
              <div className={styles.socialIcons}>
                {siteSettings.socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className={styles.formContainer}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
            <div className={`${styles.formGroup} ${errors.name ? styles.error : ''}`}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.rainbowInput}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className={styles.errorMessage}>
                  {errors.name}
                </span>
              )}
            </div>
            
            <div className={`${styles.formGroup} ${errors.email ? styles.error : ''}`}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.rainbowInput}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage}>
                  {errors.email}
                </span>
              )}
            </div>
            
            <div className={`${styles.formGroup} ${errors.subject ? styles.error : ''}`}>
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.rainbowInput}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <span id="subject-error" className={styles.errorMessage}>
                  {errors.subject}
                </span>
              )}
            </div>
            
            <div className={`${styles.formGroup} ${errors.message ? styles.error : ''}`}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={styles.rainbowInput}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className={styles.errorMessage}>
                  {errors.message}
                </span>
              )}
            </div>
            
            <motion.button 
              type="submit" 
              disabled={isSubmitting}
              className={styles.submitButton}
              whileHover={!isSubmitting ? { scale: 1.03 } : {}}
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            >
              {isSubmitting ? (
                <span className={styles.submitSpinner} aria-label="Sending...">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={styles.successMessage}
              >
                <span role="img" aria-hidden="true">🎉</span> Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={styles.errorMessage}
              >
                <span role="img" aria-hidden="true">⚠️</span> Something went wrong. Please try again later.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
      
      <RainbowDivider flipped={true} />
    </motion.div>
  );
}

// Helper function to get social icons
function getSocialIcon(platform) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'dribbble':
      return <DribbbleIcon />;
    case 'behance':
      return <BehanceIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    default:
      return platform.charAt(0).toUpperCase();
  }
}

// Social media icons (could be moved to separate components)
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm10-12c0 1.485-.355 2.886-.966 4.125a9.066 9.066 0 01-3.3.831 28.246 28.246 0 001.305-5.956h3.96zm-3.96-6h-3.96c-.225-1.989-.675-3.894-1.305-5.625a9.066 9.066 0 013.3.831A9.923 9.923 0 0118.04 6zM12 1.935a9.935 9.935 0 015.385 1.575c-.72 1.62-1.62 3.195-2.655 4.621-2.07-.45-4.2-.675-6.39-.675-1.755 0-3.465.18-5.115.495C5.1 4.845 6.6 2.985 8.385 1.71A9.935 9.935 0 0112 1.935zm-6.555 3.24c1.53-.36 3.15-.54 4.8-.54 2.025 0 4.005.27 5.91.765-1.035 1.395-2.205 2.79-3.465 4.095-2.385-1.035-5.055-1.62-7.92-1.62-.18 0-.36 0-.54.015.585-1.17 1.35-2.25 2.205-3.165zm0 14.58a9.923 9.923 0 01-2.205-3.165c.18.015.36.015.54.015 2.865 0 5.535-.585 7.92-1.62 1.26 1.305 2.43 2.7 3.465 4.095a28.246 28.246 0 01-5.91.765c-1.65 0-3.27-.18-4.8-.54zm1.17-4.5c2.7 0 5.22.765 7.425 2.115.855-1.17 1.575-2.43 2.115-3.78h-3.195c-2.07 0-4.005.315-5.85.855.225 1.305.405 2.625.51 3.81zM5.61 18.75c.36-1.395.855-2.745 1.485-3.99.675.18 1.395.315 2.16.405-.135 1.305-.36 2.61-.675 3.825A9.935 9.935 0 015.61 18.75zm7.425-14.58c1.305 1.755 2.385 3.645 3.195 5.58-1.755.45-3.6.765-5.49.945-.18-1.8-.495-3.555-.945-5.175.855-.225 1.755-.36 2.7-.36.36 0 .72 0 1.035.015zm.495 15.57c.45-1.62.765-3.375.945-5.175 1.89.18 3.735.495 5.49.945-.81 1.935-1.89 3.825-3.195 5.58a9.935 9.935 0 01-3.24-.36z"/>
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}