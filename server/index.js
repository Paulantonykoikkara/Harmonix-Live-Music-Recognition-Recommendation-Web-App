const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const request = require("request");
const multer = require("multer");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5002;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.listen(port, () => {
  try {
    console.log(`Server is running ${port}`);
    mongoose.connect(
      /*"mongodb+srv://naveenu364:naveenu364@cluster0.ayguf.mongodb.net/dbMusicR",*/
      "mongodb+srv://paulantony8547_db_user:paul@2004@cluster-paul.j83xcu9.mongodb.net/?appName=Cluster-paul"
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("db connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

// Privacy Schema
const privacySchemaStructure = new mongoose.Schema({
  privacyName: {
    type: String,
    required: true,
  },
});
const Privacy = mongoose.model("privacySchema", privacySchemaStructure);

// FAQ Schema
const faqSchemaStructure = new mongoose.Schema({
  faqName: {
    type: String,
    required: true,
  },
});
const Faq = mongoose.model("faqSchema", faqSchemaStructure);

// Registration Schema
const registrationSchemaStructure = new mongoose.Schema({
  registrationName: {
    type: String,
    required: true,
  },
  registrationEmail: {
    type: String,
    required: true,
  },
  registrationUsername: {
    type: String,
    required: true,
  },
  registrationPassword: {
    type: String,
    required: true,
  },
});
const Registration = mongoose.model(
  "registrationSchema",
  registrationSchemaStructure
);

// Recognized Song Schema
const recognizedSongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  genre: {
    type: String,
  },
  spotifyUrl: {
    type: String,
  },
  recognizedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registrationSchema",
  },
});
const RecognizedSong = mongoose.model("RecognizedSong", recognizedSongSchema);

// Recommended Song Schema
const recommendedSongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  genre: {
    type: String,
  },
  spotifyUrl: {
    type: String,
  },
  previewUrl: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  recommendedAt: {
    type: Date,
    default: Date.now,
  },
  relatedRecognizedSong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecognizedSong",
  },
});
const RecommendedSong = mongoose.model(
  "RecommendedSong",
  recommendedSongSchema
);

// Privacy Routes
app.post("/privacy", async (req, res) => {
  try {
    const { privacyName } = req.body;
    let privacy = await Privacy.findOne({ privacyName });

    if (privacy) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Privacy already exists" }] });
    }

    privacy = new Privacy({ privacyName });
    await privacy.save();
    res.json({ message: "Privacy inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/fetchprivacy", async (req, res) => {
  try {
    const privacies = await Privacy.find();
    res.json({ success: true, privacies });
  } catch (error) {
    console.error("Error fetching privacy policies:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching privacy policies",
        error: error.message,
      });
  }
});

// FAQ Routes
app.post("/faq", async (req, res) => {
  try {
    const { faqName } = req.body;
    let faq = await Faq.findOne({ faqName });

    if (faq) {
      return res.status(400).json({ errors: [{ msg: "FAQ already exists" }] });
    }

    faq = new Faq({ faqName });
    await faq.save();
    res.json({ message: "FAQ inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/fetchfaq", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json({ success: true, faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching FAQs",
        error: error.message,
      });
  }
});

// Registration Routes
app.post("/registration", async (req, res) => {
  try {
    const {
      registrationName,
      registrationEmail,
      registrationUsername,
      registrationPassword,
    } = req.body;
    let registration = await Registration.findOne({ registrationEmail });

    if (registration) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Registration already exists" }] });
    }

    registration = new Registration({
      registrationName,
      registrationEmail,
      registrationUsername,
      registrationPassword,
    });
    await registration.save();
    res.json({ message: "Registration inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Password API
app.put("/updateChangePasswordUser/:id", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const user = await Registration.findById(id);
  console.log(id);
  console.log(password);
  

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
    const updatedUser = await Registration.findByIdAndUpdate(
      id,
      { registrationPassword: password },
      { new: true }
    );
    console.log(updatedUser);

    res.json({ message: "Password updated successfully", updatedUser });

});
// Get User by ID
app.get("/UserMain/:id", async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

app.get("/userCount", async (req, res) => {
  try {
    const users = await Registration.find();
    const userCount = users.length; // Get the count of users
    res.json({ userCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await Registration.find();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// Fetch recognized songs for a specific user
app.get("/recognized-songsMain", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {}; // Filter by userId if provided
    const songs = await RecognizedSong.find(filter).sort({ recognizedAt: -1 });
    res.json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching recognized songs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching recognized songs",
        error: error.message,
      });
  }
});

// Fetch recommended songs for a specific user
app.get("/recommended-songsMain", async (req, res) => {
  try {
    const { userId } = req.query;
    let songs;

    if (userId) {
      const recognizedSongs = await RecognizedSong.find({ userId });
      const recognizedIds = recognizedSongs.map((song) => song._id);
      songs = await RecommendedSong.find({
        relatedRecognizedSong: { $in: recognizedIds },
      })
        .populate("relatedRecognizedSong", "title artist")
        .sort({ recommendedAt: -1 });
    } else {
      songs = await RecommendedSong.find()
        .populate("relatedRecognizedSong", "title artist")
        .sort({ recommendedAt: -1 });
    }

    res.json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching recommended songs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching recommended songs",
        error: error.message,
      });
  }
});

// Recognized and Recommended Song Routes
app.get("/recognized-songs", async (req, res) => {
  try {
    const songs = await RecognizedSong.find().sort({ recognizedAt: -1 });
    res.json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching recognized songs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching recognized songs",
        error: error.message,
      });
  }
});

app.get("/recommended-songs", async (req, res) => {
  try {
    const songs = await RecommendedSong.find()
      .populate("relatedRecognizedSong", "title artist")
      .sort({ recommendedAt: -1 });
    res.json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching recommended songs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching recommended songs",
        error: error.message,
      });
  }
});

// Setup file upload using multer
const upload = multer({ dest: "/tmp/uploads/" });

// ACRCloud credentials
const defaultOptions = {
  host: process.env.ACR_HOST,
  endpoint: "/v1/identify",
  signature_version: "1",
  data_type: "audio",
  secure: true,
  access_key: process.env.ACR_CLOUD_ACCESS_KEY,
  access_secret: process.env.ACR_CLOUD_SECRET_KEY,
};

// Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Spotify authentication
async function authenticateSpotify() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
    return true;
  } catch (err) {
    console.error("Spotify authentication failed:", err);
    throw err;
  }
}

// ACRCloud utility functions
function buildStringToSign(
  method,
  uri,
  accessKey,
  dataType,
  signatureVersion,
  timestamp
) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join(
    "\n"
  );
}

