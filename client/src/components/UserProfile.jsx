//import React from "react";
//import Header from "./Header";

// const UserProfile = () => {
//   return (
//     <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
//       <Header />
//       User Profile
//     </div>
//   );
// };

// export default UserProfile;




// import React from 'react';
// import { useStateValue } from '../Context/StateProvider';

// const UserProfile = () => {
//   const [{ user }] = useStateValue(); // Access the user from the state

//   return (
//     <div className="p-4">
//       {user ? (
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//           <img
//             src={user.user.imageURL}
//             alt="User Profile"
//             className="w-32 h-32 rounded-full mb-4"
//           />
//           <p className="text-lg font-semibold">Name: {user.user.name}</p>
//           <p className="text-lg">Email: {user.user.email}</p>
//           <p className="text-lg">Role: {user.user.role}</p>
//           {/* Add any other user details you want to display */}
//         </div>
//       ) : (
//         <p className="text-red-500">No user information available. Please log in.</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;












import React from 'react';
import Header from './Header'; // Import the Header component
import { useStateValue } from '../Context/StateProvider';

const UserProfile = () => {
  const [{ user }] = useStateValue(); // Access the user from the state

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header /> {/* Include the Header component */}
      
      <div className="p-8">
        {user ? (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
            <img
              src={user.user.imageURL}
              alt="User Profile"
              className="w-40 h-40 rounded-full mb-6 border-4 border-white-400 shadow-md"
            />
            <p className="text-lg font-semibold">Name: {user.user.name}</p>
            <p className="text-lg">Email: {user.user.email}</p>
            <p className="text-lg">Role: {user.user.role}</p>
            {/* Add any other user details you want to display */}
          </div>
        ) : (
          <p className="text-red-500">No user information available. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;


