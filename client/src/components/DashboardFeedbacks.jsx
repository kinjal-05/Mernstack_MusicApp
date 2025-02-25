import React, { useEffect, useState } from "react";
import { getAllFeedbacks, deleteFeedbackById } from "../api"; // Ensure both functions are defined in your api file
import FeedbackCard from "./FeedbackCard"; // A component to display each feedback

const DashboardFeedbacks = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Fetch feedback data from the server
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getAllFeedbacks(); // Fetch all feedbacks
        setFeedbackData(response.data); // Set feedback data in state
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Handle deleting a feedback
  const handleDeleteFeedback = async (id) => {
    try {
      await deleteFeedbackById(id); // Call API to delete the feedback by ID
      setFeedbackData(feedbackData.filter((feedback) => feedback._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      {/* <h2 className="text-xl font-bold">User Feedback</h2> */}
      <div className="w-full py-12 min-h-[400px] overflow-y-auto">
        {feedbackData.length > 0 ? (
          feedbackData.map((feedback) => (
            <div className="w-full mb-4"> 
            <FeedbackCard
              key={feedback._id}
              data={feedback}
              onDelete={handleDeleteFeedback} // Pass delete handler to FeedbackCard
            />
            </div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardFeedbacks;
