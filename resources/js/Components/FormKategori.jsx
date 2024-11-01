import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: '#f1f1f1',
      padding: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#555',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #F77D00',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #e66c00',
    },
    '& .Mui-focused .MuiInputLabel-root': {
      color: '#F77D00',
    },
  });


export default function FormKategori({ open, handleClose, onSubmit, category }) {
  const [formData, setFormData] = React.useState({
    nama_kategori: category ? category.nama_kategori : '',
    jumlah_buku: category ? category.jumlah_buku : 0
  });

  React.useEffect(() => {
    if (category) {
      setFormData({
        nama_kategori: category.nama_kategori,
        jumlah_buku: category.jumlah_buku
      });
    } else {
        setFormData({
          nama_kategori: '',
          jumlah_buku: 0
        });
    }
  }, [category, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  // Convert jumlah_buku to integer
//   const formDataWithInteger = {
//     ...formData,
//     jumlah_buku: parseInt(formData.jumlah_buku, 10),
//   };
  onSubmit(formData);
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <CustomDialogTitle>{category ? 'Edit Kategori' : 'Tambah Kategori'}</CustomDialogTitle>
      <CustomDialogContent>
        <DialogContentText>
          Silakan isi detail berikut untuk {category ? 'mengedit' : 'menambahkan'} kategori.
        </DialogContentText>
        <CustomTextField
          autoFocus
          required
          margin="dense"
          name="nama_kategori"
          label="Nama Kategori"
          type="text"
          fullWidth
          variant="standard"
          value={formData.nama_kategori}
          onChange={handleChange}
        />
        {/* <TextField
          required
          margin="dense"
          name="jumlah_buku"
          label="Jumlah Buku"
          type="number"
          fullWidth
          variant="standard"
          value={formData.jumlah_buku}
          readOnly
        /> */}
      </CustomDialogContent>
      <DialogActions>
        <CustomCancelButton onClick={handleClose}>Cancel</CustomCancelButton>
        <CustomButton type="submit" onClick={handleSubmit}>Submit</CustomButton>
      </DialogActions>
    </Dialog>
  );
}
