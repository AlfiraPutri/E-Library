import styled from 'styled-components';

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 12px;
  padding: 20px;
  background: #ffffff;
    box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, 0.1);
    border-radius: 6px;
    padding: 20px;
    overflow-x: auto;
`;
export const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  }

  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

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
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.danger {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }

    &:hover {
      background-color: #218838;
    }
  }
`;
