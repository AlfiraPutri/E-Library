import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ProfileWrap, ProfileCard, Form, InputGroup, Label, Input, Button, ErrorMessage,
  ProfileImage, UploadButton, TwoCardContainer, Card, Title
} from './Profile.styles';
import ChangePasswordForm from '../Components/FormPassword';
import { useSelector } from 'react-redux';

const Profile = ({ auth }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    jabatan: '',
    jenis_kelamin: '',
    alamat: '',
    tanggal_lahir: '',
    email: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [users, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${auth.user.id_users.toString()}/show`);
        const userData = response.data; // Set user data

        setFormData((prevData) => ({
            ...prevData,
            nama: userData.nama || '',
            nip: userData.nip || '',
            jabatan: userData.jabatan || '',
            jenis_kelamin: userData.jenis_kelamin || '',
            alamat: userData.alamat || '',
            tanggal_lahir: userData.tanggal_lahir || '',
            email: userData.email || '',
            username: userData.username || '',
            password: userData.password || '',
            profilePicture: userData.img_user || null,
          }));
          setPreview(userData.img_user ? `http://127.0.0.1:8000${userData.img_user}` : null);
          setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Terjadi kesalahan saat memuat data pengguna.");
      }
    };

    fetchUserData();
  }, [auth.user.id_users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
        console.log("Passwords do not match");
      setError('Password baru dan konfirmasi password tidak sama!');
      return;
    }

    try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'profilePicture') {
              if (value instanceof File) {
                data.append('img_user', value);
              }
            } else {
              data.append(key, value);
            }
          });

          if (auth.user) {
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${auth.user.id_users}`, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

          console.log('Profile updated successfully:', response);
      alert('Profile updated successfully!');
      setError('');

        console.log("🚀 ~ handleSaveChanges ~ response:", response);

    // console.log(formData);

    // alert('Profile updated successfully!');
    // setError('');
    // setFormData({
    //   nama: '',
    //   nip: '',
    //   jabatan: '',
    //   jenisKelamin: '',
    //   alamat: '',
    //   tglLahir: '',
    //   email: '',
    //   username: '',
    //   oldPassword: '',
    //   newPassword: '',
    //   confirmPassword: '',
    //   profilePicture: null,
    // });
    setPreview(null);
        } else {
            setError('Tidak ada data pengguna yang tersedia.');
    }
  } catch (error) {
    console.error("Error updating profile", error);
    setError('Terjadi kesalahan saat memperbarui profil');
  }

};

const handlePasswordToggle = () => {
    setShowPasswordForm(!showPasswordForm); // Mengubah state untuk menampilkan atau menyembunyikan form password
  };

  const handlePasswordSubmit = (passwordData) => {
    // Handle password update logic here
    console.log('Password Data:', passwordData);
    // Example: Post password data to the server
  };

  return (
    <ProfileWrap>
      <ProfileCard>
        {/* <h2>Update Profile</h2> */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ProfileImage>
          {preview ? (
            <img src={preview} alt="Profile Preview" />
          ) : formData.profilePicture ? (
            <img src={`http://127.0.0.1:8000${formData.profilePicture}`} />
          )  : (
          <p>Gambar profil belum diunggah</p>
        )}
        </ProfileImage>
        <UploadButton type="file" accept="image/*" onChange={handleFileChange} />
      </ProfileCard>

      <TwoCardContainer>
        {/* Informasi Umum Card */}
        <Card>
        <Title>Informasi Umum</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Nama</Label>
              <Input type="text" name="nama" value={formData.nama} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>NIP</Label>
              <Input type="text" name="nip" value={formData.nip} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Jabatan</Label>
              <Input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Jenis Kelamin</Label>
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                <option value="" disabled></option>
                <option value="Laki-laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </InputGroup>
            <InputGroup>
              <Label>Alamat</Label>
              <Input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Tanggal Lahir</Label>
              <Input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
            </InputGroup>
          </Form>
        </Card>

        {/* Informasi Akun Card */}
        <Card>
        <Title>Informasi Akun</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>Username</Label>
              <Input type="text" name="username" value={formData.username} onChange={handleChange} />
            </InputGroup>

            {/* Tombol untuk menampilkan form password */}
            <InputGroup>
            <Label>Password </Label>
            <Button type="button" onClick={handlePasswordToggle}>
              Ubah Password
            </Button>
            </InputGroup>
            {/* <InputGroup>
              <Label>Password </Label>
              <Input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
            </InputGroup> */}

           {/* Popup password form */}


            <Button type="submit">Update Profile</Button>
          </Form>
        </Card>
      </TwoCardContainer>
      {/* Popup form untuk password */}
      <ChangePasswordForm
        open={showPasswordForm}
        handleClose={handlePasswordToggle}
        onSubmit={handlePasswordSubmit}
        auth={users}
      />
    </ProfileWrap>
  );
};

export default Profile;
