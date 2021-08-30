import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";

// material-ui imports
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";

function Home(props) {
  const theme = createMuiTheme();
  const styles = {
    cardHeading: {
      color: theme.palette.primary.light,
    },
    cardItem: {
      margin: theme.spacing.unit,
    },
  };

  const initialFilters = {
    movieName: "",
    genre: [],
    artist: [],
    releaseDateStart: "",
    releaseDateEnd: "",
  };

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const handleFormInput = (e) => {
    const values = { ...filters };
    values[e.target.name] = e.target.value;
    setFilters(values);
  };

  const getUpcomingMovies = () => {
    fetch(props.baseUrl + `movies?status=PUBLISHED`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.movies);
      });
  };

  const getReleasedMovies = () => {
    fetch(props.baseUrl + `movies?status=RELEASED`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReleasedMovies(data.movies);
      });
  };

  const getGenres = () => {
    fetch(props.baseUrl + `genres`, {
      method: "GET",
      headhers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  };

  const getArtists = () => {
    fetch(props.baseUrl + `artists`, {
      method: "GET",
      headhers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists);
      });
  };

  const getMovieClickHandler = (movieId) => {
    return function () {
      props.history.push({
        pathname: "/movie/" + movieId,
      });
    };
  };

  useEffect(() => {
    getUpcomingMovies();
    getReleasedMovies();
    getGenres();
    getArtists();
  }, []);

  const getFilteredMovies = () => {
    const queryParams = `title=${filters.movieName}&start_date=${
      filters.releaseDateStart
    }&end_date=${filters.releaseDateEnd}&genre=${filters.genre.join(
      ", "
    )}&artists=${filters.artist.join(", ")}`;

    fetch(props.baseUrl + `movies?${queryParams}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReleasedMovies(data.movies);
      });
  };

  const applyFilters = () => {
    if (
      filters.movieName === initialFilters.movieName &&
      filters.releaseDateEnd === initialFilters.releaseDateEnd &&
      filters.releaseDateStart === initialFilters.releaseDateStart &&
      filters.genre.join(",") === initialFilters.genre.join(",") &&
      filters.artist.join(",") === initialFilters.artist.join(",")
    ) {
      getReleasedMovies();
      return;
    }

    getFilteredMovies();
  };

  return (
    <div className="home-page-container">
      <Header baseUrl={props.baseUrl} />
      <div className="upcoming-movies-heading">Upcoming Movies</div>
      <GridList className="upcoming-movies" cols={6} cellHeight={250}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={movie.poster_url}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
      <div className="main-container">
        <div className="released-movies-container">
          <GridList
            className="released-movies"
            cols={4}
            cellHeight={350}
            spacing={16}>
            {releasedMovies.map((movie) => (
              <GridListTile
                key={movie.poster_url}
                className="clickable-movie-poster"
                onClick={getMovieClickHandler(movie.id)}>
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={`Release Date: ${new Date(
                    movie.release_date
                  ).toDateString()}`}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="filters-container">
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ ...styles.cardHeading, ...styles.cardItem }}>
                FIND MOVIES BY:
              </span>
              <FormControl
                component="div"
                required
                className="input-field"
                style={{ ...styles.cardItem }}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input
                  id="movieName"
                  name="movieName"
                  value={filters.movieName}
                  onChange={handleFormInput}
                />
              </FormControl>
              <FormControl
                component="div"
                required
                className="input-field"
                style={{ ...styles.cardItem }}>
                <InputLabel htmlFor="genre">Genre</InputLabel>
                <Select
                  id="genre"
                  name="genre"
                  multiple
                  value={filters.genre}
                  onChange={handleFormInput}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(", ")}>
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox
                        checked={filters.genre.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.description} />
                    </MenuItem>
                  ))}
                </Select>
                <Input
                  style={{
                    visibility: "hidden",
                    height: "0px",
                  }}
                />
              </FormControl>
              <FormControl
                component="div"
                required
                className="input-field"
                style={{ ...styles.cardItem }}>
                <InputLabel htmlFor="artist">Artist</InputLabel>
                <Select
                  id="artist"
                  name="artist"
                  multiple
                  value={filters.artist}
                  onChange={handleFormInput}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(", ")}>
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={`${artist.first_name} ${artist.last_name}`}>
                      <Checkbox
                        checked={
                          filters.artist.indexOf(
                            `${artist.first_name} ${artist.last_name}`
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={`${artist.first_name} ${artist.last_name}`}
                      />
                    </MenuItem>
                  ))}
                </Select>
                <Input
                  style={{
                    visibility: "hidden",
                    height: "0px",
                  }}
                />
              </FormControl>
              <FormControl
                component="div"
                required
                className="input-field"
                style={{ ...styles.cardItem }}>
                <TextField
                  id="release-date-start"
                  name="releaseDateStart"
                  type="date"
                  label="Release Date Start"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filters.releaseEndDate}
                  onChange={handleFormInput}
                />
              </FormControl>
              <FormControl
                component="div"
                required
                className="input-field"
                style={{ ...styles.cardItem }}>
                <TextField
                  id="release-date-end"
                  name="releaseDateEnd"
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filters.releaseEndDate}
                  onChange={handleFormInput}
                />
              </FormControl>
              <FormControl component="div" style={{ ...styles.cardItem }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={applyFilters}
                  component="div">
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
