import React, { useState } from 'react';
import { ProfileWrap, Form, InputGroup, Label, Input, Button, ErrorMessage, ProfileImage, UploadButton } from './Profile.styles';

const Profile = () => {
    const [formData, setFormData] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      profilePicture: null
    });

    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);

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

    const handleSubmit = (e) => {
      e.preventDefault();
      const { oldPassword, newPassword, confirmPassword } = formData;

      if (newPassword !== confirmPassword) {
        setError('Password baru dan konfirmasi password tidak sama!');
        return;
      }

      // Lakukan logika untuk mengganti password dan meng-upload gambar di sini
      console.log(formData);
      setError('');
      alert('Password dan gambar berhasil diperbarui!');
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        profilePicture: null
      });
      setPreview(null);
    };

    return (
      <ProfileWrap>
        <h2>Update Profile</h2>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputGroup>
           
            <ProfileImage>
              {preview ? <img src={preview} alt="Profile Preview" /> : <p>Gambar profil</p>}
            </ProfileImage>
            <UploadButton type="file" accept="image/*" onChange={handleFileChange} />
          </InputGroup>

          <InputGroup>
            <Label>Password Lama</Label>
            <Input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Masukkan password lama"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password Baru</Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Masukkan password baru"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Konfirmasi Password Baru</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi password baru"
              required
            />
          </InputGroup>
          <Button type="submit">Update Profile</Button>
        </Form>
      </ProfileWrap>
    );
};

export default Profile;
