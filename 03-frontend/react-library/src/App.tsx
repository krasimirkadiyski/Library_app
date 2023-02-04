import React from 'react';
import './App.css';
import { Carousel } from './layouts/HomePage/components/Carousel';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';

export const App = () => {
  return (
    <div>
    <Navbar/>
    <HomePage/>
    <Footer/>
    </div>    
  );
}

export default App;