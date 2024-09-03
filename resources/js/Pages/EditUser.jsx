import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { SettingsContainer, ProfileSection, ProfileImage, FormField, FormSection, ButtonContainer } from './EditBuku.styles';

const EditUserPage = () => {
    const params = useParams();
    const { id } = params;

    // State untuk user dan form data
    const [users, setUser] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        nip: '',
        jenis_kelamin: '',
        tanggal_lahir:'',
        alamat: '',
        jabatan: '',
        email: '',
        username: '',
        password: '',
        role: ''
        });

    // Fetch data buku berdasarkan ID pada saat komponen mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}/show`);
                console.log('Fetched user data:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        if (users) {
            setFormData({
                nama: users.nama || '',
                nip: users.nip || '',
                jenis_kelamin: users.jenis_kelamin || '',
                tanggal_lahir: users.tanggal_lahir || '',
                alamat: users.alamat || '',
                jabatan: users.jabatan || '',
                email: users.email || '',
                username: users.username || '',
                password: users.password || '',
                role: users.role || '',
            });
        }
    }, [users]);


    // Handle perubahan input form
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    // Menyimpan perubahan
    const handleSaveChanges = async () => {
        try {
            console.log("🚀 ~ handleSaveChanges ~ formData:", formData)
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            // Update user yang ada
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${id}/edit`, formDataToSend, {
                // headers: { 'Content-Type': 'multipart/form-data' } // Pastikan headernya sesuai jika menggunakan FormData
            });
            console.log("🚀 ~ handleSaveChanges ~ response:", response);
            console.log('Changes saved');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };


    // Menghapus buku
    // const handleDeleteBook = async () => {
    //     try {
    //         if (buku) {
    //             await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
    //             console.log('User deleted');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // };

    return (
        <SettingsContainer>
            <ProfileSection>

                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #ccc',
                    }}>
                        <img
                            // src={formData.img_user}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    {/* <input
                        type="file"
                        name="img_user"
                        accept="image/*"
                        onChange={handleFileChange}
                    /> */}

            </ProfileSection>

            <FormSection>
                <FormField>
                    <label>Nama</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>NIP</label>
                    <input
                        type="text"
                        name="nip"
                        value={formData.nip}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                <label>Jenis Kelamin</label>
                <select
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Wanita">Wanita</option>
                </select>
            </FormField>

                <FormField>
                    <label>Tanggal Lahir</label>
                    <input
                        type="date"
                        name="tanggal_lahir"
                        value={formData.tanggal_lahir}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Alamat</label>
                    <input
                        type="text"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Jabatan</label>
                    <input
                        type="text"
                        name="jabatan"
                        value={formData.jabatan}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="pegawai">Pegawai</option>
                    </select>
                </FormField>
                <ButtonContainer>
                    <button onClick={handleSaveChanges}>Save Changes</button>

                </ButtonContainer>
            </FormSection>
        </SettingsContainer>
    );
};

export default EditUserPage;
