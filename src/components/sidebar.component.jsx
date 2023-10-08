/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import Modal from './modal.component';

const Sidebar = ({
  limit,
  sortOrder,
  searchTerm,
  onLimitChange,
  onSortOrderChange,
  onSearchTermChange,
  filteredReviews,
  onAddReview
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    description: '',
    type: '',
    rating: 0,
    likes: 0,
    views: 0,
    image: ''
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewReview({
      name: '',
      description: '',
      type: '',
      rating: 0,
      likes: 0,
      views: 0,
      image: ''
    });
  };

  const handleAddReview = async () => {
    try {

      const response = await axios.post('http://127.0.0.1:4000/api/v1/reviews', newReview);
      if (response.data.status === 'success') {
        onAddReview(newReview);
        handleModalClose();
      } else {
        console.error('Failed to add review:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };

  return (
    <aside className="w-1/4 p-4 relative">
      <h3 className="text-xl font-bold mb-4">Options</h3>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">Limit</label>
        <input
          type="number"
          value={limit}
          onChange={onLimitChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">Sort Order</label>
        <select
          value={sortOrder}
          onChange={onSortOrderChange}
          className="w-full border p-2 rounded"
        >
          <option value="-likes">Descending by Likes</option>
          <option value="likes">Ascending by Likes</option>
          <option value="-rating">Descending by Rating</option>
          <option value="rating">Ascending by Rating</option>
          <option value="-views">Descending by Views</option>
          <option value="views">Ascending by Views</option>
          {/* Add more options for other sorting criteria if needed */}
        </select>
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="Enter name"
            className="w-full border p-2 rounded"
          />

          {/* Display filtered reviews in a dropdown when typing */}
          {searchTerm && filteredReviews.length > 1 && (
            <div className="absolute top-full left-0 w-full border rounded mt-1 bg-white shadow-md">
              {filteredReviews.map((review) => (
                <div
                  key={review._id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => onSearchTermChange({ target: { value: review.name } })}
                >
                  {review.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        onClick={handleModalOpen}
      >
        Add Review
      </button>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2 className="text-xl font-bold mb-4">Add Review</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={newReview.description}
              onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={newReview.type}
              onChange={(e) => setNewReview({ ...newReview, type: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Likes</label>
            <input
              type="number"
              value={newReview.likes}
              onChange={(e) => setNewReview({ ...newReview, likes: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Views</label>
            <input
              type="number"
              value={newReview.views}
              onChange={(e) => setNewReview({ ...newReview, views: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="text"
              value={newReview.image}
              onChange={(e) => setNewReview({ ...newReview, image: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            onClick={handleAddReview}
          >
            Add Review
          </button>
        </Modal>
      )}
    </aside>
  );
};

export default Sidebar;
