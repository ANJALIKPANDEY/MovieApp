import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import YouTube from "react-youtube";
import RatingStars from "../../common/rating-stars/RatingStars";

// material-ui imports
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

function Details(props) {
  const [movieDetails, setMovieDetails] = useState();

  const getMovieDetails = () => {
    fetch(props.baseUrl + `movies/${props.match.params.id}`, {
      method: "GET",
      headhers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="details-page-container">
      <Header
        baseUrl={props.baseUrl}
        movieId={props.match.params.id}
        history={props.history}
      />
      <Typography
        component="div"
        className="back-to-home-button"
        onClick={() => {
          props.history.push("/");
        }}>
        &#60; Back to Home
      </Typography>
      {movieDetails && (
        <div className="main-container">
          <div className="left">
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
          </div>
          <div className="middle">
            <Typography variant="headline" component="h2">
              {movieDetails.title}
            </Typography>
            <Typography>
              <span className="bold-text">Genre:</span>{" "}
              {movieDetails.genres.join(", ")}
            </Typography>
            <Typography>
              <span className="bold-text">Duration:</span>{" "}
              {movieDetails.duration}
            </Typography>
            <Typography>
              <span className="bold-text">Release Date:</span>{" "}
              {new Date(movieDetails.release_date).toDateString()}
            </Typography>
            <Typography>
              <span className="bold-text">Rating:</span> {movieDetails.rating}
            </Typography>
            <div className="plot-block">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={movieDetails.wiki_url}>(Wiki Link)</a>{" "}
                {movieDetails.storyline}
              </Typography>
            </div>
            <div className="trailer-block">
              <Typography className="bold-text">Trailer:</Typography>
              <YouTube
                videoId={new URL(movieDetails.trailer_url).searchParams.get(
                  "v"
                )}
                onReady={onReady}
                opts={{
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div className="right">
            <Typography className="bold-text">Rate this movie:</Typography>
            <div className="rating-stars-container">
              <RatingStars />
            </div>
            {movieDetails.artists && (
              <Fragment>
                <Typography className="artists-block-title bold-text">
                  Artists:
                </Typography>
                <GridList className="movie-artists" cols={2} spacing={16}>
                  {movieDetails.artists.map((artist) => (
                    <GridListTile key={artist.profile_url}>
                      <img
                        src={artist.profile_url}
                        alt={`${artist.first_name} ${artist.last_name}`}
                      />
                      <GridListTileBar
                        title={`${artist.first_name} ${artist.last_name}`}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
