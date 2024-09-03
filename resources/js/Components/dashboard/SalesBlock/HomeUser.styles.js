import styled from "styled-components";
import { BlockWrapStyles } from "../../../styles/global/default";
import { media } from "../../../styles/theme/theme";

export const SalesUserWrap = styled.div`
    ${BlockWrapStyles}

    .block-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;

        .block-title {
            margin-bottom: 4px;
        }
    }

    .search-bar {
        margin: 16px 0;

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid ${(props) => props.theme.colors.columbiaBlue};
            border-radius: 6px;
            font-size: 16px;
        }
    }

    .book-collection {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

        .book-item {
            width: calc(25% - 16px);
            text-align: center;
            background-color: ${(props) => props.theme.colors.latte};
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;


        .book-item:hover {
            transform: translateY(-10px); /* Menggerakkan card ke atas saat hover */
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Bayangan yang lebih besar saat hover */
        }

            .book-image {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }

            .book-title {
                margin-top: 8px;
                font-size: 16px;
                font-weight: 600;
            }
        }

        ${media.md`
            .book-item {
                width: calc(50% - 16px);
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
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;

            &:hover {
                background-color: ${(props) => props.theme.colors.salmon};
            }
        }
    }
`;
