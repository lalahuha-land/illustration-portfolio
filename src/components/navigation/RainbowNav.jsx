import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from '../../assets/styles/RainbowNav.module.scss';

const navItems = [
  { color: "#FF6B6B", label: "Home", path: "/" },
 // { color: "#FFA94D", label: "Characters", path: "/characters" },
 // { color: "#FFD700", label: "Landscapes", path: "/landscapes" },
 // { color: "#51CF66", label: "Objects", path: "/objects" },
 // { color: "#339AF0", label: "Comics", path: "/comics" },
  { color: "#845EF7", label: "About", path: "/about" },
  { color: "#CC5DE8", label: "Contact", path: "/contact" }
];

export default function RainbowNav() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(`.${styles.navContainer}`)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Close menu when route changes
  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div 
        className={`${styles.navContainer} ${mobileMenuOpen ? styles.mobileMenuOpen : ''} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Mobile menu toggle button */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              ☰
            </motion.span>
          )}
        </button>

        {/* Navigation items */}
        <div className={styles.navItems}>
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              className={`${styles.navItem} ${mobileMenuOpen ? styles.mobileVisible : ''}`}
              style={{ backgroundColor: item.color }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 15px ${item.color}`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(item.path)}
              aria-current={window.location.pathname === item.path ? "page" : undefined}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          ))}
          
          {/* Theme toggle */}
          <motion.div 
            className={`${styles.themeToggleContainer} ${mobileMenuOpen ? styles.mobileVisible : ''}`}
            whileHover={{ scale: 1.05 }}
          >
            <button 
              className={`${styles.themeToggle} ${darkMode ? styles.dark : ''}`}
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div 
                className={styles.toggleHandle}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
            <span>{darkMode ? '🌙' : '☀️'}</span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <motion.div 
          className={styles.mobileOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}