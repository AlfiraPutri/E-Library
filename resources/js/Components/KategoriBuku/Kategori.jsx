import React, { useState, useEffect } from 'react';
import { BlockTitle } from "../../styles/global/default";
import { KategoriWrap } from "./Kategori.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormKategori from '../FormKategori';
import axios from 'axios';

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [isFormKategoriOpen, setIsFormKategoriOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/kategori`;
      console.log('Fetching from URL:', url);
      const response = await axios.get(url);
      setKategori(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddClick = () => {
    setCurrentCategory(null);
    setIsFormKategoriOpen(true);
  };

  const handleEditClick = async (category) => {
    setCurrentCategory(category);
    setIsFormKategoriOpen(true);

  };

  const handleFormKategoriClose = () => {
    setIsFormKategoriOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentCategory) {
        await axios.put(`http://127.0.0.1:8000/api/kategori/${currentCategory.id_kategori}`, formData);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/kategori`, formData);
      }
      fetchKategori();
      handleFormKategoriClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/kategori/${id}`);
      fetchKategori();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <KategoriWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Kategori Buku</h3>
        </BlockTitle>
        <button type="button" className="export-btn" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: '5px' }} />
          <span className="text">Add</span>
        </button>
      </div>

      <FormKategori
        open={isFormKategoriOpen}
        handleClose={handleFormKategoriClose}
        onSubmit={handleFormSubmit}
        category={currentCategory}
      />

      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Kategori</th>
              <th>Jumlah Buku</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {kategori.map((category, index) => (
              <tr key={category.id_kategori}>
                <td>{index + 1}</td>
                <td>{category.nama_kategori}</td>
                <td>{category.jumlah_buku}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(category)}
                    title="Edit"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                  >
                    <FaEdit style={{ color: '#F77D00', marginRight: '5px' }} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id_kategori)}
                    title="Delete"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <FaTrash style={{ color: '#F77D00' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </KategoriWrap>
  );
};

export default Kategori;
