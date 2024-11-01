import styled from 'styled-components';

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, 0.1);
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
`;
export const Card = styled.div`
 background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    transition: transform 0.2s;
  }
img:hover {
    transform: scale(1.05);
  }
  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* Allow columns to wrap to the next line */
  gap: 20px; /* Add space between columns */
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 45%; /* Allow columns to take 45% of the container width */
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 0.5em;
    color: #333;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
   // background-color: rgba(255, 236, 200, 0.8);
    font-size: 1em;
    color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      outline: none;
      border-color: #F77D00; /* Optional: Add a border color for focus state */
      background-color: rgba(255, 236, 200, 0.95);
      box-shadow: 0 0 5px rgba(247, 125, 0, 0.3);
    }
  }

  textarea {
    resize: vertical;
  }
`;



export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 20px;
    background-color: #F77D00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;transition: background-color 0.3s, transform 0.2s;

    &.danger {
      background-color: #ff4d4d;

      &:hover {
        background-color: #e66c00;
        transform: translateY(-2px);
      }
    }

    &:hover {
      background-color: #CD5C08;
    }
  }

`;

export const PdfLink = styled.a`
  display: inline-block;
  margin-top: 0.5em;
  color: #F77D00;
  font-weight: bold;
  text-decoration: underline;

  &:hover {
    color: #e66c00;
    text-decoration: none;
  }
`;
