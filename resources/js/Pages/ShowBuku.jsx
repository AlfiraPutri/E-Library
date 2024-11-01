import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShowBukuWrap, Container, Divider, InfoTitle, ContentWrapper, LeftColumn, RightColumn, CoverImage, Button, Title, Description, InfoSection, InfoItem, DownloadButton, SmileButton, Badge, InfoTable } from './ShowBuku.styles';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';

const ShowBukuPage = ({auth}) => {
    const { id } = useParams();
    const [buku, setBuku] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch buku from API
        const fetchBuku = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/buku/${id}/show`);
                console.log(response.data);
                setBuku(response.data);
            } catch (error) {
                console.error('Error fetching buku:', error);
            }
        };

        fetchBuku();
    }, [id]);



    if (!buku) {
        return <div>Loading...</div>;
    }

    const pdfUrl = buku.file_upload ? `http://127.0.0.1:8000${buku.file_upload}` : '';
    console.log(pdfUrl);

    const handleReadNowClick = async () => {
        await saveToHistory(buku.id_buku);
        navigate(`/user/flipbook/${id}`);
    };

    const saveToHistory = async (id_buku) => {
        try {
            console.log('User ID:', auth.user.id_users);
            console.log('Buku ID:', id_buku);
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${auth.user.id_users}/history`,
                {
                    id_buku: id_buku,
                    judul: buku.judul,
                    img_buku: buku.img_buku,
                }
            );
                // your request body data here

            console.log('Data saved to history:', response.data);
        } catch (error) {
            console.error('Error saving to history:', error.response ? error.response.data : error.message);
        }
    };

    const handleAddToFavorites = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${auth.user.id_users}/favorite`, {
                id_buku: buku.id_buku,
                judul: buku.judul,
                img_buku: buku.img_buku,
            });
            console.log('Buku ditambahkan ke favorit:', response.data);
        } catch (error) {
            console.error('Error adding to favorites:', error.response ? error.response.data : error.message);
        }
    };

    const handleDownloadClick = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/user/${auth.user.id_users}/download`, {
                id_buku: buku.id_buku,
                judul: buku.judul,
                img_buku: buku.img_buku,
            });
            console.log('Buku ditambahkan ke download:', response.data);
        } catch (error) {
            console.error('Error adding to download:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <ShowBukuWrap>
            <ContentWrapper>
                <LeftColumn>
                    <CoverImage src={buku.img_buku} alt={buku.judul} />
                    <Button primary onClick={handleReadNowClick}>Baca Sekarang</Button>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {buku.file_upload && (
                        <a href={pdfUrl} download={buku.judul + '.pdf'} onClick={handleDownloadClick}>
                            <Button small>
                                <FontAwesomeIcon icon={faDownload} /> Download
                                </Button>

                        </a>
                    )}

                    <Button small onClick={handleAddToFavorites}>
                    <FontAwesomeIcon icon={faHeart} /> Favorite
                    </Button>
                    </div>
                </LeftColumn>

                <RightColumn>
                    <Badge>{buku.kategori.nama_kategori}</Badge>
                    <Title>{buku.judul}</Title>
                    <Description>{buku.deskripsi}</Description>

                    <Divider />
                    <InfoTitle>Informasi Buku</InfoTitle>

                    <InfoTable>
                        <tbody>
                            <tr>
                            <td><strong>ISBN:</strong></td>
                            <td>{buku.isbn}</td>
                            </tr>
                            <tr>
                            <td><strong>Pengarang:</strong></td>
                            <td>{buku.pengarang}</td>
                            </tr>
                            <tr>
                            <td><strong>Penerbit:</strong></td>
                            <td>{buku.penerbit}</td>
                            </tr>
                            <tr>
                            <td><strong>Tanggal Terbit:</strong></td>
                            <td>{buku.tanggal_terbit}</td>
                            </tr>
                        </tbody>
                    </InfoTable>
                    {/* <SmileButton>
                        <FontAwesomeIcon icon={faSmile} />
                        Lihat Semua Buku
                    </SmileButton>
                    <InfoSection>
                        <InfoItem>
                            <strong>ISBN:</strong> {buku.isbn}
                        </InfoItem>
                        <InfoItem>
                            <strong>Pengarang:</strong> {buku.pengarang}
                        </InfoItem>
                        <InfoItem>
                            <strong>Penerbit:</strong> {buku.penerbit}
                        </InfoItem>
                        <InfoItem>
                            <strong>Tanggal Terbit:</strong> {buku.tanggal_terbit}
                        </InfoItem>
                    </InfoSection> */}
                </RightColumn>
            </ContentWrapper>

        </ShowBukuWrap>
    );
}

export default ShowBukuPage;
