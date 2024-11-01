import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaUserAstronaut, FaUserCircle } from "react-icons/fa"; // Add icons
import { Link } from 'react-router-dom';

const Navbar = ({}) => {
    const [time, setTime] = useState("");

    // Fungsi untuk mendapatkan waktu dalam zona WIB
    const updateTime = () => {
        const date = new Date();
        const optionsDate = { timeZone: "Asia/Jakarta", day: "numeric", month: "long", year: "numeric" };
        const optionsTime = { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
        const wibDate = date.toLocaleDateString("id-ID", optionsDate); // Format tanggal sesuai permintaan
        const wibTime = date.toLocaleTimeString("id-ID", optionsTime); // Format waktu 24 jam
        setTime(`<strong>${wibDate}</strong> | <strong>${wibTime} WIB</strong>`);
    };

    useEffect(() => {
        updateTime(); // Set initial time
        const intervalId = setInterval(updateTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return (

        <nav className="bg-[#D6511F] shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            {/* Left side - Logo */}
            <div className="flex items-center gap-2">
                <img src="images/logo.png" className="w-14 h-14" alt="Logo" />
                <div>
                    <h1 className="text-white text-xl font-bold">PERPUSTAKAAN</h1>
                    <p className="text-white text-sm">Balai Pengembangan Kompetensi Wilayah VI Surabaya</p>
                </div>
            </div>

            {/* Center - Contact Info */}
            <div className="flex items-center space-x-6 text-white text-sm">
                <div className="flex items-center space-x-2">
                    <FaPhoneAlt />
                    <span>(031) 8291040</span>
                </div>
                <div>|</div>
                <div className="flex items-center space-x-2">
                    <FaEnvelope />
                    <span>bapekom6surabaya@pu.go.id</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt />
                    <span>Kontak Kami</span>
                </div> */}
            </div>

            {/* Right side - Social icons */}
            <div className="flex items-center space-x-4 text-white">
            <a href="/login" className="flex items-center gap-2 border border-white px-6 py-2 rounded-full hover:shadow-custom-inset hover:bg-primary hover:border-transparent transition-all duration-200">
                        <FaUserCircle />
                        <span>LOGIN</span>
                    </a>
            </div>
        </div>

        {/* Second row - Navigation */}
        <div className="bg-white">
            <div className="container mx-auto px-5 py-3 flex justify-between space-x-10">
                {/* Left side - Date and Time */}
                <div className="text-color-light text-sm flex items-center justify-start">
                <span dangerouslySetInnerHTML={{ __html: time }} />
                    </div>
            <div className="flex items-center space-x-8 text-black">
            <a href="https://www.instagram.com/pupr_bpsdm_bapekom6/">
                <FaInstagram/>
              </a>
              <a href="https://www.facebook.com/pupr.bpsdm.bapekom6?_rdc=1&_rdr">
                <FaFacebook />
              </a>
              <a href="https://www.youtube.com/channel/UCeOB5nYLfjM8VmiN6mFc58g">
                <FaYoutube />
              </a>
            </div>
            </div>
        </div>
    </nav>
//        <nav className="shadow-md bg-navbarBackground bg-cover bg-center duration-300">
//         <div className="container flex justify-between items-center">
//             {/*Logo section */}
//             <h1 className="text-3xl font-semibold flex justify-center items-center gap-2">
//                 <img src="images/logo.png" className="w-20 h-20" />
//                 PustakaKu
//             </h1>
//             {/*Menu section */}
//             <ul className="flex items-center gap-6 text-xl py-4 font-serif">
//                 <li>
//                     <a href="#Hero" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">Home</a>
//                 </li>
//                 <li>
//                     <a href="#About" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">About</a>
//                 </li>
//                 <li>
//                     <a href="#Services" className="inline-block px-3 py-2 hover:text-yellow-400 transition-colors duration-200">Service</a>
//                 </li>
//                 <li>
//                 <a href="/login" className="border border-white px-6 py-2 rounded-full hover:shadow-custom-inset hover:bg-primary hover:border-transparent transition-all duration-200">
//                 Login
//                     </a>
//                 </li>
//             </ul>

// {/* <div>
//     {
//         theme === "dark" ? (
//             <BiSolidSun onClick={() => setTheme ("light")} className="text-2xl"/>
//         ) : (
//             <BiSolidMoon onClick={() => setTheme ("dark")} className="text-2xl"/>
//         )
//     }

// </div> */}

//             </div>
//        </nav>
    );
};

export default Navbar;
