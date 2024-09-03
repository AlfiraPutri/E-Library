import React from 'react';

const BookCollection = () => {
  const books = [
    {
      title: 'Enjoy Your Life',
      cover: 'path/to/cover.jpg', // Replace with the actual image path
    },
    {
      title: 'Enjoy Your Life',
      cover: 'path/to/cover.jpg',
    },
    {
      title: 'Enjoy Your Life',
      cover: 'path/to/cover.jpg',
    },
    {
      title: 'Enjoy Your Life',
      cover: 'path/to/cover.jpg',
    },
  ];

  return (
    <div className="book-collection">
      <h2>Koleksi Buku</h2>
      <div className="books">
        {books.map((book, index) => (
          <div className="book" key={index}>
            <img src={book.cover} alt={book.title} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All</button>
    </div>
  );
};

export default BookCollection;
