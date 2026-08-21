import Footer from "../../components/FooterBanner/FooterBanner";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import TrendingAuctions from "../../components/TrendingAuctions/TrendingAuctions";
import TrustBar from "../../components/TrustBar/TrustBar";

import "./Home.css";

export default function Home() {
  return (
    <>
      <Header />

      <Hero />

      <div className="auction-content">
        <div className="auction-left">
          <TrendingAuctions />
        </div>
      </div>

      <TrustBar />

      <HowItWorks />
      <Footer />
    </>
  );
}
