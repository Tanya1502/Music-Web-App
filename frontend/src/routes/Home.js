import React from "react";
import IconText from "../components/shared/IconText";
import PlaylistView from "../components/PlaylistView";
import {
  focusCardsData,
  spotifyPlaylistsCardData,
} from "../components/dummyData";

const Home = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-1/5 bg-black ">
        <div className="logoDiv p-6">
          <img />
        </div>
        <div>
          <IconText iconName={"ic:round-home"} displayText={"Home"} />
          <IconText
            iconName={"material-symbols:search"}
            displayText={"Search"}
          />
          <IconText iconName={"mdi:bookshelf"} displayText={"Your library"} />
        </div>

        <div>
          <IconText
            iconName={"material-symbols:add"}
            displayText={"Create Playlist"}
          />
        </div>
      </div>
      <div className="h-full w-4/5 overflow-auto">
        <div className="content p-8 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView
            titleText="Spotify Playlists"
            cardsData={spotifyPlaylistsCardData}
          />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
