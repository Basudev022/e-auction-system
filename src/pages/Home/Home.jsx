import Footer from "../../components/FooterBanner/FooterBanner";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import TrendingAuctions from "../../components/TrendingAuctions/TrendingAuctions";
import TrustBar from "../../components/TrustBar/TrustBar";

import "./Home.css";

export default function Home({
  onLogin,
  onViewAllAuctions,
}) {
  return (
    <>
      <Header onLogin={onLogin} />

      <main>
        <Hero />

        <div className="auction-content">
          <div className="auction-left">
            <TrendingAuctions
              onViewAllAuctions={onViewAllAuctions}
            />
          </div>
        </div>

        <TrustBar />

        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}
