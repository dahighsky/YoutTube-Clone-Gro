import Card from "../components/Card";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ReactPlayer from "react-player";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as rThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as sThumbsUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ScrollableView = ({ posts, onScroll, innerRef }) => {
  library.add(rThumbsUp, sThumbsUp);
  const [play, setPlay] = useState(null);
  const changePlay = (index) => {
    setPlay(index);
  };
  return (
    <div
      className="container-fluid row m-0 scrollable-view col-lg-4 py-4"
      onScroll={onScroll}
      ref={innerRef}
    >
      {!posts.length && (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ "font-size": "2rem" }}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
        </div>
      )}
      {posts &&
        posts.map((item, index) => {
          return <Card params={item} key={index} playVideo={changePlay} />;
        })}
      {!play && !posts.length && (
        <VideoPlayer>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ "font-size": "2rem" }}
          >
            <h4>Fetching Your Videos!!!</h4>
          </div>
        </VideoPlayer>
      )}
      {!play && posts.length && (
        <VideoPlayer>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ "font-size": "2rem" }}
          >
            <h4>Select a Video to play</h4>
          </div>
        </VideoPlayer>
      )}
      {play && (
        <VideoPlayer>
          <div className="col-sm-6 card video-details bg-black p-4 rounded">
            <h5 className="text-truncate">
              {play.submission?.title ? play.submission.title : "Creator"}
            </h5>
            <div className="d-flex align-items-center justify-content-between my-3">
              <h6 className="text-truncate mb-2">
                <img
                  src={play?.creator?.pic}
                  alt="Avatar"
                  className="creator-avatar me-2"
                />
                {play.creator?.name ? play.creator?.name : "Creator's Name"}
              </h6>
              <div className="px-2 d-flex align-items-center">
                <FontAwesomeIcon
                  icon={sThumbsUp}
                  size="xl"
                  shake
                  className="me-2 bg-dark-gray p-3 rounded-pill"
                />
                <span>{play.reaction?.count}</span>
              </div>
            </div>
            <p className="mt-2 bg-dark-gray p-4 rounded">
              {play.submission?.description
                ? play.submission.description
                : "Video Description"}
            </p>
          </div>
          <div className="col-sm-6 video-play-window p-0 p-sm-2">
            <div className="window-data">
              <div>
                <img
                  src={play?.creator?.pic}
                  alt="Avatar"
                  className="creator-avatar"
                />
                <span>@{play.creator?.handle}</span>
              </div>
            </div>
            <div className="player-wrapper">
              <ReactPlayer
                url={play?.submission?.mediaUrl}
                controls
                playing
                loop
                width={"100%"}
                height={"90vh"}
                className="react-player"
              ></ReactPlayer>
            </div>
          </div>
        </VideoPlayer>
      )}
    </div>
  );
};

export default ScrollableView;
