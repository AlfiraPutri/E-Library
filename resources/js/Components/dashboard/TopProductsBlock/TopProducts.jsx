import React, { useState, useEffect } from "react";
import { BlockTitle } from "../../../styles/global/default";
import { TopProductsWrap } from "./TopProducts.styles";
import axios from "axios";

// Utility function to format the date as "1 September 2024"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

const TopProducts = () => {
  const [books, setBooks] = useState([]);

  // Fetching the book data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/buku");
        const bookData = response.data;

        // Debugging: Log the API response to inspect data format
        console.log("API Response:", bookData);

        // Ensure the correct date field is used (update 'dateAdded' if necessary)
        const sortedBooks = bookData.sort(
          (a, b) => new Date(b.dateAdded || b.created_at) - new Date(a.dateAdded || a.created_at)
        );

        // Select the top 3 most recent books
        const recentBooks = sortedBooks.slice(0, 3);

        setBooks(recentBooks);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <TopProductsWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Buku Baru</h3>
        </BlockTitle>
      </div>
      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul Buku</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => (
              <tr key={book.id || index}> {/* Fallback to index if book.id is unavailable */}
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{formatDate(book.dateAdded || book.created_at)}</td> {/* Fallback to 'created_at' */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TopProductsWrap>
  );
};

export default TopProducts;
