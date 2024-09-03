import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlockTitle } from "../../styles/global/default";  // Disesuaikan dengan lokasi file
import { DataUsersWrap } from "./DataUsers.styles";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FormUser from '../FormUser'; // Pastikan jalur file benar

const DataUsers = () => {
  const [pengguna, setUser] = useState([]);
  const [isFormUserOpen, setIsFormUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleAddClick = () => {
    setCurrentUser(null);  // Reset current user before showing the form
    setIsFormUserOpen(true);
  };

//   const handleEditClick = (users) => {
//     setCurrentUser(users);
//     setIsFormUserOpen(true);
//   };

  const handleFormUserClose = () => {
    setIsFormUserOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentUser) {
        await axios.put(`http://127.0.0.1:8000/api/user/${currentUser.id_users}`, formData);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/user`, formData);
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
      fetchUser();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <DataUsersWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Data Users</h3>
        </BlockTitle>
        <button type="button" className="export-btn" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: '5px' }} />
          <span className="text">Add</span>
        </button>
      </div>

      <FormUser
        open={isFormUserOpen}
        handleClose={handleFormUserClose}
        onSubmit={handleFormSubmit}
        users={currentUser} />

      <div className="tbl-products">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>NIP</th>
              {/* <th>Jenis Kelamin</th>
              <th>Tanggal Lahir</th>
              <th>Alamat</th>
              <th>Jabatan</th>
              <th>Email</th> */}
              <th>Username</th>
              <th>Role</th>
              {/* <th>Created At</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pengguna.map((users, index) => (
              <tr key={users.id_users}>
                <td>{index + 1}</td>
                <td>{users.nama}</td>
                <td>{users.nip}</td>
                {/* <td>{users.jenis_kelamin}</td>
                <td>{users.tanggal_lahir}</td>
                <td>{users.alamat}</td>
                <td>{users.jabatan}</td>
                <td>{users.email}</td> */}
                <td>{users.username}</td>
                <td>{users.role}</td>
                {/* <td>{users.created_at}</td> */}
                <td>
                <a
                href={`/dashboard/user/edit/${users.id_users}`}
                title="Edit"
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '20px' }}
                >
                <FaEdit style={{ color: '#F77D00', marginRight: '10px' }} />
                </a>

                <button
                    onClick={() => handleDelete(users.id_users)}
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
      </div>
    </DataUsersWrap>
  );
};

export default DataUsers;
