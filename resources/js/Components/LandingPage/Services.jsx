import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Koleksi Buku",
    icon: (
      <FaCameraRetro className="text-5xl text-primary group-hover:text-white duration-300" />
    ),
    link: "#",
    description: "Nikmati akses ke berbagai buku digital dari berbagai disiplin ilmu, termasuk buku referensi, literatur ilmiah, dan buku teks.",
    aosDelay: "0",
  },
  {
    name: "Akses Mudah dan Cepat",
    icon: (
      <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Baca buku kapan saja dan di mana saja melalui perangkat Anda, tanpa perlu mengunduh atau menginstal perangkat.",
    aosDelay: "500",
  },
  {
    name: "Pencarian dan Filter",
    icon: (
      <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Temukan buku yang Anda butuhkan dengan mudah menggunakan fitur pencarian dan filter berdasarkan kategori, penulis, atau judul.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span id="Services"></span>
      <div className="light:bg-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Can You Explore
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-black hover:text-white rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
