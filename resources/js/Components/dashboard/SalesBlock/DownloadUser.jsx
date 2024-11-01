import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { DownloadUserWrap } from "./DownloadUser.styles";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const DownloadUser = ({ auth }) => {
    const [download, setDownload] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDownload = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${auth.user.id_users.toString()}/download`);
                console.log('Fetched download data:', response);
                // Sort by created_at (descending) to get the latest records first
                const sortedDownload = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Use a map to store unique books by id_buku (only the latest record will be kept)
                const uniqueDownload = new Map();
                sortedDownload.forEach(entry => {
                    if (!uniqueDownload.has(entry.id_buku)) {
                        uniqueDownload.set(entry.id_buku, entry);
                    }
                });

                // Set download as an array of unique entries
                setDownload([...uniqueDownload.values()]);
            } catch (error) {
                console.error('Error fetching download:', error.response ? error.response.data : error.message);
            }
        };

        fetchDownload();
    }, [auth.user.id_users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <DownloadUserWrap>
            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        {/* <h3>Download Buku</h3> */}
                    </BlockTitle>
                    <p className="text">Temukan buku yang telah Anda download</p>
                </div>
            </div>
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

            </div>
            <BlockContentWrap>
                <div className="book-collection">
                    {download.length > 0 ? (
                    download.map((entry) => (
                        <div key={entry.id} className="book-item">
                            <img src={`http://127.0.0.1:8000/storage/${entry.buku.img_buku}`} className="book-image" alt="Book Cover" />
                            <p className="book-title">{entry.buku.judul}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-history-container">
                            <img src="/images/not found.png" alt="No books" className="no-history-image" />
                            <p className="no-history-text">Belum ada buku yang didownload </p>
                        </div>
                )}
                </div>
            </BlockContentWrap>
        </DownloadUserWrap>
    );
};

export default DownloadUser;
