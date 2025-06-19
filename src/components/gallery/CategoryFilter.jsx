import { motion } from 'framer-motion';
import styles from '../../assets/styles/CategoryFilter.module.scss';

export default function CategoryFilter({ categories, currentCategory, onChange }) {
  return (
    <div className={styles.filterContainer}>
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          className={`${styles.filterButton} ${currentCategory === cat.id ? styles.active : ''}`}
          onClick={() => onChange(cat.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cat.name}
          {currentCategory === cat.id && (
            <motion.div 
              className={styles.activeIndicator}
              layoutId="activeIndicator"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}