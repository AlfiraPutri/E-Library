import styled from "styled-components";
import { BlockWrapStyles } from "../../../styles/global/default";
import { media } from "../../../styles/theme/theme";

export const DownloadUserWrap = styled.div`
    ${BlockWrapStyles}

    margin: 12px;
  align-items: center;
//   padding: 14px 12px;

    .block-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;

        .block-title {
            margin-bottom: 4px;
        }
    }

    .search-bar-wrapper {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        justify-content: space-between;
        margin-top: 12px;

        .search-bar {
        position: relative;  // Tambahkan ini
        width: 50%;
}

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid ${(props) => props.theme.colors.columbiaBlue};
            border-radius: 18px;
        }
            .search-icon {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                color: ${(props) => props.theme.colors.columbiaBlue};
                font-size: 18px;
            }
    }


    .book-collection {

        margin-top: 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 60px;
        justify-content: flex-start;


        .book-item {
             width: calc(25% - 18px);
            text-align: center;
            height: 300px;
            max-width: 180px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 16px;



        &:hover {
            transform: translateY(-10px); /* Menggerakkan card ke atas saat hover */
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Bayangan yang lebih besar saat hover */
        }

            .book-image {
               width: 100%;
            height: 100%;
            object-fit: cover;
            margin-bottom: 12px; // Spasi antara gambar dan judul
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2); // Tambahkan bayangan di gambar untuk efek lebih 3D

        }

            }

            .book-title {
                margin-top: 12px;
                font-size: 16px;
                font-weight: 400;
                font-style: italic;
                word-wrap: break-word;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: ${(props) => props.theme.colors.text};
            }
        }

        ${media.md`
            .book-item {
                width: calc(50% - 24px);
            }
        `}

        ${media.xs`
            .book-item {
                width: 100%;
            }
        `}
    }

    .category-section {

        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;


        .category-item {
            padding: 10px 16px;
            background-color: ${(props) => props.theme.colors.latte};
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.theme.colors.salmon};
            }
        }

    }
        .no-books-message {
        font-size: 18px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.danger};
        text-align: center;
        margin-top: 20px;
    }
        .category-filter select {

        border: 1px solid ${(props) => props.theme.colors.columbiaBlue};
        border-radius: 8px;

    }



`;
