import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import StarRatings from 'react-star-ratings'; // Import the StarRatings component

export default function FormReview({ open, handleClose, onSubmit, review }) {
  const [formData, setFormData] = React.useState({
    username: review ? review.username : '',
    judul_buku: review ? review.judul_buku : '',
    rating: review ? review.rating : 1, // Default rating is 1
    review_text: review ? review.review_text : '',
  });

  const [pengguna, setUsers] = React.useState([]);
  const [bukus, setBuku] = React.useState([]);

  React.useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  React.useEffect(() => {
    // Fetch buku from API
    const fetchBuku = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buku');
        setBuku(response.data);
      } catch (error) {
        console.error('Error fetching buku:', error);
      }
    };

    fetchBuku();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (nextValue) => {
    setFormData({ ...formData, rating: nextValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{review ? 'Edit Review' : 'Tambah Review'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Silakan isi detail berikut untuk {review ? 'mengedit' : 'menambahkan'} ulasan.
        </DialogContentText>
        <TextField
          required
          margin="dense"
          id="username"
          name="username"
          label="Username"
          select
          fullWidth
          variant="standard"
          value={formData.username}
          onChange={handleChange}
        >
          {pengguna.map((user) => (
            <MenuItem key={user.id_users} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          margin="dense"
          id="judul_buku"
          name="judul_buku"
          label="Buku"
          select
          fullWidth
          variant="standard"
          value={formData.judul_buku}
          onChange={handleChange}
        >
          {bukus.map((buku) => (
            <MenuItem key={buku.id_buku} value={buku.judul}>
              {buku.judul}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: 16 }}>
          <label>Rating:</label>
          <StarRatings
            rating={formData.rating}
            starRatedColor="orange"
            changeRating={handleStarClick}
            numberOfStars={5}
            name='rating'
          />
        </div>
        <TextField
          required
          margin="dense"
          name="review_text"
          label="Komentar"
          type="text"
          fullWidth
          variant="standard"
          value={formData.review_text}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
