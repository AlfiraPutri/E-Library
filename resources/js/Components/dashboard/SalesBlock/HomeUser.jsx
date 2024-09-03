import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesUserWrap } from "./HomeUser.styles";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SalesUser = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/buku');
                console.log(response.data);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books data:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/kategori');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories data:', error);
            }
        };

        fetchBooks();
        fetchCategories();
    }, []);

    const handleBookClick = (id_buku) => {
        navigate(`/user/buku/${id_buku}/show`);
      };


    return (
        <SalesUserWrap>
            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        <h3>Discover</h3>
                    </BlockTitle>
                    <p className="text">Get your book here!</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search for a book..." />
            </div>

            {/* Book Collection */}
            <BlockContentWrap>
            <BlockTitle className="block-title">
                        <h3>Koleksi Buku</h3>
                    </BlockTitle>
                <div className="book-collection">
                {books.slice(0, 5).map((buku) => {
                    console.log(buku); // Periksa nilai img_buku di sini
                    return (
                        <div key={buku.id_buku} className="book-item" onClick={() => handleBookClick(buku.id_buku)}>
                            <img src={`http://127.0.0.1:8000/storage/${buku.img_buku}`} className="book-image" />
                            <p className="book-title">{buku.judul}</p>
                        </div>
                    );
                })}
                </div>
            </BlockContentWrap>

            {/* Categories */}
            <BlockTitle className="block-title">
                        <h3>Buku Populer</h3>
                    </BlockTitle>
            <div className="category-section">
                {categories.map((category) => (
                    <div key={category.id_kategori} className="category-item">
                        {category.nama_kategori}
                    </div>
                ))}
            </div>
        </SalesUserWrap>
    );
};

export default SalesUser;
