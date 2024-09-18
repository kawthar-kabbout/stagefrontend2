// src/components/Home.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Image from './Image';
import Restaurant from './Restaurant';

function Home() {
  const location = useLocation();
  const user = location.state?.user; // Access user data

  return (
    <div>
      <Image />
      <Restaurant />
      

{/* Footer Section */}
<footer className="restaurant-footer mt-4">
        <div className="container text-center">
          
         
        </div>
      </footer>

    </div>
  );
}

export default Home;
