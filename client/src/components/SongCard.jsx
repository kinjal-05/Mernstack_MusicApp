import React, { useState, useRef, useEffect } from "react";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai"; // Import the update icon
import { IoSave } from "react-icons/io5";
import { motion } from "framer-motion";
import {
  updateSongById,
  deleteSongById,
  getAllSongs,
  getAllAlbums,
  getAllArtist,
} from "../api";
import { actionType } from "../Context/reducer";

const SongCard = ({ data, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSong, setUpdatedSong] = useState({
    name: data.name,
    imageURL: data.imageURL,
    artist: data.artist,
    album: data.album,
    category: data.category,
    audioUrl: data.songUrl,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUpdateIcon, setShowUpdateIcon] = useState(false); // State to control update icon
  const audioRef = useRef(null);

  const [albums, setAlbums] = useState([]);
  const [singers, setSingers] = useState([]);

  // Fetch albums and singers on component load
  useEffect(() => {
    const fetchDropdownData = async () => {
      const [albumData, singerData] = await Promise.all([
        getAllAlbums(),
        getAllArtist(),
      ]);
      setAlbums(albumData.data);
      setSingers(singerData.data);
    };
    fetchDropdownData();
  }, []);

  const handleUpdateSong = async () => {
    const songDataToUpdate = {
      name: updatedSong.name,
      imageURL: updatedSong.imageURL,
      artist: updatedSong.artist,
      album: updatedSong.album,
      category: updatedSong.category,
      songUrl: updatedSong.audioUrl,
    };

    const result = await updateSongById(data._id, songDataToUpdate);
    if (result) {
      const updatedSongs = await getAllSongs();
      dispatch({ type: actionType.SET_ALL_SONGS, allSongs: updatedSongs.data });
      setShowUpdateIcon(true); // Show the update icon
      setTimeout(() => setShowUpdateIcon(false), 2000); // Hide it after 2 seconds
      setIsEditing(false);
    }
  };

  const handleDeleteSong = async () => {
    if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
      const res = await deleteSongById(data._id);
      if (res) {
        const updatedSongs = await getAllSongs();
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: updatedSongs.data });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedSong((prev) => ({ ...prev, imageURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div className="border p-4 rounded-md shadow-md w-80" whileHover={{ scale: 1.03 }}>
      {isEditing ? (
        <>
          {updatedSong.imageURL && (
            <img
              src={updatedSong.imageURL}
              alt={updatedSong.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
          )}
          <input
            type="text"
            name="name"
            value={updatedSong.name}
            onChange={handleInputChange}
            className="w-full border-b mb-2 p-1"
            placeholder="Song Name"
          />
          <select
            name="artist"
            value={updatedSong.artist}
            onChange={handleInputChange}
            className="w-full border-b mb-2 p-1"
          >
            <option value="">Select Artist</option>
            {singers.map((singer) => (
              <option key={singer._id} value={singer.name}>
                {singer.name}
              </option>
            ))}
          </select>
          <select
            name="album"
            value={updatedSong.album}
            onChange={handleInputChange}
            className="w-full border-b mb-2 p-1"
          >
            <option value="">Select Album</option>
            {albums.map((album) => (
              <option key={album._id} value={album.name}>
                {album.name}
              </option>
            ))}
          </select>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
          <audio ref={audioRef} src={updatedSong.audioUrl} />
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center mt-2"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      ) : (
        <>
          {data.imageURL && (
            <img
              src={data.imageURL}
              alt={data.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
          )}
          <p className="font-bold">SongName: {data.name}</p>
          <p className="text-sm text-gray-600">Sung By: {data.artist}</p>
          <p className="text-sm text-gray-600">Album:  {data.album}</p>
          <p className="text-sm text-gray-600">Category:  {data.category}</p>
          <p className="text-sm text-gray-600 italic mt-2">Created on: {new Date(data.createdAt).toLocaleString()}</p>
        </>
      )}

      <div className="flex items-center gap-4 mt-2">
        {isEditing ? (
          <button
            onClick={handleUpdateSong}
            className="bg-green-500 text-white px-4 py-1 rounded-md flex items-center"
          >
            <IoSave className="mr-1" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDeleteSong}
          className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center"
        >
          <AiOutlineDelete className="mr-1" />
        </button>
      </div>

      {showUpdateIcon && (
        <div className="mt-2 text-green-500 flex items-center">
          <AiOutlineCheckCircle className="mr-1" /> Song updated!
        </div>
      )}
    </motion.div>
  );
};

export default SongCard;
