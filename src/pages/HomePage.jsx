import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <div id="home">
      <Header />
      <Hero />
      <Carousel />
      <Footer />
    </div>
  );
}
