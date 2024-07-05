import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import Doctorcard from "../components/Doctorcard";
import Searchbar from "../components/Searchbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { DOCTORS_BY_SPECIALITY } from "../utils/Queries";
const ListingPage = () => {
  const { spec_name } = useParams();
  const updated_name = spec_name.split("-").join(" ");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset,setOffset]=useState(0);

  // const specialities_data = gql`
  //   query DoctorBySpecialities($speciality: String!) {
  //     doctorBySpecialities(speciality: $speciality) {
  //       id
  //       name
  //       fee
  //       experience
  //       profile_img
  //       specialization
  //     }
  //   }
  // `;

  const [doctorsBySpec, { data: speciality_data, loading, error }] =
    useMutation(DOCTORS_BY_SPECIALITY);

  const fetchChunkData = async (limit, offset) => {
    try {
      const data = await doctorsBySpec({
        variables: { speciality: updated_name, limit: 6, offset: 0 },
      });
     
      setItems(data?.data?.doctorBySpeciality);
    } catch (error) {
      console.log("Error", error);
    }
  };
 
  useEffect(() => {
    fetchChunkData();
  }, []);

  const fetchMoreData = async() => {
    setOffset(offset+6)
    if(offset>17){
      setHasMore(false);
    }

    try {
      const data = await doctorsBySpec({
        variables: { speciality: updated_name, limit: 6, offset: offset },
      });
     
      setItems([...items,...data?.data?.doctorBySpeciality]);
    } catch (error) {
      console.log("Error", error);
    }



  };

  // const {
  //   loading,
  //   error,
  //   data: speciality_data,
  // } = useQuery(DOCTORS_BY_SPECIALITY, {
  //   variables: { speciality: updated_name, limit: 10, offset: 0 },
  // });
  // console.log(updated_name);

  console.log("DOC", speciality_data);

  return (
    <>
      <div className="flex justify-center items-start w-full md:w-[40%] mx-auto mt-8">
        <Searchbar />
      </div>

      <div className="md:w-[60%] mx-auto mt-20">
        <h1 className="text-3xl font-bold">
          {speciality_data && speciality_data.doctorBySpeciality?.length}{" "}
          doctors available for "{updated_name}"
        </h1>
        <p className="text-lg text-gray-400 mb-3">
          Verified doctor details Book appointments with minimum wait-time &
          verified doctor details
        </p>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center mb-10">Loading...</h4>}
          endMessage={<div className="text-center mb-10">Yay! You have seen it all</div>}
        >
          <div className="flex flex-col gap-4">
            {items &&
              items.map((doctor) => (
                <Doctorcard key={doctor.id} doctor={doctor} />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListingPage;
