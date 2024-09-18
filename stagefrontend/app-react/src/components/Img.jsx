import React from "react";

function Img({ restaurant }) {
  const images = [
    { src: `/src/assets/${restaurant.img2}`, alt: restaurant.nom },
    { src: `/src/assets/${restaurant.img3}`, alt: restaurant.nom },
    { src: `/src/assets/${restaurant.img4}`, alt: restaurant.nom },
    { src: `/src/assets/${restaurant.img5}`, alt: restaurant.nom },
  ];

  return (
    <div className="d-flex justify-content-center">
      <div className="d-none d-md-flex" style={{ marginTop: '20px' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="rounded"
            style={{
              width: '369px',
              height: '400px',
              border: 'none',
             
              margin: 0,
              borderRadius: '0'
            }}
          />
        ))}
      </div>

      {/* Carrousel pour les petits écrans */}
      <div id="carouselExampleIndicators" className="carousel slide d-md-none" data-bs-ride="carousel" style={{ marginTop: '20px' }}>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={image.src} className="d-block w-100" alt={image.alt} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Img;