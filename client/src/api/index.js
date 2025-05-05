

import axios from "axios";


const baseURL = "https://mernstack-musicapp.onrender.com";
//const baseURL2 = 'http://localhost:5000/';

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    //alert('srror');
    return res.data;
  } catch (error) {
    
    return null;
  }
};

export const getAllFeedbacks = async () => {
  try {
    const res = await axios.get(`${baseURL}api/feedback/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};


export const deleteFeedbackById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/feedback/delete/${id}`);
    return res.data; // Return success message or result from the server
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return null; // Return null in case of error
  }
};



export const deleteAlbumById = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/albums/delete/${id}`); // Ensure this URL matches your backend route
    return response.data; // You may not need this if you don't use the response
  } catch (error) {
    console.error("Error deleting album:", error);
    throw error; // Propagate the error for handling in DashboardAlbums
  }
};




export const deleteArtistById = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}api/artists/delete/${id}`);
    alert(response.data.message); // Show success message
    return response.data;
  } catch (error) {
    console.error('Error deleting artist:', error);
    alert('Failed to delete artist and songs');
    throw error;
  }
    
};



export const updateArtistById = (artistId, updatedData) => {
  return axios.put(`${baseURL}/api/artists/update/${artistId}`, updatedData);
};


export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/delete/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};



export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artists/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/songs/save`, { ...data });
    return (await res).data.song;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    // Step 1: Send a DELETE request to the API endpoint
    const res = await axios.delete(`${baseURL}api/songs/delete/${id}`);
    
    // Step 2: If the song deletion is successful, also remove it from all albums
    if (res.data.success) {
      // Assuming the API returns a success message
      // Now remove the song from all albums
      const response = await axios.delete(`${baseURL}/api/albums/delete/${res.album._id}`);
      
    }
    
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error deleting song:", error);
    return null; // Return null in case of an error
  }
};

export const updateSongById = async (id, updatedData) => {
  try {
    const res = await axios.put(`${baseURL}api/songs/update/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating song:", error);
    return null;
  }
};
