import React from "react";

const ConcernCard = ({image,heading}) => {
  return (
    <div className="w-[180px] h-[251px]">
      <div className="w-[120px] h-[120px]">
        <img src={image} alt="" />
      </div>
      <div>
        <p className="font-semibold text-[17px] text-gray-700 px-3">{heading}</p>
        <p className="text-cyan-400 text-[14px]">CONSULT NOW</p>
      </div>
    </div>
  );
};

export default ConcernCard;
