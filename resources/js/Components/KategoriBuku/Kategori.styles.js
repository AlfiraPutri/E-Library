import styled from "styled-components";
import { BlockWrapStyles } from "../../styles/global/default";
import { media } from "../../styles/theme/theme";

export const KategoriWrap = styled.div`
  ${BlockWrapStyles};
  overflow-x: auto;

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

  .block-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .export-btn {
    display: flex;
    align-items: center;
    column-gap: 8px;
    height: 36px;
    border: 1px solid #F77D00;
    border-radius: 8px;
    padding: 4px 12px;
    font-weight: 600;
    cursor: pointer;
    background-color: #ffffff;
    color: #F77D00;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #F77D00;
      color: #ffffff;
    }
  }

  .tbl-products {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px 16px;
        font-size: 14px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        transition: background-color 0.3s;
      }

      thead {
        th {
          background-color: #F77D00;
          color: #ffffff;
          font-weight: 600;
          border-bottom: 2px solid #F77D00;
          text-align: center;
        }
      }

      tbody {
        tr:hover {
          background-color: #f9f9f9;
        }

        td {
          color: #333;
        }

        .tbl-progress-bar {
          min-width: 180px;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          background-color: #f3f3f3;

          ${media.lg`
            min-width: auto;
          `}

          .bar-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: #F77D00;
            border-radius: 3px;
          }
        }

        .tbl-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 24px;
          border: 1px solid #F77D00;
          border-radius: 12px;
          background-color: #F77D00;
          color: #ffffff;
        }
      }
    }
  }
`;
