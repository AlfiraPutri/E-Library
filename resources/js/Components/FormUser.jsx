import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';  // Jangan lupa impor axios

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#F77D00',
  color: theme.palette.getContrastText('#F77D00'),
  padding: theme.spacing(2),
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: '#F77D00',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#e66c00',
  },
}));

const CustomCancelButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#F77D00',
  border: `1px solid #F77D00`,
  '&:hover': {
    backgroundColor: '#FFF3E0',
  },
}));

const PreviewImage = styled('img')({
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,

    objectFit: 'cover',
    margin: '10px 0',
    display: 'block',
  });

  const GridContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Dua kolom yang sama besar
    gap: '20px', // Jarak antara kolom

  });


export default function FormUser({ open, handleClose, onSubmit, users, fetchUser }) {
  const [formData, setFormData] = React.useState({
    nama: users ? users.nama : '',
    nip: users ? users.nip : '',
    jenis_kelamin: users ? users.jenis_kelamin : '',
    tanggal_lahir: users ? users.tanggal_lahir : '',
    alamat: users ? users.alamat : '',
    jabatan: users ? users.jabatan : '',
    email: users ? users.email : '',
    username: users ? users.username : '',
    password: users ? users.password : '',
    role: users ? users.role : '', // Ensure role is initialized
    img_user: null,
  });

  React.useEffect(() => {
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
      password: users.password || '', // Pastikan password diisi
      role: users.role || '',
      img_user: users.img_user || '',
      });
    } else {
        // Jika tidak ada users, artinya mode Add, reset formData
        setFormData({
          nama: '',
          nip: '',
          jenis_kelamin: '',
          tanggal_lahir: '',
          alamat: '',
          jabatan: '',
          email: '',
          username: '',
          password: '',
          role: '',
          img_user: null,
        });
        setPreview(null); // Reset preview jika membuka form tambah user
      }

  }, [users]);

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        img_user: file,
      });
      setPreview(URL.createObjectURL(file));
    } else {
        setPreview(null); // Reset preview if no file is selected
      }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (users) {
        data.append('id_users', users.id_users);  // Tambahkan id_users untuk identifikasi saat update
      }
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'img_buku') {
            if (value instanceof File) {
              data.append(key, value);
            }
          } else {
            data.append(key, value);
          }
        });

        // Kirim password hanya jika ada input yang diisi
        if (formData.password) {
            data.append('password', formData.password);
        }


        try {
            if (users) {
                // Mode edit
                await axios.post(`http://127.0.0.1:8000/api/user/${users.id_users}`, data, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Data berhasil diperbarui!');
            } else {
            await axios.post('http://127.0.0.1:8000/api/user', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Data berhasil ditambahkan!');
        }
           //  onSubmit(formData);
           fetchUser();
            handleClose();

        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                alert('Submission error: ' + JSON.stringify(error.response.data));
            } else {
                console.error('Error submitting form:', error);
            }
        }
    console.log(formData);
 //   onSubmit(formData);
    handleClose(); // Close the form dialog after submission
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md"
    PaperProps={{
        style: {
          borderRadius: '20px', // Mengatur border-radius sesuai kebutuhan
        },
      }}>
      <CustomDialogTitle>{users ? 'Edit User' : 'Tambah User'}</CustomDialogTitle>
      <CustomDialogContent>
        <DialogContentText>
          Please fill in the following details to {users ? 'edit' : 'add'} a user.
        </DialogContentText>
        <TextField
        margin="dense"
          accept="image/*"
          type="file"
          id="img_user"
          name="img_user"
          label="Upload Gambar Profil"
          fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          onChange={handleImageChange}
          style={{ margin: '10px 0' }}
        />

        {/* Image Preview */}
        {preview && (
          <PreviewImage src={preview} />
        )}

<GridContainer>

        <TextField
          autoFocus
          required
          margin="normal"
          id="nama"
          name="nama"
          label="Nama"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nama}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="nip"
          name="nip"
          label="NIP"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nip}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="jenis_kelamin"
          name="jenis_kelamin"
          label="Jenis Kelamin"
          select
          fullWidth
          variant="outlined"
          value={formData.jenis_kelamin}
          onChange={handleChange}
        >
          <MenuItem value="Laki-laki">Laki-laki</MenuItem>
          <MenuItem value="Perempuan">Perempuan</MenuItem>
        </TextField>
        <TextField
          required
          margin="normal"
          id="tanggal_lahir"
          name="tanggal_lahir"
          label="Tanggal Lahir"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.tanggal_lahir}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          margin="normal"
          id="alamat"
          name="alamat"
          label="Alamat"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.alamat}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="jabatan"
          name="jabatan"
          label="Jabatan"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.jabatan || ''}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="username"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="role"
          name="role"
          label="Role"
          select
          fullWidth
          variant="outlined"
          value={formData.role || ''} // Ensure value is not undefined
          onChange={handleChange}
        >
          <MenuItem value="pegawai">Pegawai</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <TextField
          required
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.password || ''}
          onChange={handleChange}
        />
        </GridContainer>
      </CustomDialogContent>
      <DialogActions>
        <CustomCancelButton onClick={handleClose}>
          Cancel
        </CustomCancelButton>
        <CustomButton type="submit" onClick={handleSubmit} variant="contained">
          {users ? 'Update User' : 'Add User'}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
