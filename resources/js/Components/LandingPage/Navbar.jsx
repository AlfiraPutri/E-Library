import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaUserCircle } from "react-icons/fa";


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
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (

        <nav className="bg-[#D6511F] shadow-md">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:justify-between items-center">
            {/* Left side - Logo */}
            <div className="flex items-center gap-2">
                <img src="images/logo.png" className="w-14 h-14w-10 h-10 md:w-14 md:h-14" alt="Logo" />
                <div>
                    <h1 className="text-white text-xl md:text-xl font-bold">PERPUSTAKAAN</h1>
                    <p className="text-white text-sm md:text-sm">Balai Pengembangan Kompetensi Wilayah VI Surabaya</p>
                </div>
            </div>

            {/* Center - Contact Info */}
            <div className="hidden md:flex items-center space-x-6 text-white text-xs md:text-sm">
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
            <div className="flex items-center space-x-2 mt-2 md:mt-0 text-white">
            <a href="/login" className="flex items-center gap-2 border border-white px-4 py-1 md:px-6 md:py-2 rounded-full hover:shadow-custom-inset hover:bg-primary hover:border-transparent transition-all duration-200 text-white text-xs md:text-sm">
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
            <a href="https://www.instagram.com/pupr_bpsdm_bapekom6/" target="_blank" rel="noopener noreferrer">
                <FaInstagram/>
              </a>
              <a href="https://www.facebook.com/pupr.bpsdm.bapekom6?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.youtube.com/channel/UCeOB5nYLfjM8VmiN6mFc58g" target="_blank" rel="noopener noreferrer">
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
