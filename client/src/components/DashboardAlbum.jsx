// import React, { useEffect, useState } from "react";
// import { useStateValue } from "../Context/StateProvider";

// import { motion } from "framer-motion";
// import { MdDelete } from "react-icons/md";
// import { actionType } from "../Context/reducer";
// import { getAllAlbums ,deleteAlbumById} from "../api";

// // const DashboardAlbum = () => {
// //   const [{ allAlbums }, dispatch] = useStateValue();
// //   useEffect(() => {
// //     if (!allAlbums) {
// //       getAllAlbums().then((data) => {
// //         dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
// //       });
// //     }
// //   }, []);
// //   return (
// //     <div className="w-full p-4 flex items-center justify-center flex-col">
// //       <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
// //         {allAlbums &&
// //           allAlbums.map((data, index) => (
// //             <>
// //               <AlbumCard key={index} data={data} index={index} />
// //             </>
// //           ))}
// //       </div>
// //     </div>
// //   );
// // };


// const DashboardAlbum = () => {
//   const [{ allAlbums }, dispatch] = useStateValue();

//   useEffect(() => {
//     if (!allAlbums) {
//       getAllAlbums().then((data) => {
//         dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
//       });
//     }
//   }, [allAlbums, dispatch]);

//   // Function to handle album deletion
//   const deleteAlbum = (albumId) => {
//     // Call API to delete the album from the server
//     deleteAlbumById(albumId)
//       .then((response) => {
//         if (response.success) {
//           // After successful deletion, update the state by filtering out the deleted album
//           const updatedAlbums = allAlbums.filter((album) => album._id !== albumId);
//           dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: updatedAlbums });
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting album:", error);
//       });
//   };

//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
//         {allAlbums &&
//           allAlbums.map((data, index) => (
//             <AlbumCard
//               key={index}
//               data={data}
//               index={index}
//               onDelete={deleteAlbum} // Pass the delete function as a prop
//             />
//           ))}
//       </div>
//     </div>
//   );
// };




















// // export const AlbumCard = ({ data, index }) => {
// //   const [isDelete, setIsDelete] = useState(false);
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, translateX: -50 }}
// //       animate={{ opacity: 1, translateX: 0 }}
// //       transition={{ duration: 0.3, delay: index * 0.1 }}
// //       className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
// //     >
// //       <img
// //         src={data?.imageURL}
// //         className="w-full h-40 object-cover rounded-md"
// //         alt=""
// //       />

// //       <p className="text-base text-textColor">{data.name}</p>

// //       <motion.i
// //         className="absolute bottom-2 right-2"
// //         whileTap={{ scale: 0.75 }}
// //         onClick={() => setIsDelete(true)}
// //       >
// //         <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
// //       </motion.i>

// //       {isDelete && (
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.5 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           exit={{ opacity: 0, scale: 0.5 }}
// //           className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
// //         >
// //           <p className="text-gray-100 text-base text-center">
// //             Are you sure do you want to delete this?
// //           </p>
// //           <div className="flex items-center w-full justify-center gap-3">
// //             <div className="bg-red-300 px-3 rounded-md">
// //               <p className="text-headingColor text-sm">Yes</p>
// //             </div>
// //             <div
// //               className="bg-green-300 px-3 rounded-md"
// //               onClick={() => setIsDelete(false)}
// //             >
// //               <p className="text-headingColor text-sm">No</p>
// //             </div>
// //           </div>
// //         </motion.div>
// //       )}
// //     </motion.div>
// //   );
// // };








// export const AlbumCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt="album"
//       />

//       <p className="text-base text-textColor">{data.name}</p>

//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)} // Show confirmation dialog
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
//             {/* "Yes" Button */}
//             <div
//               className="bg-red-300 px-3 rounded-md cursor-pointer"
//               onClick={() => {
//                 onDelete(data._id); // Call the delete function passed from parent
//                 setIsDelete(true); // Close the confirmation dialog after deletion
//               }}
//             >
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>

//             {/* "No" Button */}
//             <div
//               className="bg-green-300 px-3 rounded-md cursor-pointer"
//               onClick={() => setIsDelete(false)} // Just close the confirmation dialog
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };


