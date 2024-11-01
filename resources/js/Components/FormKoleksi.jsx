import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { styled } from '@mui/material/styles';


const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: '#F77D00',
    color: theme.palette.getContrastText('#F77D00'),
    padding: theme.spacing(2),
  }));

  // Custom styling for dialog content
  const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
  }));

  // Custom styling for the submit button
  const CustomButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: '#F77D00',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#e66c00',
    },
  }));

  // Custom styling for the cancel button
  const CustomCancelButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    color: '#F77D00',
    border: `1px solid #F77D00`,
    '&:hover': {
      backgroundColor: '#FFF3E0',
    },
  }));

  const GridContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Dua kolom yang sama besar
    gap: '20px', // Jarak antara kolom

  });

  // Main form component
  export default function FormKoleksi({ open, handleClose, onSubmit, buku }) {
    // Form data state
    const [formData, setFormData] = React.useState({
      judul: buku ? buku.judul : '',
      isbn: buku ? buku.isbn : '',
      pengarang: buku ? buku.pengarang : '',
      penerbit: buku ? buku.penerbit : '',
      tanggal_terbit: buku ? buku.tanggal_terbit : '',
      jumlah_buku: buku ? buku.jumlah_buku : '',
      id_kategori: buku ? buku.id_kategori : '',
      deskripsi: buku ? buku.deskripsi : '',
      jumlah_halaman: buku ? buku.jumlah_halaman : '',
      file_upload: null,
      img_buku: null,
    });

    // Categories state
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch categories on component mount
    React.useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/kategori');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }, []);



    // Update form data when buku changes
    React.useEffect(() => {
      if (buku) {
        setFormData({
          judul: buku.judul,
          isbn: buku.isbn,
          pengarang: buku.pengarang,
          penerbit: buku.penerbit,
          tanggal_terbit: buku.tanggal_terbit,
          jumlah_buku: buku.jumlah_buku,
          id_kategori: buku.id_kategori,
          deskripsi: buku.deskripsi,
          jumlah_halaman: buku.jumlah_halaman,
          file_upload: buku.file_upload,
          img_buku: buku.img_buku,
        });
      }
    }, [buku]);

    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log("🚀 ~ handleChange ~ formData:", formData)
    };

    // Handle file input change
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      const file = files[0];

      if (name === 'file_upload' && file && file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        e.target.value = ''; // Clear the input
      } else if (name === 'img_buku' && file) {
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
          alert('File must be of type: jpeg, png, jpg, gif.');
          e.target.value = ''; // Clear the file input
        } else {
            setFormData({ ...formData, [name]: file });
        }
      } else {
        setFormData({ ...formData, [name]: file });
      }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 ~ handleSubmit ~ formData:", formData);

        if (loading) return; // Prevent submission if already loading

        setLoading(true); // Set loading state to true
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'file_upload' || key === 'img_buku') {
            if (value) {
              data.append(key, value);
            }
          } else {
            data.append(key, value);
          }
        });

        console.log([...data.entries()]); // Log FormData entries

        try {
            await axios.post('http://127.0.0.1:8000/api/buku', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

           //  onSubmit(formData);
            handleClose();

        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                alert('Submission error: ' + JSON.stringify(error.response.data));
            } else {
                console.error('Error submitting form:', error);
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };




  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md"
    PaperProps={{
        style: {
          borderRadius: '20px', // Mengatur border-radius sesuai kebutuhan
        },
      }}>
      <CustomDialogTitle>{buku ? 'Edit Koleksi' : 'Tambah Koleksi'}</CustomDialogTitle>
      <CustomDialogContent>
          <DialogContentText>
            Silakan isi detail berikut untuk {buku ? 'mengubah' : 'menambahkan'} koleksi buku.
          </DialogContentText>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
          <GridContainer>
          <TextField
            autoFocus
            required
            margin="dense"
            id="judul"
            name="judul"
            label="Judul Buku"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.judul}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="isbn"
            name="isbn"
            label="ISBN"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.isbn}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="jumlah_buku"
            name="jumlah_buku"
            label="Jumlah Buku"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.jumlah_buku}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="id_kategori"
            name="id_kategori"
            label="Kategori"
            select
            fullWidth
            variant="outlined"
            value={formData.id_kategori}
            onChange={handleChange}
          >
            {Array.isArray(categories) && categories.map((category) => (
              <MenuItem key={category.id_kategori} value={category.id_kategori}>
                {category.nama_kategori}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            id="tanggal_terbit"
            name="tanggal_terbit"
            label="Tanggal Terbit"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.tanggal_terbit}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="pengarang"
            name="pengarang"
            label="Pengarang"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.pengarang}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="penerbit"
            name="penerbit"
            label="Penerbit"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.penerbit}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="deskripsi"
            name="deskripsi"
            label="Deskripsi"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.deskripsi}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="jumlah_halaman"
            name="jumlah_halaman"
            label="Jumlah Halaman"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.jumlah_halaman}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="img_buku"
            name="img_buku"
            label="Upload Cover Buku"
            type="file"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <TextField
            margin="dense"
            id="file_upload"
            name="file_upload"
            label="Upload File PDF"
            type="file"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            accept=".pdf,.epub"
            onChange={handleFileChange}
          />

        <DialogActions>
        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <CustomCancelButton onClick={handleClose}>Batal</CustomCancelButton>
          <CustomButton type="submit">Submit</CustomButton>
          </div>

        </DialogActions>
        </GridContainer>

        </form>
        </CustomDialogContent>
    </Dialog>
  );
}
