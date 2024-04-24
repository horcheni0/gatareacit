import React from 'react';

function PageHero() {
  return (
    <div className="page-hero bg-video">
      <video autoPlay muted loop poster="path_to_poster_image.jpg" id="bg-video">
        <source src="assets/img/buuu.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default PageHero;
