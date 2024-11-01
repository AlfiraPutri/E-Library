import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SettingsContainer, ProfileSection, ProfileImage, FormField, FormSection, ButtonContainer, PdfLink } from './EditBuku.styles';
import Swal from 'sweetalert2';

const EditBukuPage = ({ setPageTitle }) => {
   // setPageTitle('Edit Buku')
    const params = useParams();
    const { id } = params;
    const [preview, setPreview] = useState(null);

    // State untuk buku dan form data
    const [buku, setBuku] = useState(null);
    const [formData, setFormData] = useState({
        judul: '',
        isbn: '',
        pengarang: '',
        penerbit: '',
        tanggal_terbit: '',
        jumlah_buku: '',
        id_kategori: '',
        deskripsi: '',
        jumlah_halaman: '',
        file_upload: null,
        img_buku: null,
    });

    useEffect(() => {
        setPageTitle('Edit Buku'); // Pindahkan setPageTitle ke dalam useEffect
    }, [setPageTitle]);

    // Fetch data buku berdasarkan ID pada saat komponen mount
    useEffect(() => {
        const fetchBuku = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/buku/${id}/show`);
                setBuku(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBuku();
    }, [id]);

    useEffect(() => {
        if (buku) {
            setFormData({
                judul: buku.judul || '',
                isbn: buku.isbn || '',
                pengarang: buku.pengarang || '',
                penerbit: buku.penerbit || '',
                tanggal_terbit: buku.tanggal_terbit || '',
                jumlah_buku: buku.jumlah_buku || '',
                id_kategori: buku.id_kategori || '',
                deskripsi: buku.deskripsi || '',
                jumlah_halaman: buku.jumlah_halaman || '',
                file_upload: buku.file_upload || '',
                img_buku: buku.img_buku || '',
            });
        }
    }, [buku]);

    // Fetch kategori pada saat komponen mount
    const [categories, setCategories] = useState([]);

    useEffect(() => {
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

    // Handle perubahan input form
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setFormData({ ...formData, [name]: file });
            if (name === 'img_buku') {
                setPreview(URL.createObjectURL(file));
            }
        }
    };

    // Menyimpan perubahan
    const handleSaveChanges = async () => {
        try {
            console.log("🚀 ~ handleSaveChanges ~ formData:", formData)
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            if (buku) {
                // Update buku yang ada
                const response = await axios.post(`http://127.0.0.1:8000/api/buku/${id}/edit`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("🚀 ~ handleSaveChanges ~ response:", response);
            } else {
                // Tambahkan buku baru
                await axios.post('http://127.0.0.1:8000/api/buku', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Data buku berhasil disimpan.',
                confirmButtonColor: '#3085d6',
            });

          //  console.log('Changes saved');
        } catch (error) {
            console.error('Error saving changes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menyimpan data.',
                confirmButtonColor: '#d33',
            });
        }
    };

    // Menghapus buku
    // const handleDeleteBook = async () => {
    //     try {
    //         if (buku) {
    //             await axios.delete(`http://127.0.0.1:8000/api/buku/${id}`);
    //             console.log('Book deleted');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting book:', error);
    //     }
    // };

    return (
        <SettingsContainer>
            <ProfileSection>

                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #ccc',
                    }}>
                        <img
                            src={preview || formData.img_buku}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}

                        />
                    </div>
                    <input
                        type="file"
                        name="img_buku"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

            </ProfileSection>

            <FormSection>
                <FormField>
                    <label>Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Pengarang</label>
                    <input
                        type="text"
                        name="pengarang"
                        value={formData.pengarang}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Penerbit</label>
                    <input
                        type="text"
                        name="penerbit"
                        value={formData.penerbit}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Tanggal Terbit</label>
                    <input
                        type="date"
                        name="tanggal_terbit"
                        value={formData.tanggal_terbit}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleInputChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id_kategori} value={category.id_kategori}>
                                {category.nama_kategori}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField>
                    <label>Jumlah Buku</label>
                    <input
                        type="number"
                        name="jumlah_buku"
                        value={formData.jumlah_buku}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Jumlah Halaman</label>
                    <input
                        type="number"
                        name="jumlah_halaman"
                        value={formData.jumlah_halaman}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi || ''}
                        onChange={handleInputChange}
                    />
                </FormField>

                <FormField>
                    <label>File Upload</label>
                    {/* Link to PDF */}
                    {formData.file_upload && (
                        <PdfLink

                            href={formData.file_upload}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View PDF
                        </PdfLink>
                    )}
                    <input
                        type="file"
                        name="file_upload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </FormField>

                <ButtonContainer>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    {/* <button onClick={handleDeleteBook} className="danger">
                        Delete Book
                    </button> */}
                </ButtonContainer>
            </FormSection>
        </SettingsContainer>
    );
};

export default EditBukuPage;
