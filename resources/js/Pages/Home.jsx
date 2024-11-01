import React, { useEffect } from 'react';
import About from '../Components/LandingPage/About';
import Hero from '../Components/LandingPage/Hero';
import Service from '../Components/LandingPage/Services';
import Footer from '../Components/LandingPage/Footer';
import Navbar from '../Components/LandingPage/Navbar';
import "aos/dist/aos.css";
import AOS from "aos";

const Home = () => {

    useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      {/* <Service /> */}
      <Footer />
    </div>
  );
};

export default Home;
