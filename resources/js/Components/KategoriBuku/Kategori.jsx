import React, { useState, useEffect } from 'react';
import { BlockTitle } from "../../styles/global/default";
import { KategoriWrap } from "./Kategori.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormKategori from '../FormKategori';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Delete from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';


const Kategori = ({setPageTitle}) => {
  setPageTitle('Kategori Buku')
  const [kategori, setKategori] = useState([]);
  const [isFormKategoriOpen, setIsFormKategoriOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filteredKategori, setFilteredKategori] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/kategori`;
    //   console.log('Fetching from URL:', url);
      const response = await axios.get(url);
      setKategori(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';

    // Jika searchQuery kosong, tampilkan semua data
    if (searchQuery === '') {
        setFilteredKategori(kategori);
      } else {
        // Filter data berdasarkan nama kategori
        const filteredData = kategori.filter(kategori =>
          kategori.nama_kategori?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredKategori(filteredData); // Update state untuk menampilkan hasil filter
      }
  }, [location.search, kategori]);

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
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Kategori ini akan dihapus !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F9A01B',
        cancelButtonColor: '#20326A',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
      }).then(async (result) => {
        if (result.isConfirmed) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/kategori/${id}`);
      fetchKategori();
      Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus kategori.', 'error');
    }
        }
  });
};

  const deleteAll = () => {
    const ids = selectedRows.map(row => row.id_kategori);

    if (window.confirm(`Are you sure you want to delete ${ids.length} kategoris?`)) {
      ids.forEach(id => handleDelete(id));
      setToggleCleared(!toggleCleared);
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      name: 'Nama Kategori',
      selector: row => row.nama_kategori,
      sortable: true,
    },
    {
      name: 'Jumlah Buku',
      selector: row => row.jumlah_buku,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton onClick={() => handleEditClick(row)} title="Edit">
            <FaEdit style={{ color: '#F77D00' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id_kategori)} title="Delete">
            <FaTrash style={{ color: '#F77D00' }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <KategoriWrap>
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

      <FormKategori
        open={isFormKategoriOpen}
        handleClose={handleFormKategoriClose}
        onSubmit={handleFormSubmit}
        category={currentCategory}
      />

<DataTable
        // title="Data Pengguna"
        columns={columns}
        data={filteredKategori}
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

    </KategoriWrap>
  );
};

export default Kategori;
