import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ReviewSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    // centerPadding: "0",
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-6">
        What our users have to say
      </h2>
      <div className="mx-auto text-center flex justify-center">
        <Slider {...settings} className="w-[50%]">
          <div className="flex justify-center items-center w-full">
            <div className="w-full  border border-gray-200 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
              <p className="text-gray-600 mb-6 p-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                nostrum eligendi quam ex libero beatae. Quia illum consequatur
                fugit expedita, similique numquam, atque voluptates recusandae
                nostrum culpa animi harum. Magnam.;asdf
              </p>
              <p className="font-semibold text-gray-700">Ashok</p>
            </div>
          </div><div className="flex justify-center items-center w-full">
            <div className="w-full  border border-gray-200 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
              <p className="text-gray-600 mb-6 p-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                nostrum eligendi quam ex libero beatae. Quia illum consequatur
                fugit expedita, similique numquam, atque voluptates recusandae
                nostrum culpa animi harum. Magnam kiugy uygu
              </p>
              <p className="font-semibold text-gray-700">Anil</p>
            </div>
          </div><div className="flex justify-center items-center w-full">
            <div className="w-full  border border-gray-200 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
              <p className="text-gray-600 mb-6 p-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                nostrum eligendi quam ex libero beatae. Quia illum consequatur
                fugit expedita, similique numquam, atque voluptates recusandae
                nostrum culpa animi harum. Magnam.;asdf
              </p>
              <p className="font-semibold text-gray-700">Ayush</p>
            </div>
          </div>
          
          
          
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSlider;
