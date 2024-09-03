import React from 'react';
//import Gedung from "../public/images/gedung bapekom.jpg";

const About = () => {
    return (
    <div id="About" className="light:bg-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
            <div data-aos="slide-right" data-aos-duration="1500">
                <img src="/images/book2.png" alt="Gedung Bapekom" className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] rounded-xl"  />
            </div>
            <div>
                <div className='space-y-5 sm:p-16 pb-6'>
                    <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-bold font-serif'>About Us</h1>
                    <p data-aos="fade-up" className="leading-8 tracking">Platform yang membantu kemudahan untuk Anda membaca berbagai buku pilihan. Dapatkan Akses Cepat ke Koleksi Buku Digital yang Luas, Membantu Anda Mengembangkan Wawasan dan Keterampilan Anda Setiap Saat.</p>
                    {/* <button data-aos="fade-up" className="button-outline">
                Get Started
              </button> */}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
