import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    }
  }, [category]);

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
      <DialogTitle>{category ? 'Edit Kategori' : 'Tambah Kategori'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Silakan isi detail berikut untuk {category ? 'mengedit' : 'menambahkan'} kategori.
        </DialogContentText>
        <TextField
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
