import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home.js";
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome.js";
import MyMusic from "./routes/MyMusic.js";
import SearchPage from "./routes/SearchPage.js";
import UploadSong from "./routes/UploadSong.js";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylistView.js";
import songContext from "./contexts/songContext";
import { useState } from "react";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // Logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // Logged out routes
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
