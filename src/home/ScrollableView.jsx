import Card from "../components/Card";
import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import ReactPlayer from "react-player";

const ScrollableView = ({ posts, onScroll, innerRef }) => {
  const [play, setPlay] = useState(null);
  console.log(play);
  const changePlay = (index) => {
    setPlay(index);
  };
  const playerParent = window;
  // const [width, setWidth] = useState((playerParent?.clientWidth * 80) / 100);
  // const [height, setHeight] = useState((width * 16) / 9);
  const [height, setHeight] = useState(playerParent?.innerHeight * 0.8);
  const [width, setWidth] = useState((height * 9) / 16);
  useEffect(() => {
    const handleWindowResize = () => {
      setHeight(playerParent?.innerHeight * 0.8);
      setWidth((height * 9) / 16);
      console.log("resize", height, width);
    };
    playerParent?.addEventListener("resize", handleWindowResize);
    return () => {
      playerParent?.removeEventListener("resize", handleWindowResize);
    };
  }, [height, width]);
  return (
    <div
      className="container-fluid row m-0 scrollable-view col-md-4 col-xsm-3"
      onScroll={onScroll}
      ref={innerRef}
      onClick={() => {
        console.log(innerRef.current);
      }}
    >
      {posts.map((item, index) => {
        return <Card params={item} key={index} playVideo={changePlay} />;
      })}
      {play && (
        <VideoPlayer>
          <div className="col-6">
            <h5 className="text-truncate">
              {play.creator?.name ? play.creator?.name : "Creator"}
            </h5>
            <h6 className="text-truncate">
              {play.creator?.handle ? play.creator?.handle : " "}
            </h6>
          </div>
          <div className="col-6">
            <ReactPlayer
              url={play?.submission?.mediaUrl}
              controls
              playing
              loop
              width={width}
              height={height}
            />
          </div>
        </VideoPlayer>
      )}
    </div>
  );
};

export default ScrollableView;
