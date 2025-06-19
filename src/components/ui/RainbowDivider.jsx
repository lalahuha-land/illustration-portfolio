import styles from '../../assets/styles/RainbowDivider.module.scss';

export default function RainbowDivider({ flipped = false }) {
  return (
    <div className={`${styles.divider} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.colorSegment} style={{ backgroundColor: '#FF6B6B' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#FFA94D' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#FFD700' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#51CF66' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#339AF0' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#845EF7' }}></div>
      <div className={styles.colorSegment} style={{ backgroundColor: '#CC5DE8' }}></div>
    </div>
  );
}