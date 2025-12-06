import React, { useEffect, useState } from "react";
import Widget from "../../components/widget/Widget";
import axios from "axios";

const HomeElement = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
    
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:5002/userCount");
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  return (
    <div>
      <div className="widgets">
        <Widget type="user" count={userCount} />
      </div>
    </div>
  );
};

export default HomeElement;
