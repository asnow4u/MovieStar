import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch
} from 'react-router-dom';

const InfoPage = styled.div`
  display: inline-block;
  position: absolute;

  left: 0px;
  float: left;
  margin-top: 40px;
  width: 100%;
  height: 100%;

  .title {
    text-align: center;
    font-size: 50px;
  }

  .overview {
    position: absolute;
    left: 600px;
    width: 800px;
    font-size: 25px;
  }

  .image {
    position: relative;
    left: 200px;
    width: 300px;
    height: 400px;
    max-width: 300px;
    max-height: 400px;
  }

  img {
    max-width: 300px;
    max-height: 400px;
  }

  .info {
    position: absolute;
    left: 700px;
    top: 450px;
    font-size: 25px;
  }

  .credits {
    position: absolute;
    left: 30%;
    top: 750px;
    font-size: 25px;
  }
`;

export function Movie(){

  let id = useParams().id;
  const [ movie, setMovie ] = useState([]);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchMovie(id) {
      let responseBody = {};

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/` + id + `?api_key=b369da1370460aa195101abae0307148&append_to_response=credits`,
        );
        responseBody = await response.json();

      } catch (e) {
        console.log(e);
      }

      if (!ignore) {
        setMovie(responseBody);
      }
    }

    fetchMovie(id);
    return () => {
      controller.abort();
      ignore = true;
    };
  }, []);

  console.log(movie);
  if (movie.credits){
    return (
      <InfoPage>
        <div className="title">
          <h2> {movie.title} </h2>
        </div>
        <div className="overview">
          <h5> {movie.overview} </h5>
        </div>
        <div className="image">
          <img src={movie.poster_path != null ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ movie.poster_path : require ( '../images/obaasanJohnsu.png' )} />
        </div>
        <ul className="info">
          <li>
            Release Date: {movie.release_date}
          </li>
          <li>
            Score: {movie.vote_average}
          </li>
          <li>
            Movie Budget: ${movie.budget}
          </li>
          <li>
            Movie Revenue: ${movie.revenue}
          </li>
          <li>
            Length: {movie.runtime} minutes
          </li>
        </ul>
        <div className="credits">
          <h1>Crew Members</h1>
          <ul>
            {movie.credits.cast.map(people => (
              <li key={people.id}>
                {people.name} playing as {people.character}
              </li>
            ))}
          </ul>
        </div>

      </InfoPage>
    );
  } else {
    return(
      <div></div>
    );
  }
}
