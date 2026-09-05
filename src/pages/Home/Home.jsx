import Footer from "../../components/FooterBanner/FooterBanner";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import TrendingAuctions from "../../components/TrendingAuctions/TrendingAuctions";
import TrustBar from "../../components/TrustBar/TrustBar";

import "./Home.css";

export default function Home({
  onLogin,
  onLogout,
  isLoggedIn,
  user,
  onDashboard,
  onViewAllAuctions,
  onHome,
  onHowItWorks,
  activeNav,
  onActiveLinkChange,
}) {
  return (
    <>
      <Header
        onLogin={onLogin}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        user={user}
        onDashboard={onDashboard}
        onHome={onHome}
        onViewAllAuctions={onViewAllAuctions}
        onHowItWorks={onHowItWorks}
        activeLink={activeNav}
        onActiveLinkChange={onActiveLinkChange}
      />

      <main>
        <Hero />

        <div className="auction-content">
          <div className="auction-left">
            <TrendingAuctions onViewAllAuctions={onViewAllAuctions} />
          </div>
        </div>

        <TrustBar />

        <section id="how-it-works">
          <HowItWorks />
        </section>
      </main>

      <Footer />
    </>
  );
}
