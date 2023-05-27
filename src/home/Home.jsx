import { useState, useEffect, useRef } from "react";
import ScrollableView from "./ScrollableView";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";
function Home() {
  const innerRef = useRef(null);
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(-1);
  const [data, setData] = useState([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://internship-service.onrender.com/videos?page=${currPage}`
      );
      const result = await res.json();
      if (!res.ok) {
        console.log("Error fetching the Video");
        throw new Error(`details/${page} fetch not successful`);
      }
      if (!result.data.posts.length) {
        setLastList(true);
        console.log("Last List");
        return;
      }
      setPrevPage(currPage);
      setData([...data, ...result.data.posts]);
    };
    if (!lastList && prevPage !== currPage) {
      console.log("Fetching", currPage, prevPage);
      fetchVideos();
      console.log(data);
    }
  }, [currPage, lastList, prevPage, data]);

  const onScroll = () => {
    if (innerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = innerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setCurrPage(currPage + 1);
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="row m-0">
        <div className="col-md-8 col-xsm-9" id="videoPlayer"></div>
        <ScrollableView posts={data} onScroll={onScroll} innerRef={innerRef} />
      </div>
    </div>
  );
}

export default Home;
