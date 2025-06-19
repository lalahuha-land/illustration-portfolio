import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { urlFor } from '../../lib/sanity';
import styles from '../../assets/styles/IllustrationCard.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function IllustrationCard({ item, index }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <div className={styles.imageContainer}>
        <LazyLoadImage
          src={urlFor(item.imageUrl).width(600).url()}
          alt={item.title}
          effect="blur"
          className={styles.image}
          wrapperClassName={styles.imageWrapper}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
        {item.colors && item.colors.length > 0 && (
          <div className={styles.colorPalette}>
            {item.colors.map((color, i) => (
              <div 
                key={i} 
                className={styles.colorSwatch} 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}