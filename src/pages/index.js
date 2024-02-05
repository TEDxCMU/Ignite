import Section1 from "components/homepage/section1";
import Section2 from "components/homepage/section2";
import Section3 from "components/homepage/section3";
import Section4 from "components/homepage/section4";
import Section5 from "components/homepage/section5";

function Home() {
  return (
    <div>
      <Section1 />
      <Section2 />
      {Section4("./Flower.mp4", true)}
      <Section3 />
      <Section5 />
      {/* <Section6 /> */}
    </div>
  );
}

export default Home;
