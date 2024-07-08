import React from "react";
import Searchbar from "../components/Searchbar";
import Card from "../components/Card";
import find_doc from "../assets/find_doctors.png";
import surgeries from "../assets/surgeries.png";
import videoConsult from "../assets/video_Consultant.png";
import HealthConcernList from "../components/HealthConcernList";
import ReviewSlider from "../components/ReviewSlider";
const HomePage = () => {
  return (
    <>
      <div className="flex justify-center items-start w-full md:w-[40%] mx-auto mt-8">
        <Searchbar />
      </div>
      <div className="sm:[90%] md:w-[70%] mx-auto mt-20">
        <div className="flex flex-wrap items-center justify-center ">
          <Card
            image={videoConsult}
            Heading={"Instant Video Consultation"}
            subHeading={"Connect within 60 sec"}
            link={"/videoConsult"}
          />
          <Card
            image={find_doc}
            Heading={"Find Doctors Near You"}
            subHeading={"Confirmed ppointments"}
            link={"/doctors"}
          />
          <Card
            image={surgeries}
            Heading={"Surgeries"}
            subHeading={"Safe and trusted surgery centers"}
            link={"/surguries"}
          />
        </div>
      </div>
      <div className="mt-20">
        <HealthConcernList />
      </div>

      <div className="">
        <ReviewSlider/>
      </div>
    </>
  );
};

export default HomePage;
