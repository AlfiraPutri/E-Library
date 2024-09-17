import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

export default function ChangePasswordForm({ open, handleClose, onSubmit }) {
  const [formData, setFormData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
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
          id="oldPassword"
          name="oldPassword"
          label="Password Lama"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.oldPassword}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="newPassword"
          name="newPassword"
          label="Password Baru"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <TextField
          required
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          label="Konfirmasi Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </CustomDialogContent>
      <DialogActions>
        <CustomCancelButton onClick={handleClose}>
          Cancel
        </CustomCancelButton>
        <CustomButton onClick={handleSubmit} variant="contained">
          Ubah Password
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
