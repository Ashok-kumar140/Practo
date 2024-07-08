import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  useMutation } from "@apollo/client";
import Doctorcard from "../components/Doctorcard";
import Searchbar from "../components/Searchbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { DOCTORS_BY_SPECIALITY } from "../utils/Queries";
const ListingPage = () => {
  const { spec_name,location } = useParams();
  const updated_name = spec_name.split("-").join(" ");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset,setOffset]=useState(0);




  const [doctorsBySpec] =
    useMutation(DOCTORS_BY_SPECIALITY);

  const fetchChunkData = async (limit, offset) => {
    setHasMore(true);
    console.log("has",hasMore);
    try {
      const data = await doctorsBySpec({
        variables: { speciality: updated_name, limit: 6, offset: 0,location:location },
      });
     
      setItems(data?.data?.doctorBySpeciality);
      if(data?.data?.doctorBySpeciality.length<6){
        setHasMore(false);
      }

    } catch (error) {
      console.log("Error", error);
    }
  };
 
  useEffect(() => {
    fetchChunkData();
  }, [updated_name]);

  const fetchMoreData = async() => {
    setOffset(offset+6)
    
    try {
      const data = await doctorsBySpec({
        variables: { speciality: updated_name, limit: 6, offset: offset,location:location },
      });
      console.log("data","offset",data);

      if(data?.data?.doctorBySpeciality.length<6){
        setHasMore(false);
      }
     
      setItems([...items,...data?.data?.doctorBySpeciality]);
    } catch (error) {
      console.log("Error", error);
    }



  };

  return (
    <>
      <div className="flex justify-center items-start w-full md:w-[40%] mx-auto mt-8">
        <Searchbar />
      </div>

      <div className="md:w-[60%] mx-auto mt-20">
        <h1 className="text-3xl font-bold">
          Available results for "{updated_name}"
        </h1>
        <p className="text-lg text-gray-400 mb-3">
          Verified doctor details Book appointments with minimum wait-time &
          verified doctor details
        </p>
        <div className="border-b border-gray-300 mb-5"></div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center mb-10">Loading...</h4>}
          endMessage={<div className="text-center mb-10">You have reached at end of the list.</div>}
        >
          <div className="flex flex-col gap-4">
            {items &&
              items.map((doctor,index) => (
                <Doctorcard key={index} doctor={doctor}/>
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListingPage;
