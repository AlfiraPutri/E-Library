import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan axios diimpor
import { BlockTitle } from "../../styles/global/default";
import { KoleksiWrap } from "./Koleksi.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormKoleksi from "../FormKoleksi";


const Koleksi = () => {
  const [bukus, setBukus] = useState([]);
  const [isFormKoleksiOpen, setIsFormKoleksiOpen] = useState(false);
  const [currentBuku, setCurrentBuku] = useState(null);


  useEffect(() => {
    fetchBukus();
  }, [isFormKoleksiOpen]);

  const fetchBukus = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/buku`);
      console.log('Fetched data:', response.data);
      setBukus(response.data);
      console.log('Updated bukus state:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddClick = () => {
    setCurrentBuku(null); // Reset current buku before showing the form
    setIsFormKoleksiOpen(true);
  };

//   const handleEditClick = (buku) => {
//     history.push(`/dashboard/buku/edit/${buku.id_buku}`); // Redirect to the edit page with the book ID
//   };


  const handleFormKoleksiClose = () => {
    setIsFormKoleksiOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentBuku) {
        await axios.put(`http://127.0.0.1:8000/api/buku/${currentBuku.id_buku}`, formData);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/buku`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('API response after adding book:', response.data);
      }
      // Memanggil fetchBukus untuk memperbarui daftar buku
     fetchBukus();
     handleFormKoleksiClose();
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            alert('Submission error: ' + JSON.stringify(error.response.data));
          } else {
            console.error('Error submitting form:', error.message);
          }
        }
    }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/buku/${id}`);
      fetchBukus();
    } catch (error) {
      console.error('Error deleting buku:', error);
    }
  };

  return (
    <KoleksiWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Koleksi Buku</h3>
        </BlockTitle>
        <button className="export-btn" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: '5px' }} />
          <span className="text">Add</span>
        </button>
      </div>

      <FormKoleksi
      open={isFormKoleksiOpen}
      handleClose={handleFormKoleksiClose}
      onSubmit={handleFormSubmit}
      buku={currentBuku} />

      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>ISBN</th>
              <th>Pengarang</th>
              {/* <th>Penerbit</th>
              <th>Tanggal Terbit</th>
              <th>Jumlah Buku</th>
              <th>Kategori</th>
              <th>Deskripsi</th>
              <th>Jumlah Halaman</th>
              <th>File</th>
              <th>Gambar</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bukus.map((buku, index) => (
              <tr key={buku.id_buku}>
                <td>{index + 1}</td>
                <td>{buku.judul}</td>
                <td>{buku.isbn}</td>
                <td>{buku.pengarang}</td>
                {/* <td>{buku.penerbit}</td>
                <td>{buku.tanggal_terbit}</td>
                <td>{buku.jumlah_buku}</td>
                <td>{buku.kategori_buku}</td>
                <td>{buku.deskripsi}</td>
                <td>{buku.jumlah_halaman}</td>
                <td>{buku.file_upload}</td>
                <td>{buku.img_buku}</td> */}
                <td>
                <a
                href={`/dashboard/buku/edit/${buku.id_buku}`}
                title="Edit"
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '20px' }}
                >
                <FaEdit style={{ color: '#F77D00', marginRight: '10px' }} />
                </a>

                <button
                onClick={() => handleDelete(buku.id_buku)}
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
    </KoleksiWrap>
  );
};

export default Koleksi;
