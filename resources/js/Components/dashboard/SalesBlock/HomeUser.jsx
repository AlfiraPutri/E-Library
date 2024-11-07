import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesUserWrap } from "./HomeUser.styles";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const SalesUser = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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

      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

      const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredBooks = books.filter((book) => {
        const matchesCategory = selectedCategory ? book.id_kategori === parseInt(selectedCategory) : true;
        const matchesSearch = book.judul.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <SalesUserWrap>
            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        {/* <h3>Discover</h3> */}
                    </BlockTitle>
                    <p className="text">Temukan buku yang Anda cari !</p>
                </div>
            </div>

            {/* Search Bar and Category Filter */}
            <div className="search-bar-wrapper">
                <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                    type="text"
                    placeholder="Search ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                </div>
                <div className="category-filter">
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="">Semua Kategori</option>
                        {categories.map((category) => (
                            <option key={category.id_kategori} value={category.id_kategori}>
                                {category.nama_kategori}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Book Collection */}
            <BlockContentWrap>
            <BlockTitle className="block-title">
                        {/* <h3>Koleksi Buku</h3> */}
                    </BlockTitle>
                <div className="book-collection">
                {filteredBooks.length > 0 ? (
                        filteredBooks.map((buku) => (
                            <div key={buku.id_buku} className="book-item" onClick={() => handleBookClick(buku.id_buku)}>
                                <img src={`http://127.0.0.1:8000/storage/${buku.img_buku}`} className="book-image" alt={buku.judul} />
                                <p className="book-title">{buku.judul}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-books-message">Buku Belum Tersedia</p>
                    )}
                </div>
            </BlockContentWrap>

            {/* Categories */}
            {/* <BlockTitle className="block-title">
                        <h3>Buku Populer</h3>
                    </BlockTitle>
            <div className="category-section">
                {categories.map((category) => (
                    <div key={category.id_kategori} className="category-item">
                        {category.nama_kategori}
                    </div>
                ))}
            </div> */}
        </SalesUserWrap>
    );
};

export default SalesUser;
