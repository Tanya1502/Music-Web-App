import React from "react";
import IconText from "./IconText";

const Sidebar = ({ curActiveScreen }) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  return (
    <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
      <div>
        <div className="py-5">
          <IconText
            iconName={"material-symbols:home"}
            displayText={"Home"}
            targetLink={"/home"}
            active={curActiveScreen === "home"}
          />
          <IconText
            iconName={"material-symbols:search-rounded"}
            displayText={"Search"}
            active={curActiveScreen === "search"}
            targetLink={"/search"}
          />
          <IconText
            iconName={"icomoon-free:books"}
            displayText={"Library"}
            active={curActiveScreen === "library"}
            targetLink={"/library"}
          />
          <IconText
            iconName={"material-symbols:library-music-sharp"}
            displayText={"My Music"}
            targetLink="/myMusic"
            active={curActiveScreen === "myMusic"}
          />

          <IconText
            iconName={"material-symbols:upload"}
            displayText={"Upload Song"}
            targetLink="/uploadSong"
            active={curActiveScreen === "uploadSong"}
          />

          <IconText
            iconName={"material-symbols:add-box"}
            displayText={"Create Playlist"}
            onClick={() => {
              setCreatePlaylistModalOpen(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
