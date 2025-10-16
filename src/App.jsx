import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";

// Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// AOS animation
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        {/* Home page with Swiper carousel */}
        <Route path="/" element={<Home />} />

        {/* Explore page */}
        <Route path="/explore" element={<Explore />} />

        {/* Author page with dynamic ID */}
        <Route path="/author/:authorId" element={<Author />} />

        {/* Item Details page with dynamic NFT ID */}
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;