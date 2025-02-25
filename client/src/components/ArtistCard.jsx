import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const ArtistCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    console.log("Attempting to delete artist with ID:", data._id); 
    if (window.confirm(`Are you sure you want to delete ${data.name} ?`)) {
      onDelete(data._id);
    }
  };

  return (
    <motion.div
      className="border p-6 mb-4 rounded-lg shadow-lg bg-white max-w-md w-full transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl text-gray-800">{data.name}</h3>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          <AiOutlineDelete className="text-2xl" />
        </motion.button>
      </div>

      <div className="mt-4">
        <img
          src={data.imageURL}
          alt={data.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      <div className="mt-4 flex justify-between">
        <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Twitter
        </a>
        <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500">
          Instagram
        </a>
      </div>

      <p className="text-sm text-gray-400 italic mt-2">
        Created on: {new Date(data.createdAt).toLocaleString()}
      </p>
    </motion.div>
  );
};

export default ArtistCard;
