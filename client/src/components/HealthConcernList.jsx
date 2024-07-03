import React from "react";
import image from '../assets/consultImages/Period.webp';
import ConcernCard from "./ConcernCard";
const HealthConcernList = () => {
  return (
    <>
      <div className="w-[1200px] mx-auto">
        <div className="flex justify-between leading-5">
          <div>
            <h2 className="text-xl font-bold leading-5">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Private online consultations with verified doctors in all
              specialists View All Specialities
            </p>
          </div>
          <div>
            <button className="p-2 border-2 border-cyan-400 text-cyan-400">View All Specialities</button>
          </div>
        </div>
        <div className="flex mt-10">
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        <ConcernCard image={image}/>
        </div>
      </div>
    </>
  );
};

export default HealthConcernList;
