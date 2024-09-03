import styled from "styled-components";
import { BlockWrapStyles } from "../../styles/global/default";

export const DataUsersWrap = styled.div`
  ${BlockWrapStyles};
  overflow-x: auto; // Scroll horizontal diaktifkan

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
    // overflow-x: auto;  // Ensure horizontal scroll for table

    // .table-container {
    //   width: 1000px; /* Adjust the width to your desired value for visible columns */
    //   overflow-x: auto; /* Enable horizontal scrolling */

      table {
        width: 1200px; /* Full table width */
        border-collapse: collapse;

        th,
        td {
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
        }
      }
    }
  }

  .pagination {
    margin-top: 16px;
    padding: 8px;
    border-top: 1px solid #ddd;

    button {
      border: 1px solid #F77D00;
      border-radius: 4px;
      padding: 4px 8px;
      background-color: #ffffff;
      color: #F77D00;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &:hover {
        background-color: #F77D00;
        color: #ffffff;
      }
    }

    input {
      border: 1px solid #ddd;
      padding: 4px;
      border-radius: 4px;
      width: 60px;
    }

    select {
      border: 1px solid #ddd;
      padding: 4px;
      border-radius: 4px;
    }
  }
`;

