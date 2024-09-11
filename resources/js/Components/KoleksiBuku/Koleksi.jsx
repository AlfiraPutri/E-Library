import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan axios diimpor
import { BlockTitle } from "../../styles/global/default";
import { KoleksiWrap } from "./Koleksi.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormKoleksi from "../FormKoleksi";
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Delete from '@mui/icons-material/Delete';

const Koleksi = ({ setPageTitle }) => {
  setPageTitle('Daftar Buku')
  const [bukus, setBukus] = useState([]);
  const [isFormKoleksiOpen, setIsFormKoleksiOpen] = useState(false);
  const [currentBuku, setCurrentBuku] = useState(null);
  const [filteredBuku, setFilteredBuku] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';

    // Jika searchQuery kosong, tampilkan semua data
    if (searchQuery === '') {
      setFilteredBuku(bukus);
    } else {
      // Filter data berdasarkan nama, NIP, atau username
      const filteredData = bukus.filter(buku =>
        buku.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(buku.isbn || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        buku.pengarang?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredBuku(filteredData); // Update state untuk menampilkan hasil filter
    }
  }, [location.search, bukus]);

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

  const deleteAll = () => {
    const ids = selectedRows.map(row => row.id_buku);

    if (window.confirm(`Are you sure you want to delete ${ids.length} bukus?`)) {
      ids.forEach(id => handleDelete(id));
      setToggleCleared(!toggleCleared);
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      name: 'Judul',
      selector: row => row.judul,
      sortable: true,
    },
    {
      name: 'ISBN',
      selector: row => row.isbn,
      sortable: true,
    },
    {
      name: 'Pengarang',
      selector: row => row.pengarang,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton onClick={() => handleEditClick(row)} title="Edit">
            <FaEdit style={{ color: '#F77D00' }} />
          </IconButton>
          <IconButton onClick={() => {
              if (window.confirm('Are you sure you want to delete this data?')) {
                handleDelete(row.id_buku);
              }
            }}
            title="Delete">

            <FaTrash style={{ color: '#F77D00' }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <KoleksiWrap>
      <div className="block-head">
        <button type="button" className="export-btn" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: '5px' }} />
          <span className="text">Add</span>
        </button>

        {selectedRows.length > 0 && (
          <IconButton color="secondary" onClick={deleteAll}>
            <Delete />
          </IconButton>
        )}
      </div>

      <FormKoleksi
      open={isFormKoleksiOpen}
      handleClose={handleFormKoleksiClose}
      onSubmit={handleFormSubmit}
      buku={currentBuku} />

<DataTable
        // title="Data Pengguna"
        columns={columns}
        data={filteredBuku}
        defaultSortFieldId={1}
        highlightOnHover
        pagination
        customStyles={{
            headCells: {
              style: {
                backgroundColor: '#F77D00',  // Warna oranye untuk header
                color: '#ffffff',            // Warna teks putih
                fontSize: '16px',            // Ukuran font
                fontWeight: 'bold',          // Tebal font
                padding: '10px',             // Jarak di dalam header
              },
            },
          }}
        selectableRows
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={{ indeterminate: isIndeterminate => isIndeterminate }}
        onSelectedRowsChange={state => setSelectedRows(state.selectedRows)}
        clearSelectedRows={toggleCleared}
        sortIcon={<ArrowDownward />}
      />
    </KoleksiWrap>
  );
};

export default Koleksi;
