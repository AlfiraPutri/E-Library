import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { FavoriteUserWrap } from "./FavoriteUser.styles";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FavoriteUser = ({ auth, setPageTitle }) => {
    const [favorite, setFavorite] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setPageTitle('Favorit Buku');
      }, [setPageTitle]);


    useEffect(() => {
        const fetchFavorite = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${auth.user.id_users.toString()}/favorite`);
                console.log('Fetched favorite data:', response);
                // Sort by created_at (descending) to get the latest records first
                const sortedFavorite = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Use a map to store unique books by id_buku (only the latest record will be kept)
                const uniqueFavorite = new Map();
                sortedFavorite.forEach(entry => {
                    if (!uniqueFavorite.has(entry.id_buku)) {
                        uniqueFavorite.set(entry.id_buku, entry);
                    }
                });

                // Set favorite as an array of unique entries
                setFavorite([...uniqueFavorite.values()]);
            } catch (error) {
                console.error('Error fetching favorite:', error.response ? error.response.data : error.message);
            }
        };

        fetchFavorite();
    }, [auth.user.id_users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <FavoriteUserWrap>
            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        {/* <h3>Favorite Buku</h3> */}
                    </BlockTitle>
                    <p className="text">Temukan buku favorit Anda</p>
                </div>
            </div>
            <div className="search-bar-wrapper">
                <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                    type="text"
                    placeholder="Pencarian ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                </div>

            </div>
            <BlockContentWrap>
                <div className="book-collection">
                    {favorite.length > 0 ? (
                        favorite.map((entry) => (
                            <div key={entry.id} className="book-item">
                                <img src={`http://127.0.0.1:8000/storage/${entry.buku.img_buku}`} className="book-image" alt="Book Cover" />
                                <p className="book-title">{entry.buku.judul}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-history-container">
                            <img src="/images/not found.png" alt="No books" className="no-history-image" />
                            <p className="no-history-text">Belum ada buku yang disuka</p>
                        </div>
                    )}
                </div>
            </BlockContentWrap>
        </FavoriteUserWrap>
    );
};

export default FavoriteUser;
