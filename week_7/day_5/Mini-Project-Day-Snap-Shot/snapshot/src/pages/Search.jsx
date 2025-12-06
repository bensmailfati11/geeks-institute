import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchImages } from "../api/pexels";
import Gallery from "../components/Gallery";

const Search = () => {
  const { query } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchImages(query).then(setPhotos);
  }, [query]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Results for: {query}
      </h2>
      <Gallery images={photos} />
    </div>
  );
};

export default Search;
