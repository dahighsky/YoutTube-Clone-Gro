export const fetchVideos = async ({ queryKey }) => {
  const page = queryKey[1];
  const res = await fetch(
    `https://internship-service.onrender.com/videos?page=${page}`
  );
  const data = await res.json();
  if (!res.ok) {
    console.log("Error fetching the Video");
    throw new Error(`details/${page} fetch not successful`);
  }
  return data.data;
};
