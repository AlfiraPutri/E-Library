import React, { useEffect, useState } from "react";
//import Gedung from "../public/images/gedung bapekom.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";


const Hero = ({  }) => {
 // const navigate = useNavigate();
 const { id } = useParams();

  useEffect(() => {
    AOS.refresh();
  });
  return (
    <div id="Hero" className="relative min-h-[620px] flex items-center justify-center bg-[#F4E8D5] bg-opacity-70 duration-300">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in" data-aos-duration="1500" data-aos-once="false" className="order-1 sm:order-2"
          >
            <img
              src="/images/gedung bapekom.jpg" alt="Gedung Bapekom" className="sm:scale-125 relative -z-10 max-h-[360px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] w-full h-auto sm:w-80 sm:h-80 rounded-xl"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">

            <h1 data-aos="fade-up" data-aos-delay="600" className="text-5xl lg:text-7xl font-semibold font-serif">
              Discover World with Reading Book
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
            Baca buku kapan saja dan di mana saja melalui perangkat Anda. {" "}
            </p>
            <a
            href={`/user/${id}/dashboard`}
            data-aos="fade-up"
            data-aos-delay="1500"
            className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black inline-block"
            >
            Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
