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

export default function FormUser({ open, handleClose, onSubmit, users }) {
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
    role: users ? users.role : '' // Ensure role is initialized
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
      role: users.role || ''
      });
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
    handleClose(); // Close the form dialog after submission
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <CustomDialogTitle>{users ? 'Edit User' : 'Tambah User'}</CustomDialogTitle>
      <CustomDialogContent>
        <DialogContentText>
          Please fill in the following details to {users ? 'edit' : 'add'} a user.
        </DialogContentText>
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
