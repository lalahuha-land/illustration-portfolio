import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAbout } from '../lib/sanity';
import ColorMixer from '../components/interactive/ColorMixer';
import RainbowDivider from '../components/ui/RainbowDivider';
import styles from '../assets/styles/About.module.scss';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAbout = async () => {
      try {
        const data = await fetchAbout();
        setAboutData(data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getAbout();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.rainbowSpinner}></div>
        <p>Loading about information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!aboutData) {
    return <div className={styles.emptyState}>No about data available</div>;
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
          {aboutData.title || 'About the Artist'}
        </motion.h1>
        <RainbowDivider />
      </div>

      <div className={styles.content}>
        <div className={styles.bio}>
          <motion.div 
            className={styles.text}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {aboutData.bio && aboutData.bio.map((block, i) => (
              <p key={i}>
                {aboutData.bio && aboutData.bio.map((block, index) => {
  const content = block.children?.map(child => child.text).join(' ') || 'No bio available.';
  return <p key={index}>{content}</p>;
})}
              </p>  
            ))}
          </motion.div>
          
          {aboutData.avatarUrl && (
            <motion.div 
              className={styles.avatar}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div 
                className={styles.avatarImage} 
                style={{ backgroundImage: `url(${aboutData.avatarUrl})` }}
                aria-label="Artist portrait"
              />
            </motion.div>
          )}
        </div>

        <div className={styles.details}>
          {aboutData.skills && aboutData.skills.length > 0 && (
            <motion.div 
              className={styles.skills}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2>Artistic Toolkit</h2>
              <ul className={styles.tools}>
                {aboutData.skills.map((skill, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {aboutData.funFacts && aboutData.funFacts.length > 0 && (
            <motion.div 
              className={styles.funFacts}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <h2>Colorful Facts</h2>
              {aboutData.funFacts.map((fact, i) => (
                <motion.div 
                  key={i} 
                  className={styles.factCard}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.factIcon}>{fact.icon}</div>
                  <p>{fact.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className={styles.interactiveSection}>
        <h2>Play with Colors</h2>
        <ColorMixer />
      </div>
      
      <RainbowDivider flipped={true} />
    </motion.div>
  );
}