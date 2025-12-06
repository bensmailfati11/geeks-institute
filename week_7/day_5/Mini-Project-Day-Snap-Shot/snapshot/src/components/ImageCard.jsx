const ImageCard = ({ img }) => {
  return (
    <div style={styles.card}>
      <img src={img.src.large} alt={img.alt} style={styles.img} />
    </div>
  );
};

const styles = {
  card: {
    overflow: "hidden",
    borderRadius: "10px",
    transition: "0.4s",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.4s",
  },
};

export default ImageCard;