// export const AlbumCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   const handleDelete = () => {
//     // Call the delete function passed from parent component
//     onDelete(data._id);
//     // Close the confirmation dialog after deletion
//     setIsDelete(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt="album"
//       />

//       <p className="text-base text-textColor">{data.name}</p>

//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={() => setIsDelete(true)} // Show confirmation dialog
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
//           {/* <p className="text-gray-100 text-base text-center">
//             Are you sure you want to delete this?
//           </p> */}
//           <div className="flex items-center w-full justify-center gap-3">
//             {/* "Yes" Button */}
//             <div
//               className="bg-red-300 px-3 rounded-md cursor-pointer"
//               onClick={handleDelete} // Call handleDelete on click
//             >
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>

//             {/* "No" Button */}
//             <div
//               className="bg-green-300 px-3 rounded-md cursor-pointer"
//               onClick={() => setIsDelete(false)} // Just close the confirmation dialog
//             >
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };











// export default DashboardAlbum;























// import React, { useEffect, useState } from "react";
// import { getAllAlbums, deleteAlbumById } from "../api"; // Ensure both functions are defined in your api file
// import AlbumCard from "./AlbumCard"; // A component to display each album

// const DashboardAlbums = () => {
//   const [albumData, setAlbumData] = useState([]);

//   // Fetch album data from the server
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await getAllAlbums(); // Fetch all albums
//         setAlbumData(response.data); // Set album data in state
//       } catch (error) {
//         console.error("Failed to fetch albums:", error);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // Handle deleting an album
//   const handleDeleteAlbum = async (id) => {
//     try {
//       console.log(id);
//       await deleteAlbumById(id); // Call API to delete the album by ID
//       setAlbumData(albumData.filter((album) => album._id !== id)); // Remove from local state
//     } catch (error) {
//       console.error("Failed to delete album:", error);
//     }
//   };

//   return (
//     <div className="w-full p-4 flex flex-col items-center">
//       <h2 className="text-xl font-bold">User Albums</h2>
//       <div className="w-full py-12 min-h-[400px] overflow-y-auto">
//         {albumData.length > 0 ? (
//           albumData.map((album) => (
//             <AlbumCard
//               key={album._id}
//               data={album}
//               onDelete={handleDeleteAlbum} // Pass delete handler to AlbumCard
//             />
//           ))
//         ) : (
//           <p>No albums available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardAlbums;







// import React, { useEffect, useState } from "react";
// import { getAllAlbums, deleteAlbumById } from "../api"; // Ensure both functions are defined in your API file
// import AlbumCard from "./AlbumCard"; // A component to display each album

// const DashboardAlbums = () => {
//   const [albumData, setAlbumData] = useState([]);

//   // Fetch album data from the server
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await getAllAlbums(); // Fetch all albums
//         setAlbumData(response.data); // Set album data in state
//       } catch (error) {
//         console.error("Failed to fetch albums:", error);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // Handle deleting an album
//   const handleDeleteAlbum = async (id) => {
//     try {
//       console.log("Deleting album with ID:", id); // Debugging log
//       await deleteAlbumById(id); // Call API to delete the album by ID
//       // Filter out the deleted album from the state
//       // setAlbumData((prevData) => prevData.filter((album) => album._id !== id));
//       console.log("Album deleted successfully"); // Debugging log
//     } catch (error) {
//       console.error("Failed to delete album:", error);
//     }
//   };

//   return (
//     <div className="w-full p-4 flex flex-col items-center">
//       <h2 className="text-xl font-bold">User Albums</h2>
//       <div className="w-full py-12 min-h-[400px] overflow-y-auto">
//         {albumData.length > 0 ? (
//           albumData.map((album) => (
//             <AlbumCard
//               key={album._id}
//               data={album}
//               onDelete={handleDeleteAlbum} // Pass delete handler to AlbumCard
//             />
//           ))
//         ) : (
//           <p>No albums available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardAlbums;



















// import React, { useEffect, useState } from "react";
// import { getAllAlbums, deleteAlbumById } from "../api"; // Ensure both functions are defined in your API file
// import AlbumCard from "./AlbumCard"; // A component to display each album

// const DashboardAlbums = () => {
//   const [albumData, setAlbumData] = useState([]);

