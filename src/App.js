import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import RainbowNav from './components/navigation/RainbowNav';
import Home from './sections/Home';
import Gallery from './sections/Gallery';
import About from './sections/About';
import Contact from './sections/Contact';
import ParticleBackground from './components/background/ParticleBackground';
import { ThemeProvider } from './context/ThemeContext';
import './assets/styles/main.scss';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <motion.div className="app">
          <ParticleBackground />
          <RainbowNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </Router>
    </ThemeProvider>
  );
}

export default App;