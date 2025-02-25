import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addSongToContext(index)}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span className="block text-sm text-gray-400 my-1">
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};

export default Home;

































// // import React, { useEffect, useState } from "react";
// // import { useStateValue } from "../Context/StateProvider";
// // import { IoMdClose } from "react-icons/io";
// // import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
// // import { motion } from "framer-motion";

// // import AudioPlayer from "react-h5-audio-player";
// // import "react-h5-audio-player/lib/styles.css";
// // import { actionType } from "../Context/reducer";
// // import { MdPlaylistPlay } from "react-icons/md";
// // import { getAllSongs } from "../api";
// // import { RiPlayListFill } from "react-icons/ri";

// // const MusicPlayer = () => {
// //   const [isPlayList, setIsPlayList] = useState(false);
// //   const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
// //     useStateValue();

// //   const closeMusicPlayer = () => {
// //     if (isSongPlaying) {
// //       dispatch({
// //         type: actionType.SET_SONG_PLAYING,
// //         isSongPlaying: false,
// //       });
// //     }
// //   };

// //   const togglePlayer = () => {
// //     if (miniPlayer) {
// //       dispatch({
// //         type: actionType.SET_MINI_PLAYER,
// //         miniPlayer: false,
// //       });
// //     } else {
// //       dispatch({
// //         type: actionType.SET_MINI_PLAYER,
// //         miniPlayer: true,
// //       });
// //     }
// //   };

// //   const nextTrack = () => {
// //     if (song > allSongs.length) {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: 0,
// //       });
// //     } else {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: song + 1,
// //       });
// //     }
// //   };

