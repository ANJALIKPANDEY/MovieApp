import React from "react";
import "./RatingStars.css";
import StarBorder from "@material-ui/icons/StarBorder";
import { useState } from "react";

function RatingStars() {
  const initialRating = 0;
  const [rating, setRating] = useState(initialRating);

  const getStarColor = (starRating) => {
    return rating >= starRating ? "yellow" : "black";
  };

  function renderStars(noOfStars) {
    const stars = [];
    for (let i = 1; i <= noOfStars; i++) {
      const star = (
        <StarBorder
          className="clickable"
          style={{ color: getStarColor(i) }}
          onClick={() => setRating(i)}
        />
      );
      stars.push(star);
    }
    return stars;
  }

  return <div>{renderStars(5)}</div>;
}

export default RatingStars;
