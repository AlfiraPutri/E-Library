import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShowBukuWrap, Container, Divider, InfoTitle, ContentWrapper, LeftColumn, RightColumn, CoverImage, Button, Title, Description, InfoSection, InfoItem, DownloadButton, SmileButton, Badge } from './ShowBuku.styles';
import { useParams, useNavigate } from 'react-router-dom';

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

    return (
        <ShowBukuWrap>

            <ContentWrapper>
                <LeftColumn>
                    <CoverImage src={buku.img_buku} alt={buku.judul} />
                    <Button primary onClick={handleReadNowClick}>Baca Sekarang</Button>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {buku.file_upload && (
                        <a href={pdfUrl} download={buku.judul + '.pdf'}>
                            <DownloadButton>📥</DownloadButton>
                        </a>
                    )}

                    <SmileButton>😊</SmileButton>
                    </div>
                </LeftColumn>

                <RightColumn>
                    <Badge>{buku.kategori.nama_kategori}</Badge>
                    <Title>{buku.judul}</Title>
                    <Description>{buku.deskripsi}</Description>

                    <Divider />
                    <InfoTitle>Informasi</InfoTitle>

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
                    </InfoSection>
                </RightColumn>
            </ContentWrapper>

        </ShowBukuWrap>
    );
}

export default ShowBukuPage;
