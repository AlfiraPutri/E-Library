import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

export default function ChangePasswordForm({ open, handleClose, onSubmit, auth }) {
  const [formData, setFormData] = React.useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async (passwordData) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/user/${auth.id_users}/change-password`, {
          password: passwordData.password,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        });

        if (response.status === 200) {
          alert('Password berhasil diubah!');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        if (error.response) {
            alert('Error: ' + error.response.data.message); // Menampilkan pesan error dari server
          } else {
            alert('Terjadi kesalahan saat mengubah password.');
      }
    }
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <CustomDialogTitle>Ubah Password</CustomDialogTitle>
      <CustomDialogContent>
        <TextField
          autoFocus
          required
          margin="normal"
          id="password"
          name="password"
          label="Password Lama"
          type={showPassword.password ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleShowPassword('password')}
                  edge="end"
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          margin="normal"
          id="newPassword"
          name="newPassword"
          label="Password Baru"
          type={showPassword.newPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={formData.newPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleShowPassword('newPassword')}
                  edge="end"
                >
                  {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          label="Konfirmasi Password"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleShowPassword('confirmPassword')}
                  edge="end"
                >
                  {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CustomDialogContent>
      <DialogActions>
        <CustomCancelButton onClick={handleClose}>
          Cancel
        </CustomCancelButton>
        <CustomButton onClick={() => handleSubmit(formData)} variant="contained">
          Ubah Password
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
