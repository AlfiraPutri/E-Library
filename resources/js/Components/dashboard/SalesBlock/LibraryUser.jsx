import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { LibraryUserWrap } from "./LibraryUser.styles";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const LibraryUser = ({ auth}) => {
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     setPageTitle('Riwayat Buku');
    //   }, [setPageTitle]);


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${auth.user.id_users.toString()}/history`);
                console.log('Fetched history data:', response);
                // Sort by created_at (descending) to get the latest records first
                const sortedHistory = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Use a map to store unique books by id_buku (only the latest record will be kept)
                const uniqueHistory = new Map();
                sortedHistory.forEach(entry => {
                    if (!uniqueHistory.has(entry.id_buku)) {
                        uniqueHistory.set(entry.id_buku, entry);
                    }
                });

                // Set history as an array of unique entries
                setHistory([...uniqueHistory.values()]);
            } catch (error) {
                console.error('Error fetching history:', error.response ? error.response.data : error.message);
            }
        };

        fetchHistory();
    }, [auth.user.id_users]);

    const handleBookClick = (id_buku) => {
        navigate(`/user/buku/${id_buku}/show`);
      };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <LibraryUserWrap>

            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        {/* <h3>History Buku</h3> */}
                    </BlockTitle>
                    <p className="text">Temukan riwayat buku yang telah Anda baca </p>
                </div>
            </div>

             {/* Search Bar and Category Filter */}
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
                {history.length > 0 ? (
                    history
                    .filter((entry) =>
                    entry.buku.judul.toLowerCase().includes(searchQuery.toLowerCase())
                )
                    .map((entry) => (
                        <div key={entry.id_buku} className="book-item" onClick={() => handleBookClick(entry.buku.id_buku)}>
                            <img
                                src={`http://127.0.0.1:8000/storage/${entry.buku.img_buku}`}
                                className="book-image"

                            />
                            <p className="book-title">
                                {entry.buku.judul} - Dibaca pada {new Date(entry.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="no-history-container">
                            <img src="/images/not found.png" alt="No books" className="no-history-image" />
                            <p className="no-history-text">Belum ada buku yang dibaca</p>
                        </div>
                )}
                </div>
            </BlockContentWrap>

        </LibraryUserWrap>
    );
};

export default LibraryUser;
