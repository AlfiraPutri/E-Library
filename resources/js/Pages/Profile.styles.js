import styled from 'styled-components';

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 1320px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

export const TwoCardContainer = styled.div`

  justify-content: space-between;
  width: 100%;
  gap: 20px;

`;

export const Card = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;  /* Set to flex to align children side by side */
  flex-wrap: wrap;  /* Allows wrapping of items if necessary */
  width: 100%;
  gap: 20px;  /* Adds space between input groups */
`;

export const InputGroup = styled.div`
flex: 1 1 45%;
  margin-bottom: 15px;
  margin-bottom: 15px;
  margin-right: 20px;  /* Adds space between columns */
  min-width: 250px;  /* Ensures minimum width for each input */
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
    color: white;
  }

  &:focus {
    outline: none;
  }
`;
export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #F77D00;
  text-align: center;
  margin-bottom: 15px;
  padding-bottom: 5px;
//   border-bottom: 2px solid #F77D00;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;
