import ImageCard from "./ImageCard";

const Gallery = ({ images }) => {
  return (
    <div style={styles.grid}>
      {images.map((img) => (
        <ImageCard key={img.id} img={img} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};

export default Gallery;
