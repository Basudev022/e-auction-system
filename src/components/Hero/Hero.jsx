import headerImg from "../../assets/images/headerimg.png";
import Icon from "../Icon/Icon";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>
          <span>Bid. Win. Own.</span>
          <br />
          Your Next Great Find
        </h1>

        <p>
          Discover Unique items, rare collectibles and exclusive deals.
          <br />
          Join Thousands of bidders today!
        </p>

        <div className="hero-actions">
          <button className="primary-btn">Explore Auctions</button>

          <button className="secondary-btn">
            <span className="play-circle">
              <Icon name="play" size={13} />
            </span>
            How It Works
          </button>
        </div>
      </div>

      <div className="hero-art">
        <img src={headerImg} alt="Auction items" className="header-image" />
      </div>
    </section>
  );
}

export default Hero;
