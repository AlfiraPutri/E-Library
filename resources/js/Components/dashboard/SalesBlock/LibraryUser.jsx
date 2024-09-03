import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesUserWrap } from "./HomeUser.styles";
import axios from 'axios';

const LibraryUser = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/history');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching history:', error.response ? error.response.data : error.message);
            }
        };

        fetchHistory();

      }, []);

  return (
    <SalesUserWrap>
      <div className="block-head">
        <div className="block-head-l">
          <BlockTitle className="block-title">
            <h3>History Buku</h3>
          </BlockTitle>
          <p className="text">Temukan ringkasanya</p>
        </div>

      </div>
      <BlockContentWrap>
      <div className="book-collection">
                {history.map((entry) => {
                    return (<div key={entry.id} className="book-item" >
                    <img src={`http://127.0.0.1:8000/storage/${buku.img_buku}`} className="book-image" />
                    <p className="book-title">{entry.buku.judul} - - Dibaca pada {new Date(entry.created_at).toLocaleString()}</p>
                </div>);
})}
            </div>
      </BlockContentWrap>
    </SalesUserWrap>
  );
};

export default LibraryUser;
