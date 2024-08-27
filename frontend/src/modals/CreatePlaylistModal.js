import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/helpers";

const CreatePlaylistModal = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    if (!playlistName || !playlistThumbnail) {
      alert("Please provide a name and a thumbnail for the playlist.");
      return;
    }
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    if (response._id) {
      closeModal();
    } else {
      alert("Failed to create the playlist.");
    }
  };

  return (
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-80 flex justify-center items-center"
      style={{ zIndex: 100 }} // Added z-index for the modal
      onClick={closeModal}
    >
      <div
        className="bg-app-black w-1/3 rounded-md p-8"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Create Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            labelClassName={"text-white"}
            placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            label="Thumbnail"
            labelClassName={"text-white"}
            placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div
            className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
