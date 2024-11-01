import styled from 'styled-components';
import { BlockWrapStyles } from "../styles/global/default";

export const ShowBukuWrap = styled.div`
  ${BlockWrapStyles};

  margin: 12px;
  align-items: center;
  padding: 14px 12px;

   &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #F77D00;
    outline: 1px solid rgba(0, 0, 0, 0.1);
  }

`;
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background-color: #f7f7f7;
    width: 100%;
    overflow-x: auto;

`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
   // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    padding-left: 20px;
`;

export const CoverImage = styled.img`
    width: 270px;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
`;

export const Badge = styled.div`
    background-color: #FFA500;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 14px;
    text-align: center;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export const Button = styled.button`
    background-color: ${props => props.primary ? '#FFA500' : '#D3D3D3'};
    color: white;
    border: none;
    padding: ${props => props.full ? '10px 80px' : '10px 80px'};
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.8;
    }

    svg {
        margin-left: 5px;
    }

    /* For small buttons like Download and Favorite */
    ${props => props.small && `
        padding: 10px 30px;
        font-size: 14px;
        width: auto;
        background-color: #20326A;
    `}
`;

export const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 20px 0;
`;

export const InfoTitle = styled.h3`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
    font-weight: bold;
`;


export const Title = styled.h2`
    font-size: 24px;
    color: #FF7F50;
    margin-bottom: 10px;
`;

export const Description = styled.p`
    font-size: 16px;
    color: #666;
    text-align: justify;
    margin-bottom: 20px;
`;

export const InfoSection = styled.div`
    width: 100%;
`;

export const InfoItem = styled.div`
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
    strong {
        color: #FF7F50;
    }
`;

export const DownloadButton = styled.button`
    // background-color: #FFE4B5;
    border: none;
  //  padding: 10px;
   // border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #FFD700;
    }
`;

export const SmileButton = styled.button`
    // background-color: #FFFACD;
    border: none;
    // padding: 10px;
    // border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #FFEB3B;
    }
`;
export const InfoTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }

    strong {
        color: #FF7F50;
    }
`;



