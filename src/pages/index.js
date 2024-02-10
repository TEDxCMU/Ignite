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
      <Section3 />
      <Section4 videoLink="./Flower.mp4" bool={true} speed={400} />
      <Section5 />
      {/* <Section6 /> */}
    </div>
  );
}

export default Home;
