import { useState } from "react";
import VideoPlayer from "../home/VideoPlayer";

const Card = (params = {}) => {
  const data = params.params;
  const [play, setPlay] = useState(false);
  // const { postID, creator, comment, reaction, submission } = { data };
  const { postID, creator, comment, reaction, submission } = data;
  const playVideo = () => {
    setPlay(!play);
    params.playVideo(data);
    console.log("Playing");
  };
  return (
    <div className="col-lg-4 col-6 p-1">
      <div className="card" onClick={playVideo}>
        <img src={submission.thumbnail} alt="Thumbnail" className="img-fluid" />
        <h3 className="text-truncate">
          {creator?.name ? creator?.name : "Creator"}
        </h3>
        <h5 className="text-truncate">
          {creator?.handle ? creator?.handle : " "}
        </h5>
      </div>
    </div>
  );
};

export default Card;
