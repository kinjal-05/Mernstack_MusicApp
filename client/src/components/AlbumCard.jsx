// import { getAllAlbums, deleteAlbumById } from "../api";
// import { actionType } from "../Context/reducer";
// import { useStateValue } from "../Context/StateProvider";
// import React, { useState } from "react";
// const AlbumCard = ({ data, index }) => {
//  // Matching fields with schema
//   const [isLoading, setIsLoading] = useState(false);
//   const [{ allAlbums, album }, dispatch] = useStateValue();
//   const { _id, name, imageURL, createdAt } = data; 
//   // Handle delete button click
// //   const handleDelete = () => {
   
// //     if (window.confirm(`Are you sure you want to delete the album "${name}"?`)) {
// //       onDelete(data.id); // Call the onDelete function passed from the parent
// //     }
// //   };

//   const handleDelete = (deleteId) => {
//     console.log("Hello");
//     setIsLoading(true);
//     deleteAlbumById(deleteId).then((res) => {
//       if (res) {
//         getAllAlbums().then((data) => {
//           dispatch({
//             type: actionType.SET_ALL_ALBUMNS,
//             allAlbums: data.data,
//           });
//         });
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000);
//       }
//     });
//   };






//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 mb-6 w-full flex items-center justify-between">
//       <div className="flex items-center">
//         {/* Album Cover */}
//         <img src={imageURL} alt={name} className="w-32 h-32 rounded-lg mr-8" />

//         {/* Album Info */}
//         <div>
//           <h3 className="text-2xl font-bold">{name}</h3>
//           <p className="text-md text-gray-700 mt-2">
//             Created on: {new Date(data.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       {/* Delete Button */}
//       <button
//         onClick={() => handleDelete(data._id)}
//         className="bg-red-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-red-600"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default AlbumCard;









import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const AlbumCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete  ${data.name} ?`)) {
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

      <p className="text-sm text-gray-400 italic mt-2">
        Created on: {new Date(data.createdAt).toLocaleString()}
      </p>
    </motion.div>
  );
};

export default AlbumCard;
