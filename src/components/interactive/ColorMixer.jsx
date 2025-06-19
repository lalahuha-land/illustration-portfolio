import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../../assets/styles/ColorMixer.module.scss';

export default function ColorMixer() {
  const [colors, setColors] = useState({
    red: 127,
    green: 127,
    blue: 127
  });
  
  const [mixedColor, setMixedColor] = useState('rgb(127, 127, 127)');
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(false);

  // Update mixed color and palette when RGB values change
  useEffect(() => {
    const newColor = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;
    setMixedColor(newColor);
    generatePalette(newColor);
  }, [colors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColors(prev => ({ ...prev, [name]: parseInt(value) }));
    setCopied(false);
  };

  const randomizeColors = () => {
    setColors({
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256)
    });
    setCopied(false);
  };

  const generatePalette = (baseColor) => {
    const newPalette = [
      baseColor,
      lightenColor(baseColor, 0.2),
      lightenColor(baseColor, 0.4),
      darkenColor(baseColor, 0.2),
      darkenColor(baseColor, 0.4)
    ];
    setPalette(newPalette);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mixedColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper functions
  const lightenColor = (rgb, amount) => {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb;
    
    const r = Math.min(255, parseInt(match[1]) + Math.floor(255 * amount));
    const g = Math.min(255, parseInt(match[2]) + Math.floor(255 * amount));
    const b = Math.min(255, parseInt(match[3]) + Math.floor(255 * amount));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const darkenColor = (rgb, amount) => {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return rgb;
    
    const r = Math.max(0, parseInt(match[1]) - Math.floor(255 * amount));
    const g = Math.max(0, parseInt(match[2]) - Math.floor(255 * amount));
    const b = Math.max(0, parseInt(match[3]) - Math.floor(255 * amount));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Color Mixer</h3>
      <p>Create your own color palette:</p>
      
      <div 
        className={styles.colorPreview} 
        style={{ backgroundColor: mixedColor }}
        onClick={copyToClipboard}
      >
        <div className={styles.colorInfo}>
          <span>RGB: {colors.red}, {colors.green}, {colors.blue}</span>
          <span>HEX: {rgbToHex(colors.red, colors.green, colors.blue)}</span>
          {copied && <span className={styles.copyMessage}>Copied!</span>}
        </div>
      </div>
      
      <div className={styles.sliders}>
        <div className={styles.sliderGroup}>
          <label htmlFor="red">Red</label>
          <input
            type="range"
            id="red"
            name="red"
            min="0"
            max="255"
            value={colors.red}
            onChange={handleChange}
            className={styles.slider}
            style={{ '--track-color': `rgba(255, 0, 0, 0.5)` }}
          />
          <span>{colors.red}</span>
        </div>
        
        <div className={styles.sliderGroup}>
          <label htmlFor="green">Green</label>
          <input
            type="range"
            id="green"
            name="green"
            min="0"
            max="255"
            value={colors.green}
            onChange={handleChange}
            className={styles.slider}
            style={{ '--track-color': `rgba(0, 255, 0, 0.5)` }}
          />
          <span>{colors.green}</span>
        </div>
        
        <div className={styles.sliderGroup}>
          <label htmlFor="blue">Blue</label>
          <input
            type="range"
            id="blue"
            name="blue"
            min="0"
            max="255"
            value={colors.blue}
            onChange={handleChange}
            className={styles.slider}
            style={{ '--track-color': `rgba(0, 0, 255, 0.5)` }}
          />
          <span>{colors.blue}</span>
        </div>
      </div>
      
      <div className={styles.buttonGroup}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.randomButton}
          onClick={randomizeColors}
        >
          Random Color
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.copyButton}
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : 'Copy Color'}
        </motion.button>
      </div>
      
      <div className={styles.palette}>
        {palette.map((color, index) => (
          <div 
            key={index} 
            className={styles.paletteColor} 
            style={{ backgroundColor: color }}
            onClick={() => {
              const rgb = color.match(/\d+/g);
              if (rgb) {
                setColors({
                  red: parseInt(rgb[0]),
                  green: parseInt(rgb[1]),
                  blue: parseInt(rgb[2])
                });
              }
            }}
          >
            <span className={styles.paletteLabel}>
              {index === 0 ? 'Base' : index <= 2 ? `Light ${index}` : `Dark ${index - 2}`}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}