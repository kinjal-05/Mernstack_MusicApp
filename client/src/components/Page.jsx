
import React, { useEffect, useState } from "react";
import { getAllSongs,getAllArtist, getAllAlbums} from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Page = () => {
  // const [
  //   {
  //     allSongs,
  //     artistFilter,
  //     albumFilter,
  //     languageFilter,
  //   },
  //   dispatch,
  // ] = useStateValue();
  const [{ allSongs, allAlbums }, dispatch] = useStateValue();


  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    } else {
      // Update filtered artists and albums whenever allSongs change
      const uniqueArtists = Array.from(new Set(allSongs.map(song => song.artist)));
      const uniqueAlbums = Array.from(new Set(allSongs.map(song => song.album)));
      
      setFilteredArtists(uniqueArtists);
      setFilteredAlbums(uniqueAlbums);
    }
    
  }, [allSongs]);

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, [allAlbums]);
  // useEffect(() => {
  //   if (!allArtist) {
  //     getAllArtist().then((data) => {
  //       dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
  //     });
  //   }
  // }, [allArtist]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [songsData, artistsData] = await Promise.all([
  //       getAllSongs(),
  //       getAllArtist(), // Function to fetch all artists
  //     ]);
  
  //     dispatch({
  //       type: actionType.SET_ALL_SONGS,
  //       allSongs: songsData.data,
  //     });
  
  //     // Assuming artistsData.data contains artist details with images
  //     dispatch({
  //       type: actionType.SET_ALL_ARTISTS,
  //       allArtists: artistsData.data, // Dispatching the artists data to your context
  //     });
  //   };
  
  //   fetchData();
  // }, [dispatch]);
  

  // Helper function to get artist image
  // const getArtistImage = (artist) => {
  //   const song = allSongs.find(song => song.artist === artist);
  //   return song ? song.imageURL : ""; // Replace with the correct property name
  // };
  // const getArtistImage = (artistName) => {
  //   const artist = getAllArtist.find(artist => artist.name === artistName); // Assuming artist has a 'name' property
  //   return artist ? artist.imageURL : ""; // Replace 'imageURL' with the correct property name for artist images
  // };



  const getAlbumImage = (album) => {
    // Find the first song that matches the album name
    const song = allSongs.find((song) => song.album === album);
    
    // If a song is found, find the corresponding artist
    if (song) {
      // Find the artist associated with the song
      const album = allAlbums.find((album) => album.name === song.album);
      // Return the artist's image URL or an empty string if not found
      return album ? album.imageURL : "";
    }
  
    // If no song is found, return an empty string
    return "";
  };
  
//   const getArtistImage = (artist) => {
//     // Find the first song that matches the artist name
//     const song = allSongs.find((song) => song.artist === artist);
    
//     // If a song is found, find the corresponding artist
//     if (song) {
//         // Find the artist associated with the song
//         const artist = allArtist.find((artist) => artist.name === song.artist);
//         // Return the artist's image URL or an empty string if not found
//         return artist ? artist.imageURL : "";
//     }

//     // If no song is found, return an empty string
//     return "";
// };






  // Helper function to get album image
  // const getAlbumImage = (album) => {
  //   const song = allSongs.find(song => song.album === album);
  //   return song ? song.imageURL : ""; // Replace with the correct property name
  // };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      {/* <SearchBar /> */}

      <div className="w-full h-auto p-4">
        {/* <h2 className="text-2xl font-bold mb-4">Artists</h2> */}
        {/* <div className="flex flex-wrap gap-4">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative w-32 min-w-[160px] cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center p-2"
            >
              <img
              //src={getArtistImage(artist)} // Use actual artist image URL
                alt={artist}
                className="w-full h-full rounded-lg object-cover mb-2"
              />
              <p className="text-base text-headingColor font-semibold">{artist}</p>
            </motion.div>
          ))}
        </div> */}

        <h2 className="text-2xl font-bold my-6">Albums</h2>
        <div className="flex flex-wrap gap-4">
          {filteredAlbums.map((album, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative w-32 min-w-[160px] cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center p-2"
            >
              <img
                src={getAlbumImage(album)} // Use actual album image URL
                alt={album}
                className="w-full h-full rounded-lg object-cover mb-2"
              />
              <p className="text-base text-headingColor font-semibold">{album}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;