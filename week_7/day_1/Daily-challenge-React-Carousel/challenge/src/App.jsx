import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <Carousel
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showStatus={true}
        showIndicators={true}
      >
        <div>
          <img src="./public/hong-kong.jpg" />
          <p className="legend">Hong Kong</p>
        </div>

        <div>
          <img src="./public/macao.webp" />
          <p className="legend">Macao</p>
        </div>

        <div>
          <img src="./public/japan.webp" />
          <p className="legend">Japan</p>
        </div>

        <div>
          <img src="./public/las-vegas.webp" />
          <p className="legend">Las Vegas</p>
        </div>
      </Carousel>
    </div>
  );
}

export default App;
