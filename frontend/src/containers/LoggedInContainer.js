import {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { Icon } from "@iconify/react";
import { Howl } from "howler";
import IconText from "../components/shared/IconText";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/helpers";
import Header from "../components/shared/Header";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    currentSong,
    // eslint-disable-next-line
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (soundPlayed) {
      soundPlayed.play();
    }
  };

  const pauseSound = () => {
    if (soundPlayed) {
      soundPlayed.pause();
    }
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-full w-full bg-app-black flex flex-col">
      {/* Playlist modals */}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            // console.log("Closing create playlist modal");
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      <div className="flex h-full w-full relative">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 ${
            currentSong ? "h-[calc(100%-4rem)]" : "h-full"
          } bg-black md:relative md:w-1/5 ${
            isSidebarOpen ? "block w-full" : "hidden"
          } md:block md:w-1/5 md:flex md:flex-col md:justify-between md:pb-10`}
          style={{ zIndex: 50 }}
        >
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
                  console.log("Opening create playlist modal"); // Debugging
                  setCreatePlaylistModalOpen(true);
                }}
              />
            </div>
          </div>
          ;
        </div>

        {/* Main content */}
        <div
          className={`flex-1 flex flex-col ${
            currentSong ? "h-[calc(100%-4rem)]" : "h-full"
          } bg-gray-700 overflow-auto`}
        >
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Main content area */}
          <div className="content p-8 pt-0 flex-1 overflow-auto">
            {children}
          </div>
        </div>

        {/* Current playing song */}
        {currentSong && (
          <div className="fixed bottom-0 left-0 w-full h-16 bg-black text-white flex items-center px-4">
            <div className="w-1/4 flex items-center">
              <img
                src={currentSong.thumbnail}
                alt="currentSongThumbnail"
                className="h-14 w-14 rounded"
              />
              <div className="pl-4">
                <div className="text-sm hover:underline cursor-pointer">
                  {currentSong.name}
                </div>
                <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                  {currentSong.artist.name}
                </div>
              </div>
            </div>
            <div className="w-1/2 flex justify-center h-full flex-col items-center">
              <div className="flex w-1/3 justify-between items-center">
                {/* Controls for the playing song */}
                <Icon
                  icon="ph:shuffle-fill"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
                <Icon
                  icon="mdi:skip-previous-outline"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
                <Icon
                  icon={
                    isPaused
                      ? "ic:baseline-play-circle"
                      : "ic:baseline-pause-circle"
                  }
                  fontSize={50}
                  className="cursor-pointer text-gray-500 hover:text-white"
                  onClick={togglePlayPause}
                />
                <Icon
                  icon="mdi:skip-next-outline"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
                <Icon
                  icon="ic:twotone-repeat"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
              </div>
              {/* Progress Bar Here */}
            </div>
            <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
              <Icon
                icon="ic:round-playlist-add"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={() => {
                  setAddToPlaylistModalOpen(true);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInContainer;
