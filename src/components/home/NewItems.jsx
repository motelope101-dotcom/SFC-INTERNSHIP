import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then(res => res.json())
      .then(data => {
        const endTime = performance.now();
        setFetchTime(((endTime - startTime) / 1000).toFixed(2));
        setItems(data);
        setLoading(false);
        console.log("Fetched New Items:", data);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const renderSkeletons = (count) =>
    new Array(count).fill(0).map((_, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
        <div className="nft_item skeleton">
          <div style={{ height: "200px", background: "#ccc", borderRadius: "10px" }} />
          <div style={{ height: "20px", width: "80%", background: "#eee", margin: "10px auto" }} />
          <div style={{ height: "15px", width: "60%", background: "#eee", margin: "5px auto" }} />
        </div>
      </div>
    ));

  const formatCountdown = (expiry) => {
    const now = new Date();
    const end = new Date(expiry);
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>New Items</h2>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#6c63ff" }}>
             Fetch Time: {fetchTime} seconds
          </p>
          <div className="small-border bg-color-2"></div>
        </div>

        <div className="row">
          {loading
            ? renderSkeletons(4)
            : items.slice(0, 4).map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="nft_item">
                    <div className="nft_image position-relative">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          alt={item.title}
                          className="img-fluid"
                          style={{ borderRadius: "10px" }}
                        />
                      </Link>
                      {item.expiryDate && (
                        <div className="countdown" style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "#6c63ff",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem"
                        }}>
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
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="row">
          {loading
            ? renderSkeletons(3)
            : items.slice(4, 7).map((item, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className="nft_item">
                    <div className="nft_image position-relative">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          alt={item.title}
                          className="img-fluid"
                          style={{ borderRadius: "10px" }}
                        />
                      </Link>
                      {item.expiryDate && (
                        <div className="countdown" style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "#6c63ff",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem"
                        }}>
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
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;