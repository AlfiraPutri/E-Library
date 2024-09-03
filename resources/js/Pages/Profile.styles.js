import styled from 'styled-components';

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1100px;
  margin: auto;
  border: 1px solid #ddd;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #F77D00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 15px;
`;

// Styling untuk gambar profil
export const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  overflow: hidden;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    margin: 0;
    color: #aaa;
  }
`;

// Styling untuk tombol upload
export const UploadButton = styled.input`
  margin-top: 10px;
  border: none;
  background-color: #FBF3D5;
  color: black;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;
