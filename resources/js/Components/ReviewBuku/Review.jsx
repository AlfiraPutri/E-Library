import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan axios diimpor
import { BlockTitle } from "../../styles/global/default";
import { ReviewWrap } from "./Review.styles";
import { FaPlus } from 'react-icons/fa';
import FormReview from "../FormReview";

const Review = () => {
  const [ulasan, setReview] = useState([]);
  const [isFormReviewOpen, setIsFormReviewOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`http://perpustakaan.bapekom6sby.com/api/review`);
      setReview(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddClick = () => {
    setCurrentReview(null); // Reset current buku before showing the form
    setIsFormReviewOpen(true);
  };

  const handleEditClick = (review) => {
    setCurrentReview(review);
    setIsFormReviewOpen(true);
  };

  const handleFormReviewClose = () => {
    setIsFormReviewOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentReview) {
        await axios.put(`perpustakaan.bapekom6sby.com/api/review/${currentReview.id_review}`, formData);
      } else {
        await axios.post(`perpustakaan.bapekom6sby.com/api/review`, formData);
      }
      fetchReview();
      handleFormReviewClose();
    } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`perpustakaan.bapekom6sby.com/api/review/${id}`);
      fetchReview();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <ReviewWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Review Buku</h3>
        </BlockTitle>
        <button type="button" className="export-btn" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: '5px' }} />
          <span className="text">Add</span>
        </button>
      </div>

      <FormReview open={isFormReviewOpen} handleClose={handleFormReviewClose} onSubmit={handleFormSubmit} review={currentReview} />

      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Buku</th>
              <th>Rating</th>
              <th>Isi Review</th>
              <th>Tanggal Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ulasan.map((review, index) => (
              <tr key={review.id_review}>
                <td>{index + 1}</td>
                <td>{review.username}</td>
                <td>{review.judul_buku}</td>
                <td>{review.rating}</td>
                <td>{review.review_text}</td>
                <td>{review.created_at}</td>
                <td>
                  <button onClick={() => handleEditClick(review)}>Edit</button>
                  <button onClick={() => handleDelete(review.id_review)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReviewWrap>
  );
};

export default Review;
