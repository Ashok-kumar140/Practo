import React from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/Queries";

const ReviewModal = ({ setReviewModal, doc_id, fetchAllReviews }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addReview, { error }] = useMutation(ADD_REVIEW);

  const onSubmit = async (values) => {
    try {
      const response = await addReview({
        variables: {
          patId: user.id,
          docId: doc_id,
          rating: values.Ratings,
          review: values.review,
        },
      });
      console.log("RESPONSE", response);
      setReviewModal(false);
      fetchAllReviews();
      toast.success("Review added successfully");
    } catch (error) {
      console.log("Error while calling create review API: ", error);
      toast.error("Rating is Required");
    }
  };
  const ratingChanged = (newRating) => {
    setValue("Ratings", newRating);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-gray-400">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center text-3xl">
              {user.name[0].toUpperCase()}
            </div>
            <div className="">
              <p className="font-semibold text-richblack-5">{user?.name}</p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="Listening Experience"
              >
                Add Your Experience <sup className="text-red-800">*</sup>
              </label>
              <textarea
                id="review"
                placeholder="Add Your Experience"
                {...register("review", { required: true })}
                className="input-field-style"
              />
              {errors.review && (
                <span className="ml-2 text-xs tracking-wide text-red-800">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-md text-richblack-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
