import React, { useState } from 'react';
import Header from './Theme/Header';
import Footer from './Theme/Footer';

function Home() {
  return (
    <div>
        <Header />
        <div>
            <img src = "logo512.png" alt = "Oculus NZ"></img>
        </div>
        <Footer />
    </div>
  );
}

export default Home;


