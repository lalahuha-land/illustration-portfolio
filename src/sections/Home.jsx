import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/Home.module.scss';

export default function Home() {
  const rainbowColors = [
    '#FF6B6B', // Red
    '#FFA94D', // Orange
    '#FFD700', // Yellow
    '#51CF66', // Green
    '#339AF0', // Blue
    '#845EF7', // Indigo
    '#CC5DE8'  // Violet
  ];

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className={styles.hero}>
        {/* Animated title with rainbow gradient */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={styles.title}
        >
          Hi<span> there!</span>
        </motion.h1>
        
        {/* Subtitle with staggered letter animation */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className={styles.subtitle}
        >
          {'Information in Every Hue'.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3 + index * 0.03,
                type: 'spring',
                stiffness: 300
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.p>
        
        {/* CTA button with hover animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={styles.ctaContainer}
        >
          <Link to="/gallery" className={styles.ctaButton}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Projects
            </motion.span>
          </Link>
        </motion.div>
      </div>
      
      {/* Floating rainbow bubbles */}
      <div className={styles.bubbleContainer}>
        {rainbowColors.map((color, index) => (
          <motion.div
            key={index}
            className={styles.bubble}
            style={{ backgroundColor: color }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Rainbow divider bar */}
      <div className={styles.rainbowBar}>
        {rainbowColors.map((color, index) => (
          <div 
            key={index}
            className={styles.rainbowSegment}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </motion.div>
  );
}