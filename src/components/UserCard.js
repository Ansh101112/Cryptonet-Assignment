import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://randomuser.me/api/', {
        params: {
          page: 1,
          results: 1,
          seed: 'abc',
        },
      });
      setUser(result.data.results[0]);
    };
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full mx-auto"
    >
      <div className="flex items-center mb-6">
        <img
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600">{user.location.city}, {user.location.country}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Gender:</p>
        <p className="text-gray-800">{user.gender}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Phone:</p>
        <p className="text-gray-800">{user.phone}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Email:</p>
        <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
          {user.email}
        </a>
      </div>
    </motion.div>
  );
};

export default UserCard;