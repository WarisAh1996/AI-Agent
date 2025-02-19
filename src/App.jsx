import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import BookDemo from './pages/BookDemo';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-demo" element={<BookDemo />} />
        </Routes>
      </div>
    </Router>
  );
}
