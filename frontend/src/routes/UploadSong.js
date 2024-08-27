import { useState } from "react";
import { Icon } from "@iconify/react";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import TextWithHover from "../components/shared/TextWithHover";
import { makeAuthenticatedPOSTRequest } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import Header from "../components/shared/Header";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create song");
      return;
    }
    alert("Success");
    navigate("/home");
  };

  return (
    <LoggedInContainer curActiveScreen={"uploadSong"}>
      <div className="h-full w-full md:w-4/5 bg-gray-700 overflow-auto">
        <div className="content p-4 md:p-8 pt-0 overflow-auto">
          <div className="text-xl md:text-2xl font-semibold mb-5 text-white mt-8">
            Upload Your Music
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-3">
            <div className="flex-1">
              <TextInput
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-black text-white rounded-full p-3 w-1/2 md:w-1/3 lg:w-1/4">
                {uploadedSongFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-white w-full md:w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold text-gray-900"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
