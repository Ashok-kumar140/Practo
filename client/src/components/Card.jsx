import React from "react";

const Card = ({ image, link, Heading,subHeading,color }) => {
  return (
    <div className="max-w-sm overflow-hidden shadow-lg bg-white h-[290px] w-[200px] rounded-[15px] mr-7 inline-block mt-7">
      <div className={`h-[170px] `}>
        <img
          className="object-cover w-[180px] h-[170px]"
          src={image}
          alt="Video Consultation"
        //   width={200}
        //   height={170}
        />
      </div>
      <div className="px-[16px] py-4">
        <div className=" text-[20px] font-semibold pb-2">{Heading}</div>
        <p className="text-[#787887] text-sm">{subHeading}</p>
      </div>
    </div>
  );
};

export default Card;
