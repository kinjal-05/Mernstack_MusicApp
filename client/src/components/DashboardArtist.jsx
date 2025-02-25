// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import { useStateValue } from "../Context/StateProvider";
// import { Link } from "react-router-dom";
// import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { getAllArtist } from "../api";
// import { actionType } from "../Context/reducer";

// const DashboardArtist = () => {
//   const [{ artists }, dispatch] = useStateValue();

//   useEffect(() => {
//     if (!artists) {
//       getAllArtist().then((data) => {
//         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
//       });
//     }
//   }, []);

//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
//         {artists &&
//           artists.map((data, index) => (
//             <>
//               <ArtistCard key={index} data={data} index={index} />
//             </>
//           ))}
//       </div>
//     </div>
//   );
// };

// export const ArtistCard = ({ data, index }) => {
//   const [isDelete, setIsDelete] = useState(false);
//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt=""
//       />

//       <p className="text-base text-textColor">{data.name}</p>
//       <div className="flex items-center gap-4">
//         <a href={data.instagram} target="_blank">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//         <a href={data.twitter} target="_blank">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//       </div>
//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)}
//       >
//         <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
//       </motion.i>

//       {isDelete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
//         >
//           <p className="text-gray-100 text-base text-center">
//             Are you sure do you want to delete this?
//           </p>
//           <div className="flex items-center w-full justify-center gap-3">
//             <div className="bg-red-300 px-3 rounded-md">
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>
//             <div
//               className="bg-green-300 px-3 rounded-md"
//               onClick={() => setIsDelete(false)}
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DashboardArtist;

























// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useStateValue } from "../Context/StateProvider";
// import { Link } from "react-router-dom";
// import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { getAllArtist, deleteArtist } from "../api"; // Ensure deleteArtist is imported
// import { actionType } from "../Context/reducer";

// const DashboardArtist = () => {
//   const [{ artists }, dispatch] = useStateValue();

//   useEffect(() => {
//     if (!artists) {
//       getAllArtist().then((data) => {
//         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
//       });
//     }
//   }, []);

//   const handleDeleteArtist = (artistId) => {
//     // Delete the artist from the backend
//     deleteArtist(artistId)
//       .then(() => {
//         // Remove the artist from the local state after successful deletion
//         dispatch({
//           type: actionType.SET_ARTISTS,
//           artists: artists.filter((artist) => artist.id !== artistId), // Assuming artist has an 'id' field
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting artist:", error);
//       });
//   };

//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
//         {artists &&
//           artists.map((data, index) => (
//             <ArtistCard key={data.id} data={data} index={index} onDelete={handleDeleteArtist} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export const ArtistCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt=""
//       />
//       <p className="text-base text-textColor">{data.name}</p>
//       <div className="flex items-center gap-4">
//         <a href={data.instagram} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//         <a href={data.twitter} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//       </div>
//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)}
//       >
//         <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
//       </motion.i>

//       {isDelete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
//         >
//           <p className="text-gray-100 text-base text-center">
//             Are you sure you want to delete this?
//           </p>
//           <div className="flex items-center w-full justify-center gap-3">
//             <div
//               className="bg-red-300 px-3 rounded-md cursor-pointer"
//               onClick={() => {
//                 onDelete(data.id); // Call the delete function passed from the parent
//                 setIsDelete(false); // Close the confirmation
//               }}
//             >
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>
//             <div
//               className="bg-green-300 px-3 rounded-md cursor-pointer"
//               onClick={() => setIsDelete(false)}
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DashboardArtist;












// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useStateValue } from "../Context/StateProvider";
// import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { getAllArtist, deleteArtist } from "../api"; // Ensure deleteArtist is imported
// import { actionType } from "../Context/reducer";

// const DashboardArtist = () => {
//   const [{ artists }, dispatch] = useStateValue();

//   useEffect(() => {
//     if (!artists) {
//       getAllArtist().then((data) => {
//         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
//       });
//     }
//   }, []);

//   const handleDeleteArtist = (artistId) => {
//     // Delete the artist from the backend
//     deleteArtist(artistId)
//       .then(() => {
//         // Remove the artist from the local state after successful deletion
//         dispatch({
//           type: actionType.SET_ARTISTS,
//           artists: artists.filter((artist) => artist.id !== artistId), // Assuming artist has an 'id' field
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting artist:", error);
//       });
//   };

