import React from 'react';

const About = () => {
    return (
        <div id="About" className="light:bg-white duration-300 sm:min-h-[400px] sm:grid sm:place-items-center">
            <div className="container mx-auto">
                {/* Card container */}
                <div className="bg-white shadow-lg rounded-xl p-8 mx-auto max-w-4xl">
                <div className="flex flex-col items-center gap-6">
                        {/* Logo and Text Container */}
                        <div data-aos="slide-right" data-aos-duration="1500" className="flex items-center space-x-4">
                            {/* Logo */}
                            <img
                                src="images/logo.png"
                                alt="Gedung Bapekom"
                                className="w-[100px] h-[100px] object-contain drop-shadow-xl rounded-xl"
                            />
                            {/* Text next to Logo */}
                            <div className="text mt-4">
                                <h1 className="text-black text-xl font-bold">PERPUSTAKAAN</h1>
                                <p className="text-gray-600 text-sm">
                                    Balai Pengembangan Kompetensi Wilayah VI Surabaya
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div>
                            <h1 data-aos="fade-up" className="text-2xl sm:text-2xl font-bold font-serif text-center">
                                Repositori Perpustakaan
                            </h1>
                            <h2 className="text-2xl sm:text-2xl font-bold font-serif text-center">
                                Balai Pengembangan Kompetensi Wilayah VI Surabaya
                            </h2>

                            <div className="mt-6">
                            <a href="/login">
                                <button data-aos="fade-up" className="bg-[#F77D00] text-white px-80 py-2 rounded-md shadow-md hover:bg-orange-600 transition-all">
                                    Get Started
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
