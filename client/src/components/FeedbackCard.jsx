// import React from "react";
// import { AiOutlineMail, AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
// import { BiMessageDetail } from "react-icons/bi";
// import { motion } from "framer-motion";

// const FeedbackCard = ({ data, onDelete }) => {
//   const handleDelete = () => {
//     if (window.confirm(`Are you sure you want to delete feedback of ${data.name} ?`)) {
//       onDelete(data._id);
//     }
//   };

//   return (
//     <motion.div
//       className="border p-6 mb-4 rounded-lg shadow-lg bg-white max-w-md w-full transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
//       whileHover={{ scale: 1.03 }}
//     >
//       <div className="flex justify-between items-center">
//         <div className="flex items-center mb-4">
//           <AiOutlineUser className="text-3xl text-blue-500 mr-2" />
//           <h3 className="font-semibold text-xl text-gray-800">{data.name}</h3>
//         </div>
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           className="text-red-600 hover:text-red-800"
//           onClick={handleDelete}
//         >
//           <AiOutlineDelete className="text-2xl" />
//         </motion.button>
//       </div>

//       <div className="flex items-center mb-4">
//         <AiOutlineMail className="text-2xl text-green-500 mr-2" />
//         <p className="text-gray-600">{data.email}</p>
//       </div>

//       <div className="flex items-start mb-4">
//         <BiMessageDetail className="text-2xl text-yellow-500 mr-2" />
//         <p className="text-gray-700">{data.message}</p>
//       </div>

//       <p className="text-sm text-gray-400 italic">
//         Submitted on: {new Date(data.createdAt).toLocaleString()}
//       </p>
//     </motion.div>
//   );
// };

// export default FeedbackCard;

















import React from "react";
import { AiOutlineMail, AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { motion } from "framer-motion";

const FeedbackCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete feedback of ${data.name}?`)) {
      onDelete(data._id);
    }
  };

  return (
    <motion.div
      className="border p-6 mb-4 rounded-lg shadow-lg bg-white w-full transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-4">
          <AiOutlineUser className="text-3xl text-blue-500 mr-2" />
          <h3 className="font-semibold text-xl text-gray-800">{data.name}</h3>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          <AiOutlineDelete className="text-2xl" />
        </motion.button>
      </div>

      <div className="flex items-center mb-4">
        <AiOutlineMail className="text-2xl text-green-500 mr-2" />
        <p className="text-gray-600">{data.email}</p>
      </div>

      <div className="flex items-start mb-4">
        <BiMessageDetail className="text-2xl text-yellow-500 mr-2" />
        <p className="text-gray-700">{data.message}</p>
      </div>

      <p className="text-sm text-gray-400 italic">
        Submitted on: {new Date(data.createdAt).toLocaleString()}
      </p>
    </motion.div>
  );
};

export default FeedbackCard;