function sign(signString, accessSecret) {
  return crypto
    .createHmac("sha1", accessSecret)
    .update(Buffer.from(signString, "utf-8"))
    .digest()
    .toString("base64");
}

function identify(data, options, cb) {
  const currentData = new Date();
  const timestamp = Math.floor(currentData.getTime() / 1000);

  const stringToSign = buildStringToSign(
    "POST",
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp
  );
  const signature = sign(stringToSign, options.access_secret);

  const formData = {
    sample: data,
    access_key: options.access_key,
    data_type: options.data_type,
    signature_version: options.signature_version,
    signature: signature,
    sample_bytes: data.length,
    timestamp: timestamp,
  };

  request.post(
    {
      url: `http://${options.host}${options.endpoint}`,
      method: "POST",
      formData: formData,
    },
    cb
  );
}

// Get similar songs based on genre
async function getSimilarSongs(recognizedTrack) {
  try {
    const genre = recognizedTrack.genres?.[0]?.name || "pop";
    const artistName = recognizedTrack.artists?.[0]?.name;
    const searchQuery = `genre:${genre}`;

    const result = await spotifyApi.searchTracks(searchQuery, {
      limit: 5,
      market: "US",
    });

    if (!result.body.tracks.items.length) {
      console.log("No tracks found for genre:", genre);
      return [];
    }

    return result.body.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      url: track.external_urls.spotify,
      album: track.album.name,
      cover_image: track.album.images[0]?.url,
      preview_url: track.preview_url,
      popularity: track.popularity,
      genre: genre,
    }));
  } catch (err) {
    console.error("Error getting similar songs:", err);
    return [];
  }
}

