import { useState } from "react";
import VideoPlayer from "../home/VideoPlayer";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (params = {}) => {
  library.add(faThumbsUp);
  const data = params.params;
  const [play, setPlay] = useState(false);
  // const { postID, creator, comment, reaction, submission } = { data };
  const { postID, creator, comment, reaction, submission } = data;
  const playVideo = () => {
    setPlay(!play);
    params.playVideo(data);
    console.log("Playing ", data);
    // console.log("Playing");
  };
  return (
    <div className="col-md-4 col-6 p-1">
      <div className="video-card" onClick={playVideo}>
        <img
          src={submission.thumbnail}
          alt="Thumbnail"
          className="img-fluid video-thumbnail"
        />
        <div className="thumbnail-data">
          <div>
            {/* <img
              src={creator?.pic}
              alt="Avatar"
              className="creator-avatar"
              style={{ width: "2rem", height: "2rem" }}
            /> */}
            <span className="text-truncate">@{creator?.handle}</span>
          </div>
          <div className="px-2 d-flex align-items-center">
            <FontAwesomeIcon icon={faThumbsUp} size="sm" className="me-2" />
            <span>{reaction?.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
