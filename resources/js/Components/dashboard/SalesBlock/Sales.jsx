import React, { useState, useEffect } from 'react';
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesBlockWrap } from "./Sales.styles";
import axios from 'axios';

const Icons = {
    ExportDark: '/icons/export_dark.svg',
    CardSales: '/icons/card_sales.svg',
    CardOrder: '/icons/card_order.svg',
    CardProduct: '/icons/card_product.svg',
    CardCustomer: '/icons/card_customer.svg',
}

const SalesBlock = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBuku, setTotalBuku] = useState(0);
    const [totalKategori, setTotalKategori] = useState(0);
    const [totalBukuTerbaca, setTotalBukuTerbaca] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
          try {
            // Ganti URL dengan endpoint API yang sesuai
            const response = await axios.get('http://127.0.0.1:8000/api/user');
            const users = response.data;
            setTotalUsers(users.length); // Pastikan respons API memiliki format yang sesuai
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        fetchTotalUsers();

        const fetchTotalBuku = async () => {
            try {
              // Ganti URL dengan endpoint API yang sesuai
              const response = await axios.get('http://127.0.0.1:8000/api/buku');
              const buku = response.data;
              setTotalBuku(buku.length); // Pastikan respons API memiliki format yang sesuai
            } catch (error) {
              console.error('Error fetching buku data:', error);
            }
          };

          fetchTotalBuku();

          const fetchTotalKategori = async () => {
            try {
              // Ganti URL dengan endpoint API yang sesuai
              const response = await axios.get('http://127.0.0.1:8000/api/kategori');
              const category = response.data;
              setTotalKategori(category.length); // Pastikan respons API memiliki format yang sesuai
            } catch (error) {
              console.error('Error fetching kategori data:', error);
            }
          };

          fetchTotalKategori();

          const fetchTotalBukuTerbaca = async () => {
            try {
                // Fetch history data for all users
                const response = await axios.get('http://127.0.0.1:8000/api/user/{id}/history');
                const history = response.data;

                // Use a Set to track unique book IDs
                const uniqueBooks = new Set(history.map(entry => entry.id_buku));

                // Set the total number of unique books read
                setTotalBukuTerbaca(uniqueBooks.size);
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        };

        fetchTotalBukuTerbaca();

      }, []);

  return (
    <SalesBlockWrap>
      <div className="block-head">
        <div className="block-head-l">
          <BlockTitle className="block-title">
            <h3>Overview</h3>
          </BlockTitle>
          <p className="text">Temukan ringkasanya</p>
        </div>
        <div className="block-head-r">
          <button type="button" className="export-btn">
            <img src={Icons.ExportDark} alt="" />
            <span className="text">Export</span>
          </button>
        </div>
      </div>
      <BlockContentWrap>
        <div className="cards">
          <div className="card-item card-misty-rose">
            <div className="card-item-icon">
              <img src={Icons.CardSales} alt="" />
            </div>
            <div className="card-item-value">{totalUsers}</div>
            <p className="card-item-text text">Total User</p>
          </div>
          <div className="card-item card-latte">
            <div className="card-item-icon">
              <img src={Icons.CardOrder} alt="" />
            </div>
            <div className="card-item-value">{totalBuku}</div>
            <p className="card-item-text text">Total Book</p>
          </div>
          <div className="card-item card-nyanza">
            <div className="card-item-icon">
              <img src={Icons.CardProduct} alt="" />
            </div>
            <div className="card-item-value">{totalBukuTerbaca}</div>
            <p className="card-item-text text">Total Buku Terbaca</p>
          </div>
          <div className="card-item card-pale-purple">
            <div className="card-item-icon">
              <img src={Icons.CardCustomer} alt="" />
            </div>
            <div className="card-item-value">{totalKategori}</div>
            <p className="card-item-text text">Total Kategori</p>
          </div>
        </div>
      </BlockContentWrap>
    </SalesBlockWrap>
  );
};

export default SalesBlock;
