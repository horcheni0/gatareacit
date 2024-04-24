import React from 'react';

function LatestNewsSection() {
  return (
    <div className="page-section bg-light">
      <div className="container">
        <h2 className="text-center wow fadeInUp">Latest News</h2>
        <div className="row mt-5">
          <div className="col-lg-4 py-2 wow zoomIn">
            <div className="card-blog">
              <div className="header">
                <img src="assets/img/im.jpg" alt="News Image 1" />
              </div>
              <div className="body">
                <h3 className="post-title">News Title 1</h3>
                <div className="site-info">
                  <div className="avatar mr-2">
                    <div className="avatar-img">
                      <img src="assets/img/im.jpg" alt="Author Image" />
                    </div>
                    <span>Roger Adams</span>
                  </div>
                  <span className="mai-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 py-2 wow zoomIn">
            <div className="card-blog">
              <div className="header">
                <div className="page-hero bgg-video">
                  <video autoPlay muted loop poster="path_to_poster_image.jpg" id="bg-video">
                    <source src="assets/img/vii.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="body">
                <h3 className="post-title">News Title 2</h3>
                <div className="site-info">
                  <div className="avatar mr-2">
                    <div className="avatar-img">
                      <img src="assets/img/im.jpg" alt="Author Image" />
                    </div>
                    <span>Roger Adams</span>
                  </div>
                  <span className="mai-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 py-2 wow zoomIn">
            <div className="card-blog">
              <div className="header">
                <div className="page-hero bgg-video">
                  <video autoPlay muted loop poster="path_to_poster_image.jpg" id="bgg-video">
                    <source src="assets/img/VIII.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="body">
                <h3 className="post-title">News Title 3</h3>
                <div className="site-info">
                  <div className="avatar mr-2">
                    <div className="avatar-img">
                      <img src="assets/img/im.jpg" alt="Author Image" />
                    </div>
                    <span>Roger Adams</span>
                  </div>
                  <span className="mai-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestNewsSection;
