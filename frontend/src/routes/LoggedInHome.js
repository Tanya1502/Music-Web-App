import React from "react";
import PlaylistView from "../components/PlaylistView";
import {
  focusCardsData,
  spotifyPlaylistsCardData,
} from "../components/dummyData";
import LoggedInContainer from "../containers/LoggedInContainer";

const LoggedInHome = () => {
  return (
    <LoggedInContainer curActiveScreen="home">
      <div className="p-4 md:p-8">
        <PlaylistView titleText="Focus" cardsData={focusCardsData} />
        <PlaylistView
          titleText="Spotify Playlists"
          cardsData={spotifyPlaylistsCardData}
        />
        <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
      </div>
    </LoggedInContainer>
  );
};

export default LoggedInHome;
