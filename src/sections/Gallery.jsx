import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IllustrationCard from '../components/gallery/IllustrationCard';
import CategoryFilter from '../components/gallery/CategoryFilter';
import { fetchIllustrations } from '../lib/sanity';
import styles from '../assets/styles/Gallery.module.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Gallery() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available categories
  const categories = [
    //{ id: 'all', name: 'All Works' },
    // { id: 'characters', name: 'Characters' },
    // { id: 'landscapes', name: 'Landscapes' },
    // { id: 'objects', name: 'Objects' },
    // { id: 'comics', name: 'Comics' },
    // { id: 'animations', name: 'Animations' }
  ];

  // Fetch illustrations based on category
  useEffect(() => {
    const getIllustrations = async () => {
      setLoading(true);
      setError(null);
      try {
        const illustrations = await fetchIllustrations();
        //const illustrations = await fetchIllustrations(category === 'all' ? null : category);
        setItems(illustrations);
      } catch (err) {
        console.error('Error fetching illustrations:', err);
        setError('Failed to load illustrations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getIllustrations();
  }, [category]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    navigate(`/gallery/${newCategory}`);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops!</h2>
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.rainbowSpinner}></div>
        <p>Loading illustrations...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={styles.title}
      >
        {category ? categories.find(c => c.id === category)?.name : 'Gallery'}
      </motion.h1>

      <CategoryFilter 
        categories={categories} 
        currentCategory={category || 'all'} 
        onChange={handleCategoryChange} 
      />

      <AnimatePresence>
        {items.length > 0 ? (
          <motion.div 
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {items.map((item, index) => (
              <IllustrationCard 
                key={item._id} 
                item={item} 
                index={index} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LazyLoadImage
              src="/empty-state.svg"
              alt="No illustrations found"
              effect="blur"
              className={styles.emptyImage}
            />
            {/* SVG fallback in case image doesn't load */}
              {!document.querySelector('.empty-image-loaded') && (
                <svg className={styles.svgFallback} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21,19V5c0,-1.1 -0.9,-2 -2,-2H5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2zM8.5,13.5l2.5,3.01l3.5,-4.51l4.5,6H5l3.5,-4.5z"/>
                </svg>
              )}
            <h3>No illustrations found</h3>
            <p>Try selecting a different category</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}