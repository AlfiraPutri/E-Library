import React from 'react';

const Categories = () => {
  const categories = ['Business', 'Agama', 'Biografi', 'Tata Negara', 'Sejarah'];

  return (
    <div className="categories">
      <h2>Category</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <button className="category-item" key={index}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
