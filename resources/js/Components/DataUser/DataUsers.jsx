import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlockTitle } from "../../styles/global/default";  // Disesuaikan dengan lokasi file
import { DataUsersWrap } from "./DataUsers.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormUser from '../FormUser'; // Pastikan jalur file benar
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';


const DataUsers = ({ setPageTitle }) => {
//  setPageTitle('Data Pengguna');
  const [pengguna, setUser] = useState([]);
  const [filteredPengguna, setFilteredPengguna] = useState([]);
  const [isFormUserOpen, setIsFormUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Update title hanya di dalam useEffect
    setPageTitle('Daftar User');
  }, [setPageTitle]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';

    if (searchQuery === '') {
      setFilteredPengguna(pengguna);
    } else {
      const filteredData = pengguna.filter(users =>
        users.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(users.nip || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        users.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPengguna(filteredData);
    }
  }, [location.search, pengguna]);

  const handleAddClick = () => {
    setCurrentUser(null);
    setIsFormUserOpen(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsFormUserOpen(true);
  };

  const handleFormUserClose = () => {
    setIsFormUserOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentUser) {
        await axios.put(`http://127.0.0.1:8000/api/user/${currentUser.id_users}`, formData);
        alert('Data berhasil diperbarui!');

      } else {
        await axios.post(`http://127.0.0.1:8000/api/user`, formData);
        alert('Data berhasil ditambahkan!');
      }
      fetchUser();
      handleFormUserClose();
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
      alert('Data berhasil dihapus!');
      fetchUser();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteAll = () => {
    const ids = selectedRows.map(row => row.id_users);

    if (window.confirm(`Are you sure you want to delete ${ids.length} users?`)) {
      ids.forEach(id => handleDelete(id));
      setToggleCleared(!toggleCleared);
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      name: 'Nama',
      selector: row => row.nama,
      sortable: true,
    },
    {
      name: 'NIP',
      selector: row => row.nip,
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
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
                handleDelete(row.id_users);
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
    <DataUsersWrap>
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

      <FormUser
        open={isFormUserOpen}
        handleClose={handleFormUserClose}
        onSubmit={handleFormSubmit}
        users={currentUser}
        fetchUser={fetchUser}
      />

      <DataTable
        // title="Data Pengguna"
        columns={columns}
        data={filteredPengguna}
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
    </DataUsersWrap>
  );
};

export default DataUsers;
