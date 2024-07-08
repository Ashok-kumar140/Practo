export const averageRating = (reviews) => {
    let average_rating =0

    reviews.forEach(element => {
        average_rating+=element.rating;
        
    });
    if(average_rating===0){
        return average_rating;
    }
    return average_rating/reviews.length;
}