// //   const previousTrack = () => {
// //     if (song === 0) {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: 0,
// //       });
// //     } else {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: song - 1,
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (song > allSongs.length) {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: 0,
// //       });
// //     }
// //   }, [song]);

// //   return (
// //     <div className="w-full full flex items-center gap-3 overflow-hidden">
// //       <div
// //         className={`w-full full items-center gap-3 p-4 ${
// //           miniPlayer ? "absolute top-40" : "flex relative"
// //         }`}
// //       >
// //         <img
// //           src={allSongs[song]?.imageURL}
// //           className="w-40 h-20 object-cover rounded-md"
// //           alt=""
// //         />
// //         <div className="flex items-start flex-col">
// //           <p className="text-xl text-headingColor font-semibold">
// //             {`${
// //               allSongs[song]?.name.length > 20
// //                 ? allSongs[song]?.name.slice(0, 20)
// //                 : allSongs[song]?.name
// //             }`}{" "}
// //             <span className="text-base">({allSongs[song]?.album})</span>
// //           </p>
// //           <p className="text-textColor">
// //             {allSongs[song]?.artist}{" "}
// //             <span className="text-sm text-textColor font-semibold">
// //               ({allSongs[song]?.category})
// //             </span>
// //           </p>
// //           <motion.i
// //             whileTap={{ scale: 0.8 }}
// //             onClick={() => setIsPlayList(!isPlayList)}
// //           >
// //             <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
// //           </motion.i>
// //         </div>
// //         <div className="flex-1">
// //           <AudioPlayer
// //             src={allSongs[song]?.songUrl}
// //             onPlay={() => console.log("is playing")}
// //             autoPlay={true}
// //             showSkipControls={true}
// //             onClickNext={nextTrack}
// //             onClickPrevious={previousTrack}
// //           />
// //         </div>
// //         <div className="h-full flex items-center justify-center flex-col gap-3">
// //           <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
// //             <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
// //           </motion.i>
// //           <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
// //             <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
// //           </motion.i>
// //         </div>
// //       </div>

// //       {isPlayList && (
// //         <>
// //           <PlayListCard />
// //         </>
// //       )}

// //       {miniPlayer && (
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.6 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           className="fixed right-2 bottom-2 "
// //         >
// //           <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
// //             <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
// //             <img
// //               onClick={togglePlayer}
// //               src={allSongs[song]?.imageURL}
// //               className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
// //               alt=""
// //             />
// //           </div>
// //         </motion.div>
// //       )}
// //     </div>
// //   );
// // };

// // export const PlayListCard = () => {
// //   const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
// //   useEffect(() => {
// //     if (!allSongs) {
// //       getAllSongs().then((data) => {
// //         dispatch({
// //           type: actionType.SET_ALL_SONGS,
// //           allSongs: data.data,
// //         });
// //       });
// //     }
// //   }, []);

// //   const setCurrentPlaySong = (songindex) => {
// //     if (!isSongPlaying) {
// //       dispatch({
// //         type: actionType.SET_SONG_PLAYING,
// //         isSongPlaying: true,
// //       });
// //     }
// //     if (song !== songindex) {
// //       dispatch({
// //         type: actionType.SET_SONG,
// //         song: songindex,
// //       });
// //     }
// //   };

// //   return (
// //     <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
// //       {allSongs.length > 0 ? (
// //         allSongs.map((music, index) => (
// //           <motion.div
// //             initial={{ opacity: 0, translateX: -50 }}
// //             animate={{ opacity: 1, translateX: 0 }}
// //             transition={{ duration: 0.3, delay: index * 0.1 }}
// //             className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
// //               music?._id === song._id ? "bg-card" : "bg-transparent"
// //             }`}
// //             onClick={() => setCurrentPlaySong(index)}
// //           >
// //             <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

// //             <div className="flex items-start flex-col">
// //               <p className="text-lg text-headingColor font-semibold">
// //                 {`${
// //                   music?.name.length > 20
// //                     ? music?.name.slice(0, 20)
// //                     : music?.name
// //                 }`}{" "}
// //                 <span className="text-base">({music?.album})</span>
// //               </p>
// //               <p className="text-textColor">
// //                 {music?.artist}{" "}
// //                 <span className="text-sm text-textColor font-semibold">
// //                   ({music?.category})
// //                 </span>
// //               </p>
// //             </div>
// //           </motion.div>
// //         ))
// //       ) : (
// //         <></>
// //       )}
// //     </div>
// //   );
// // };

// // export default MusicPlayer;











// // import React, { useEffect, useState } from "react";
// // import { getAllSongs,getAllArtist, getAllAlbums} from "../api";
// // import { actionType } from "../Context/reducer";
// // import { useStateValue } from "../Context/StateProvider";
// // import Header from "./Header";
// // import SearchBar from "./SearchBar";
// // import { motion } from "framer-motion";

// // const Home = () => {
// //   // const [
// //   //   {
// //   //     allSongs,
// //   //     artistFilter,
// //   //     albumFilter,
// //   //     languageFilter,
// //   //   },
// //   //   dispatch,
// //   // ] = useStateValue();
// //   const [{ allSongs, allAlbums }, dispatch] = useStateValue();


// //   const [filteredArtists, setFilteredArtists] = useState([]);
// //   const [filteredAlbums, setFilteredAlbums] = useState([]);

// //   useEffect(() => {
// //     if (!allSongs) {
// //       getAllSongs().then((data) => {
// //         dispatch({
// //           type: actionType.SET_ALL_SONGS,
// //           allSongs: data.data,
// //         });
// //       });
// //     } else {
// //       // Update filtered artists and albums whenever allSongs change
// //       const uniqueArtists = Array.from(new Set(allSongs.map(song => song.artist)));
// //       const uniqueAlbums = Array.from(new Set(allSongs.map(song => song.album)));
      
// //       setFilteredArtists(uniqueArtists);
// //       setFilteredAlbums(uniqueAlbums);
// //     }
    
// //   }, [allSongs]);

// //   useEffect(() => {
// //     if (!allAlbums) {
// //       getAllAlbums().then((data) => {
// //         dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
// //       });
// //     }
// //   }, [allAlbums]);
// //   // useEffect(() => {
// //   //   if (!allArtist) {
// //   //     getAllArtist().then((data) => {
// //   //       dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
// //   //     });
// //   //   }
// //   // }, [allArtist]);

// //   // useEffect(() => {
// //   //   const fetchData = async () => {
// //   //     const [songsData, artistsData] = await Promise.all([
// //   //       getAllSongs(),
// //   //       getAllArtist(), // Function to fetch all artists
// //   //     ]);
  
// //   //     dispatch({
// //   //       type: actionType.SET_ALL_SONGS,
// //   //       allSongs: songsData.data,
// //   //     });
  
// //   //     // Assuming artistsData.data contains artist details with images
// //   //     dispatch({
// //   //       type: actionType.SET_ALL_ARTISTS,
// //   //       allArtists: artistsData.data, // Dispatching the artists data to your context
// //   //     });
// //   //   };
  
// //   //   fetchData();
// //   // }, [dispatch]);
  

// //   // Helper function to get artist image
// //   // const getArtistImage = (artist) => {
// //   //   const song = allSongs.find(song => song.artist === artist);
// //   //   return song ? song.imageURL : ""; // Replace with the correct property name
// //   // };
// //   // const getArtistImage = (artistName) => {
// //   //   const artist = getAllArtist.find(artist => artist.name === artistName); // Assuming artist has a 'name' property
// //   //   return artist ? artist.imageURL : ""; // Replace 'imageURL' with the correct property name for artist images
// //   // };



// //   const getAlbumImage = (album) => {
// //     // Find the first song that matches the album name
// //     const song = allSongs.find((song) => song.album === album);
    
// //     // If a song is found, find the corresponding artist
// //     if (song) {
// //       // Find the artist associated with the song
// //       const album = allAlbums.find((album) => album.name === song.album);
// //       // Return the artist's image URL or an empty string if not found
// //       return album ? album.imageURL : "";
// //     }
  
// //     // If no song is found, return an empty string
// //     return "";
// //   };
  
// // //   const getArtistImage = (artist) => {
// // //     // Find the first song that matches the artist name
// // //     const song = allSongs.find((song) => song.artist === artist);
    
// // //     // If a song is found, find the corresponding artist
// // //     if (song) {
// // //         // Find the artist associated with the song
// // //         const artist = allArtist.find((artist) => artist.name === song.artist);
// // //         // Return the artist's image URL or an empty string if not found
// // //         return artist ? artist.imageURL : "";
// // //     }

// // //     // If no song is found, return an empty string
// // //     return "";
// // // };






// //   // Helper function to get album image
// //   // const getAlbumImage = (album) => {
// //   //   const song = allSongs.find(song => song.album === album);
// //   //   return song ? song.imageURL : ""; // Replace with the correct property name
// //   // };

// //   return (
// //     <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
// //       <Header />
// //       {/* <SearchBar /> */}

// //       <div className="w-full h-auto p-4">
// //         {/* <h2 className="text-2xl font-bold mb-4">Artists</h2> */}
// //         {/* <div className="flex flex-wrap gap-4">
// //           {filteredArtists.map((artist, index) => (
// //             <motion.div
// //               key={index}
// //               whileTap={{ scale: 0.8 }}
// //               initial={{ opacity: 0, translateY: -20 }}
// //               animate={{ opacity: 1, translateY: 0 }}
// //               transition={{ duration: 0.3, delay: index * 0.1 }}
// //               className="relative w-32 min-w-[160px] cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center p-2"
// //             >
// //               <img
// //               //src={getArtistImage(artist)} // Use actual artist image URL
// //                 alt={artist}
// //                 className="w-full h-full rounded-lg object-cover mb-2"
// //               />
// //               <p className="text-base text-headingColor font-semibold">{artist}</p>
// //             </motion.div>
// //           ))}
// //         </div> */}

// //         <h2 className="text-2xl font-bold my-6">Albums</h2>
// //         <div className="flex flex-wrap gap-4">
// //           {filteredAlbums.map((album, index) => (
// //             <motion.div
// //               key={index}
// //               whileTap={{ scale: 0.8 }}
// //               initial={{ opacity: 0, translateY: -20 }}
// //               animate={{ opacity: 1, translateY: 0 }}
// //               transition={{ duration: 0.3, delay: index * 0.1 }}
// //               className="relative w-32 min-w-[160px] cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center p-2"
// //             >
// //               <img
// //                 src={getAlbumImage(album)} // Use actual album image URL
// //                 alt={album}
// //                 className="w-full h-full rounded-lg object-cover mb-2"
// //               />
// //               <p className="text-base text-headingColor font-semibold">{album}</p>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;






// import React, { useEffect, useState } from "react";
// import { getAllSongs } from "../api";
// import { actionType } from "../Context/reducer";
// import { useStateValue } from "../Context/StateProvider";
// import { SongCard } from "./DashboardSongs";
// import Filter from "./Filter";
// import Header from "./Header";
// import SearchBar from "./SearchBar";
// import { motion } from "framer-motion";

// const Home = () => {
//   const [
//     {
//       searchTerm,
//       isSongPlaying,
//       song,
//       allSongs,
//       artistFilter,
//       filterTerm,
//       albumFilter,
//       languageFilter,
//     },
//     dispatch,
//   ] = useStateValue();

//   const [filteredSongs, setFilteredSongs] = useState(null);

//   useEffect(() => {
//     if (!allSongs) {
//       getAllSongs().then((data) => {
//         dispatch({
//           type: actionType.SET_ALL_SONGS,
//           allSongs: data.data,
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (searchTerm.length > 0) {
//       const filtered = allSongs.filter(
//         (data) =>
//           data.artist.toLowerCase().includes(searchTerm) ||
//           data.language.toLowerCase().includes(searchTerm) ||
//           data.name.toLowerCase().includes(searchTerm) ||
//           data.artist.includes(artistFilter)
//       );
//       setFilteredSongs(filtered);
//     } else {
//       setFilteredSongs(null);
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     const filtered = allSongs?.filter((data) => data.artist === artistFilter);
//     if (filtered) {
//       setFilteredSongs(filtered);
//     } else {
//       setFilteredSongs(null);
//     }
//   }, [artistFilter]);

//   useEffect(() => {
//     const filtered = allSongs?.filter(
//       (data) => data.category.toLowerCase() === filterTerm
//     );
//     if (filtered) {
//       setFilteredSongs(filtered);
//     } else {
//       setFilteredSongs(null);
//     }
//   }, [filterTerm]);

//   useEffect(() => {
//     const filtered = allSongs?.filter((data) => data.album === albumFilter);
//     if (filtered) {
//       setFilteredSongs(filtered);
//     } else {
//       setFilteredSongs(null);
//     }
//   }, [albumFilter]);

//   useEffect(() => {
//     const filtered = allSongs?.filter(
//       (data) => data.language === languageFilter
//     );
//     if (filtered) {
//       setFilteredSongs(filtered);
//     } else {
//       setFilteredSongs(null);
//     }
//   }, [languageFilter]);

//   return (
//     <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
//       <Header />
//       <SearchBar />

//       {searchTerm.length > 0 && (
//         <p className="my-4 text-base text-textColor">
//           Searched for :
//           <span className="text-xl text-cartBg font-semibold">
//             {searchTerm}
//           </span>
//         </p>
//       )}

//       <Filter setFilteredSongs={setFilteredSongs} />

//       <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
//         <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
//       </div>
//     </div>
//   );
// };

// export const HomeSongContainer = ({ musics }) => {
//   const [{ isSongPlaying, song }, dispatch] = useStateValue();

//   const addSongToContext = (index) => {
//     if (!isSongPlaying) {
//       dispatch({
//         type: actionType.SET_SONG_PLAYING,
//         isSongPlaying: true,
//       });
//     }
//     if (song !== index) {
//       dispatch({
//         type: actionType.SET_SONG,
//         song: index,
//       });
//     }
//   };
//   return (
//     <>
//       {musics?.map((data, index) => (
//         <motion.div
//           key={data._id}
//           whileTap={{ scale: 0.8 }}
//           initial={{ opacity: 0, translateX: -50 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.1 }}
//           className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//           onClick={() => addSongToContext(index)}
//         >
//           <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
//             <motion.img
//               whileHover={{ scale: 1.05 }}
//               src={data.imageURL}
//               alt=""
//               className=" w-full h-full rounded-lg object-cover"
//             />
//           </div>

//           <p className="text-base text-headingColor font-semibold my-2">
//             {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
//             <span className="block text-sm text-gray-400 my-1">
//               {data.artist}
//             </span>
//           </p>
//         </motion.div>
//       ))}
//     </>
//   );
// };

// export default Home;
