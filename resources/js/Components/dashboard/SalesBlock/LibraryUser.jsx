import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesUserWrap } from "./HomeUser.styles";
import axios from 'axios';

const LibraryUser = ({ auth }) => {
    const [history, setHistory] = useState([]);

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

    return (
        <SalesUserWrap>
            <div className="block-head">
                <div className="block-head-l">
                    <BlockTitle className="block-title">
                        <h3>History Buku</h3>
                    </BlockTitle>
                    <p className="text">Temukan history</p>
                </div>
            </div>
            <BlockContentWrap>
                <div className="book-collection">
                    {history.map((entry) => (
                        <div key={entry.id_buku} className="book-item">
                            <img
                                src={`http://127.0.0.1:8000/storage/${entry.buku.img_buku}`}
                                className="book-image"

                            />
                            <p className="book-title">
                                {entry.buku.judul} - Dibaca pada {new Date(entry.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </BlockContentWrap>

        </SalesUserWrap>
    );
};

export default LibraryUser;
