import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Explore = ({ filter }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Initial number of cards

  useEffect(() => {
    let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) {
      url += `?filter=${filter}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, [filter]);

  // countdown timer
  const formatCountdown = (expiry) => {
    const now = new Date();
    const end = new Date(expiry);
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Skeleton loader
  const renderSkeletons = () =>
    new Array(8).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
        <div className="nft_item skeleton">
          <div style={{ height: "200px", background: "#ccc", borderRadius: "10px" }} />
          <div style={{ height: "20px", width: "80%", background: "#eee", margin: "10px auto" }} />
          <div style={{ height: "15px", width: "60%", background: "#eee", margin: "5px auto" }} />
        </div>
      </div>
    ));

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <section className="no-bottom">
      <div className="container">
        <div className="row">
          {loading
            ? renderSkeletons()
            : items.slice(0, visibleCount).map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="nft_item">
                    <div className="nft_image position-relative">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          alt={item.title}
                          className="img-fluid"
                          style={{ borderRadius: "10px" }}
                        />
                      </Link>
                      {item.expiryDate && (
                        <div className="countdown">
                          {formatCountdown(item.expiryDate)}
                        </div>
                      )}
                    </div>
                    <div className="nft_info text-center mt-3">
                      <h4>{item.title}</h4>
                      <span>{item.price ? `${item.price} ETH` : "Price not listed"}</span>
                      <div style={{ color: "#999", fontSize: "0.9rem" }}>
                        {item.likes || 0}
                      </div>
                      <div className="author mt-2 d-flex align-items-center justify-content-center">
                        <Link to={`/author/${item.authorId}`} className="d-flex align-items-center">
                          <img
                            src={item.authorImage}
                            alt={item.authorName}
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="ms-2">{item.authorName}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Load More Button */}
        {!loading && visibleCount < items.length && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Explore;