// Identify route with schema integration
app.post("/identify", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an audio file." });
    }

    const filePath = req.file.path;
    const bitmap = fs.readFileSync(filePath);

    identify(
      Buffer.from(bitmap),
      defaultOptions,
      async function (err, httpResponse, body) {
        try {
          if (err) throw err;

          const recognitionResult = JSON.parse(body);

          if (
            recognitionResult.status.code === 0 &&
            recognitionResult.metadata.music
          ) {
            const recognizedTrack = recognitionResult.metadata.music[0];
            let savedRecognizedSong;
            // Save recognized song
            console.log(req.body.userId);

            if (req.body.userId) {
              const newRecognizedSong = new RecognizedSong({
                userId: req.body.userId,
                title: recognizedTrack.title,
                artist: recognizedTrack.artists?.[0]?.name || "Unknown Artist",
                album: recognizedTrack.album?.name,
                genre: recognizedTrack.genres?.[0]?.name || "Unknown",
                spotifyUrl: recognizedTrack.external_urls?.spotify,
              });
              savedRecognizedSong = await newRecognizedSong.save();
            } else {
              const newRecognizedSong = new RecognizedSong({
                title: recognizedTrack.title,
                artist: recognizedTrack.artists?.[0]?.name || "Unknown Artist",
                album: recognizedTrack.album?.name,
                genre: recognizedTrack.genres?.[0]?.name || "Unknown",
                spotifyUrl: recognizedTrack.external_urls?.spotify,
              });
              savedRecognizedSong = await newRecognizedSong.save();
            }

            await authenticateSpotify();
            const similarSongs = await getSimilarSongs(recognizedTrack);

            // Save recommended songs
            const recommendedSongs = await Promise.all(
              similarSongs.map(async (song) => {
                const newRecommendedSong = new RecommendedSong({
                  title: song.name,
                  artist: song.artist,
                  album: song.album,
                  genre: song.genre,
                  spotifyUrl: song.url,
                  previewUrl: song.preview_url,
                  coverImage: song.cover_image,
                  popularity: song.popularity,
                  relatedRecognizedSong: savedRecognizedSong._id,
                });
                return await newRecommendedSong.save();
              })
            );

            // Clean up uploaded file
            fs.unlink(filePath, (err) => {
              if (err) console.error("Error deleting file:", err);
            });

            res.json({
              recognized_song: {
                id: savedRecognizedSong._id,
                title: savedRecognizedSong.title,
                artist: savedRecognizedSong.artist,
                album: savedRecognizedSong.album,
                genre: savedRecognizedSong.genre,
                spotifyUrl: savedRecognizedSong.spotifyUrl,
              },
              similar_songs: recommendedSongs.map((song) => ({
                id: song._id,
                title: song.title,
                artist: song.artist,
                album: song.album,
                genre: song.genre,
                spotifyUrl: song.spotifyUrl,
                previewUrl: song.previewUrl,
                coverImage: song.coverImage,
                popularity: song.popularity,
              })),
              genre_used: recognizedTrack.genres?.[0]?.name || "pop",
            });
          } else {
            res.status(400).json({
              message: "No song identified.",
              details: recognitionResult.status,
            });
          }
        } catch (error) {
          console.error("Error processing recognition result:", error);
          res
            .status(500)
            .json({ error: "Failed to process recognition result" });
        }
      }
    );
  } catch (error) {
    console.error("Error in /identify route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Registration.findOne({
      registrationEmail: email,
      registrationPassword: password,
    });

    const admin = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    });

    if (user) {
      res.send({
        id: user._id,
        login: "User",
      });
    }

    if (admin) {
      res.send({
        id: admin._id,
        login: "Admin",
      });
    }
    if (!user && !admin) {
      res.send({
        login: "error",
      });
    }
  } catch (err) {
    console.error("Error", err);
  }
});

//AdminSchema

const adminSchemaStructure = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});
const Admin = mongoose.model("adminSchema", adminSchemaStructure);

//AdminPost

app.post("/Admin", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    let admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    }

    admin = new Admin({
      adminName,
      adminEmail,
      adminPassword,
    });

    await admin.save();

    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin Select or Find

app.get("/Admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.send(admin).status(200);
    }
  } catch (err) {
    console.error("Error Finding Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Admin Delete

app.delete("/Admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully", deletedAdmin });
    }
  } catch (err) {
    console.error("Error deleting Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Complaint Schema

const complaintSchemastructure = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  reply: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },
});

//Insert Complaint

const Complaint = mongoose.model("complaintSchema", complaintSchemastructure);
app.post("/Complaint", async (req, res) => {
  const { content, userId } = req.body;
  try {
    let complaint = new Complaint({
      content,
      userId,
    });

    await complaint.save();

    res.json({ message: "complaint inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// select Complaint

app.get("/Complaint", async (req, res) => {
  const complaint = await Complaint.find();
  res.send({ complaint });
});

app.get("/Complaint/:Id", async (req, res) => {
  const complaint = await Complaint.find({ userId: req.params.Id });
  res.send({ complaint });
});

app.delete("/Complaint/:Id", async (req, res) => {
  const complaint = await Complaint.findByIdAndDelete(req.params.Id);
  res.send({ complaint });
});

//Complaint update

app.put("/updateComplaint/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { reply } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        reply,
      },
      { new: true }
    );
    res.json(updatedComplaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
