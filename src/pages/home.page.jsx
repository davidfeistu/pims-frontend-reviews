import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './../components/sidebar.component';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState('-likes');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/reviews');

        if (response.data.status === 'success') {
          let filteredReviews = response.data.data.reviews;

          if (searchTerm) {
            filteredReviews = filteredReviews.filter(review =>
              review.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          filteredReviews = filteredReviews.slice(0, limit);
          switch (sortOrder) {
            case '-likes':
              filteredReviews.sort((a, b) => a.likes - b.likes);
              break;
            case 'likes':
              filteredReviews.sort((a, b) => b.likes - a.likes);
              break;
            case '-rating':
              filteredReviews.sort((a, b) => a.rating - b.rating);
              break;
            case 'rating':
              filteredReviews.sort((a, b) => b.rating - a.rating);
              break;
            case '-views':
              filteredReviews.sort((a, b) => a.views - b.views);
              break;
            case 'views':
              filteredReviews.sort((a, b) => b.views - a.views);
              break;
            // Add more cases for other properties if needed
            default:
              // Default to sorting by likes
              filteredReviews.sort((a, b) => b.likes - a.likes);
          }

          setReviews(filteredReviews);
        } else {
          console.error('Failed to fetch reviews:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, [limit, sortOrder, searchTerm]);

  return (
    <div className="flex">
      <Sidebar
        limit={limit}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        onLimitChange={handleLimitChange}
        onSortOrderChange={handleSortOrderChange}
        onSearchTermChange={handleSearchTermChange}
        filteredReviews={reviews} // Pass filtered reviews to Sidebar
      />
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Home Page</h2>

        {/* Display reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <img
                src={`https://random.imagecdn.app/500/150?id=${review._id}`} // Use the random image link
                alt={review.name}
                className="w-full h-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2">{review.name}</h3>
              <h4 className="text-gray-800 mb-2">Type: {review.type}</h4>
              <p className="text-gray-600 mb-2">{review.description}</p>
              <p className="text-gray-800">Rating: {review.rating}</p>
              <p className="text-gray-800">Likes: {review.likes}</p>
               <p className="text-gray-800">Views: {review.views}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