//   // Fetch album data from the server
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await getAllAlbums(); // Fetch all albums
//         setAlbumData(response.data); // Set album data in state
//       } catch (error) {
//         console.error("Failed to fetch albums:", error);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // Handle deleting an album
//   const handleDeleteAlbum = async (id) => {
//     try {
//       console.log("Deleting album with ID:", id); // Debugging log
//       await deleteAlbumById(id); // Call API to delete the album by ID
//       // Filter out the deleted album from the state
//       setAlbumData((prevData) => prevData.filter((album) => album._id !== id)); // Update state
//       console.log("Album deleted successfully"); // Debugging log
//     } catch (error) {
//       console.error("Failed to delete album:", error);
//     }
//   };

//   return (
//     <div className="w-full p-4 flex flex-col items-center">
//       <h2 className="text-xl font-bold">User Albums</h2>
//       <div className="w-full py-12 min-h-[400px] overflow-y-auto flex flex-wrap justify-start">
//         {albumData.length > 0 ? (
//           albumData.map((album) => (
//             <div key={album._id} className="m-2"> {/* Add margin for spacing */}
//               <AlbumCard
//                 data={album}
//                 onDelete={handleDeleteAlbum} // Pass delete handler to AlbumCard
//               />
//             </div>
//           ))
//         ) : (
//           <p>No albums available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardAlbums;




// import React, { useEffect, useState } from "react";
// import { getAllAlbums, deleteAlbumById } from "../api"; // Ensure both functions are defined in your API file
// import AlbumCard from "./AlbumCard"; // A component to display each album

// const DashboardAlbums = () => {
//   const [albumData, setAlbumData] = useState([]);

//   // Fetch album data from the server
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await getAllAlbums(); // Fetch all albums
//         setAlbumData(response.data); // Set album data in state
//       } catch (error) {
//         console.error("Failed to fetch albums:", error);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // Handle deleting an album
//   const handleDeleteAlbum = async (id) => {
//     try {
//       console.log("Deleting album with ID:", id); // Debugging log
//       await deleteAlbumById(id); // Call API to delete the album by ID
//       // Filter out the deleted album from the state
//       setAlbumData(albumData.filter((feedback) => feedback._id !== id));
//       console.log("Album deleted successfully"); // Debugging log
//     } catch (error) {
//       console.error("Failed to delete album:", error);
//     }
//   };

//   return (
//     <div className="w-full p-4 flex flex-col items-center">
//       <h2 className="text-xl font-bold">User Albums</h2>
//       <div className="w-full py-12 min-h-[400px] overflow-y-auto flex flex-col">
//         {albumData.length > 0 ? (
//           albumData.map((album) => (
//             <div  className="w-full mb-4"> {/* Full width and margin bottom */}
//               <AlbumCard
//               key={album._id}
//                 data={album}
//                 onDelete={handleDeleteAlbum} // Pass delete handler to AlbumCard
//               />
//             </div>
//           ))
//         ) : (
//           <p>No albums available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardAlbums;













import React, { useEffect, useState } from "react";
import { getAllAlbums, deleteAlbumById } from "../api"; // Ensure both functions are defined in your API file
import AlbumCard from "./AlbumCard"; // A component to display each album

const DashboardAlbums = () => {
  const [albumData, setAlbumData] = useState([]);

  // Fetch album data from the server
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAllAlbums(); // Fetch all albums
        setAlbumData(response.data); // Set album data in state
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // Handle deleting an album
  const handleDeleteAlbum = async (id) => {
    try {
      await deleteAlbumById(id); // Call API to delete the album by ID
      setAlbumData(albumData.filter((album) => album._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Failed to delete album:", error);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      {/* <h2 className="text-xl font-bold">User Albums</h2> */}
      <div className="w-full py-12 min-h-[400px] overflow-y-auto flex flex-wrap justify-start">
        {albumData.length > 0 ? (
          albumData.map((album) => (
            <div key={album._id} className="m-2"> {/* Make each album card take full width */}
              <AlbumCard
              key={album._id}
                data={album}
                onDelete={handleDeleteAlbum} // Pass delete handler to AlbumCard
              />
            </div>
          ))
        ) : (
          <p>No albums available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAlbums;


