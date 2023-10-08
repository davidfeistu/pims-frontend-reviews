import { useState, useEffect } from 'react';
import axios from 'axios';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/reviews/stats');

        if (response.data.status === 'success') {
          setStats(response.data.data.stats);
        } else {
          console.error('Failed to fetch stats:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching stats:', error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex items-center justify-center mt-10">
      <main>
        {/* Display stats for different types in separate boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2 capitalize">{stat._id}</h3>
              <p className="text-gray-800">
                <span className="font-bold">Number of Reviews:</span> {stat.numReview}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Total Likes:</span> {stat.allLikes}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Total Views:</span> {stat.allViews}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Best Rating:</span> {stat.bestRating}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Worst Rating:</span> {stat.worstRating}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Average Rating:</span> {stat.avgRating}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