//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
//         {artists && artists.length > 0 ? (
//           artists.map((data, index) => (
//             <ArtistCard key={data.id} data={data} index={index} onDelete={handleDeleteArtist} />
//           ))
//         ) : (
//           <p className="text-gray-500 text-lg">No artists available.</p> // Message when no artists are available
//         )}
//       </div>
//     </div>
//   );
// };

// export const ArtistCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt=""
//       />
//       <p className="text-base text-textColor">{data.name}</p>
//       <div className="flex items-center gap-4">
//         <a href={data.instagram} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//         <a href={data.twitter} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//       </div>
//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)}
//       >
//         <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
//       </motion.i>

//       {isDelete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
//         >
//           <p className="text-gray-100 text-base text-center">
//             Are you sure you want to delete this?
//           </p>
//           <div className="flex items-center w-full justify-center gap-3">
//             <div
//               className="bg-red-300 px-3 rounded-md cursor-pointer"
//               onClick={() => {
//                 onDelete(data.id); // Call the delete function passed from the parent
//                 setIsDelete(false); // Close the confirmation
//               }}
//             >
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>
//             <div
//               className="bg-green-300 px-3 rounded-md cursor-pointer"
//               onClick={() => setIsDelete(false)}
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DashboardArtist;






// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useStateValue } from "../Context/StateProvider";
// import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { getAllArtist, deleteArtist } from "../api"; // Ensure deleteArtist is imported
// import { actionType } from "../Context/reducer";

// const DashboardArtist = () => {
//   const [{ artists }, dispatch] = useStateValue();

//   useEffect(() => {
//     if (!artists) {
//       getAllArtist().then((data) => {
//         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
//       });
//     }
//   }, [artists, dispatch]);

//   const handleDeleteArtist = (artistId) => {
//     // Delete the artist from the backend
//     deleteArtist(artistId)
//       .then(() => {
//         // Remove the artist from the local state after successful deletion
//         dispatch({
//           type: actionType.SET_ARTISTS,
//           artists: artists.filter((artist) => artist._id !== artistId), // Assuming artist has an '_id' field
//         });
//       })
//       .catch((error) => {
//         console.error("Error deleting artist:", error);
//       });
//   };

//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
//         {artists &&
//           artists.map((data, index) => (
//             <ArtistCard key={index} data={data} index={index} onDelete={handleDeleteArtist} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export const ArtistCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt="artist"
//       />

//       <p className="text-base text-textColor">{data.name}</p>
//       <div className="flex items-center gap-4">
//         <a href={data.instagram} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//         <a href={data.twitter} target="_blank" rel="noopener noreferrer">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//       </div>
//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)}
//       >
//         <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
//       </motion.i>

//       {isDelete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
//         >
//           <p className="text-gray-100 text-base text-center">
//             Are you sure you want to delete this?
//           </p>
//           <div className="flex items-center w-full justify-center gap-3">
//             <div
//               className="bg-red-300 px-3 rounded-md cursor-pointer"
//               onClick={() => {
//                 onDelete(data._id); // Call the delete function passed from the parent
//                 setIsDelete(false); // Close the confirmation
//               }}
//             >
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>
//             <div
//               className="bg-green-300 px-3 rounded-md cursor-pointer"
//               onClick={() => setIsDelete(false)}
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DashboardArtist;














import React, { useEffect, useState } from "react";
import { getAllArtist, deleteArtistById } from "../api"; // Ensure both functions are defined in your API file
import ArtistCard from "./ArtistCard"; // A component to display each artist

const DashboardArtists = () => {
  const [artistData, setArtistData] = useState([]);

  // Fetch artist data from the server
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getAllArtist(); // Fetch all artists
        setArtistData(response.data); // Set artist data in state
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };

    fetchArtists();
  }, []);

  // Handle deleting an artist
  const handleDeleteArtist = async (id) => {
    try {
      await deleteArtistById(id); // Call API to delete the artist by ID
      setArtistData(artistData.filter((artist) => artist._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Failed to delete artist:", error);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      {/* <h2 className="text-xl font-bold">Artists</h2> */}
      <div className="w-full py-12 min-h-[400px] overflow-y-auto flex flex-wrap justify-start">
        {artistData.length > 0 ? (
          artistData.map((artist) => (
            <div key={artist._id} className="m-2"> {/* Make each artist card take full width */}
              <ArtistCard
                data={artist}
                onDelete={handleDeleteArtist} // Pass delete handler to ArtistCard
              />
            </div>
          ))
        ) : (
          <p>No artists available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardArtists;
