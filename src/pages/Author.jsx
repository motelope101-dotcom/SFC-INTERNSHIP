import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css';

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        console.error('Error fetching author:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(author.address);
    alert('Wallet address copied!');
  };

  if (loading) return <div className="loading">Loading author...</div>;
  if (!author) return <div className="error">Author not found.</div>;

  return (
    <div className="author-page">
      <div className="author-profile">
        <img
          src={author.authorImage}
          alt={author.authorName}
          className="author-avatar"
        />
        <h2>{author.authorName}</h2>
        <p className="author-tag">@{author.tag}</p>
        <div className="author-wallet">
          <span>{author.address.slice(0, 20)}...</span>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
        <p className="author-followers">{author.followers} followers</p>
      </div>

      <div className="nft-gallery">
        {author.nftCollection?.map((nft, index) => (
          <div key={index} className="nft-card">
            <img src={nft.nftImage} alt={nft.title} className="nft-image" />
            <h3>{nft.title}</h3>
            <p>Price: {nft.price} ETH</p>
            <p>Likes: ❤️ {nft.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Author;