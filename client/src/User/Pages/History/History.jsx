import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import axios from "axios";
import style from "./history.module.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("uid");

    if (userId) {
      axios
        .get(`http://localhost:5002/recognized-songsMain?userId=${userId}`)
        .then((response) => setHistory(response.data.songs))
        .catch((error) => console.error("Error fetching history:", error));

      axios
        .get(`http://localhost:5002/recommended-songsMain?userId=${userId}`)
        .then((response) => setRecommended(response.data.songs))
        .catch((error) => console.error("Error fetching recommendations:", error));
    }
  }, []);

  return (
    <div className={style.main}>
      <Typography variant="h4" gutterBottom>
        My History
      </Typography>
      <Stack spacing={2}>
        {history.length === 0 ? (
          <Typography>No history found.</Typography>
        ) : (
          history.map((song) => (
            <Card key={song._id} sx={{ padding: "10px" }}>
              <CardContent>
                <Typography variant="h6">{song.title}</Typography>
                <Typography variant="body2">Artist: {song.artist}</Typography>
                <Typography variant="body2">Album: {song.album || "N/A"}</Typography>
                <Typography variant="body2">Genre: {song.genre || "N/A"}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        Recommended Songs
      </Typography>
      <Stack spacing={2}>
        {recommended.length === 0 ? (
          <Typography>No recommendations yet.</Typography>
        ) : (
          recommended.map((song) => (
            <Card key={song._id} sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
              <Avatar src={song.coverImage} sx={{ width: "50px", height: "50px", marginRight: "10px" }} />
              <CardContent>
                <Typography variant="h6">{song.title}</Typography>
                <Typography variant="body2">Artist: {song.artist}</Typography>
                <Typography variant="body2">Album: {song.album || "N/A"}</Typography>
                <Typography variant="body2">Genre: {song.genre || "N/A"}</Typography>
                <Typography variant="body2">
                  <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                  </a>
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </div>
  );
};

export default HistoryPage;
