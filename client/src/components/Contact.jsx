import React, { useState } from 'react';
import Header from './Header'; // Import the Header component
import { useStateValue } from '../Context/StateProvider';
import axios from "axios";

const Contact = () => {
  const [{ user }] = useStateValue(); // Access the user from the state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

//     try {
//       // Send form data to backend API
//       const response = await fetch('http://localhost:4000/api/feedback/save', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           message: formData.message
//         })
//       });

//       // Check if the response is successful
//       if (response.ok) {
//         setFormStatus('Feedback submitted successfully!');
//         setFormData({ name: '', email: '', message: '' }); // Reset form fields
//       } else {
//         setFormStatus('Error submitting feedback. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       setFormStatus('Error submitting feedback. Please try again.');
//     }
//   };





try {
    // Send form data to backend API using axios
    const res = await axios.post('http://localhost:4000/api/feedback/save', {
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
  
    // Check if the response contains the artist data
    if (res.status === 200) {
      console.log('Feedback submitted:', res.data);
      setFormStatus('Feedback submitted successfully!');
      
      // Clear form fields after successful submission
      setFormData({ name: '', email: '', message: '' });
  
      return res.data; // Return the data if needed
    } else {
      // Handle any unexpected responses
      setFormStatus('Error submitting feedback. Please try again.');
      return null;
    }
  } catch (error) {
    // Catch any errors during the request
    console.error('Error submitting feedback:', error);
    setFormStatus('Error submitting feedback. Please try again.');
    return null;
  }}












  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header /> {/* Include the Header component */}

      {/* <div className="p-4">
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <img
              src={user.user.imageURL}
              alt="User Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <p className="text-lg font-semibold">Name: {user.user.name}</p>
            <p className="text-lg">Email: {user.user.email}</p>
            <p className="text-lg">Role: {user.user.role}</p>
          </div>
        ) : (
          <p className="text-red-500">No user information available. Please log in.</p>
        )}
      </div> */}

      {/* Contact Us form */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mt-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>

          {formStatus && (
            <p className="text-green-500 mt-4">{formStatus}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
