import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VideoPlayer = ({ children }) => {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);
  if (!videoRef.current) {
    videoRef.current = document.createElement("div");
  }
  useEffect(() => {
    const videoPlayerRoot = document.getElementById("videoPlayer");
    videoPlayerRoot.innerHTML = "";
    videoPlayerRoot.appendChild(videoRef.current);

    return () => {
      console.log("Return");
      videoPlayerRoot.removeChild(videoRef.current);
    };
  }, []);

  // return createPortal(<div>{children}</div>, videoRef.current);
  return (
    play &&
    createPortal(
      <div className="row m-0" style={{}} id="player">
        {children}
      </div>,
      videoRef.current
    )
  );
};

export default VideoPlayer;
