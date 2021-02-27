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
import fetch from 'isomorphic-unfetch';

const SideMenu = styled.div`
  background-color: red;
  position: absolute;
  /* margin-top: 20px; */
  left: 8px;
  top: 149px;
  height: auto;
  width: 200px;
  font-size: 25px;

  .sideLinks {
    list-style-type: none;
    margin-left: -15px;
  }

  a {
    padding: 0px;
  }

  a:hover {
    background-color: gold;
  }

  .activeLink {
    color: black;
    background-color: gold;
  }
`;

const InfoPage = styled.div`
  display: inline-block;
  position: absolute;
  left: 185px;
  float: left;
  margin-top: 40px;
  width: 90%;
  height: 100%;

  .movie{
    display: inline-block;
    background-color: powderblue;
    text-align: center;
    float: left;
    width: 200px;
    height: 275px;
    padding: 10px;
    padding-top: 25px;
    border: 2px solid black;
    img {
      max-width:150px;
      max-height:200px;
    }
  }

  a {
    padding: 0px;
  }

  a:hover {
    background-color: inherit;
  }
`;

const PageNavigation = styled.div`
  /* border: 1px solid black; */
  top: 0px;
  padding: 8px;
  background-color: white;
  font-size: 16px;
  padding-top: 20px;

  button {
    background-color: gold;
  }
`;

export function Genre(){
  // fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b369da1370460aa195101abae0307148')
  // .then(results => {
  //   console.log(results.json());
  // });

  const { currentGenre } = useParams();
  const { url, path } = useRouteMatch();
  const [ genreList, setGenreList ] = useState([]);
  const [ moviesList, setMoviesList ] = useState({results: []});
  const [ pageNumber, setPageNumber ] = useState(1);
  //const [ currentGenre, setCurrentGenre] = useState(null);
  console.log("currentGenre:", currentGenre);
  console.log("path:", path);
  console.log("url:", url);
  console.log("useParams:", useParams());

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchGenreList() {
      let responseBody = {};
      //setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=b369da1370460aa195101abae0307148`,
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request aborted");
        } else {
          //setError(true);
          console.log(e);
        }
      }

      if (!ignore) {
        //setError(false);
        //setLoading(false);
        setGenreList(responseBody.genres);
      } else {
        console.log("== ignoring results");
      }
    }

    fetchGenreList();
    return () => {
      controller.abort();
      ignore = true;
    };
  }, []);

  useEffect(() => {
    console.log("currentGenre:", currentGenre);
    if (currentGenre) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchMoviesList() {
        let responseBody = {};
        //setLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=b369da1370460aa195101abae0307148&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${currentGenre}&page=${pageNumber}`,
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          if (e instanceof DOMException) {
            console.log("== HTTP request aborted");
          } else {
            //setError(true);
            console.log(e);
          }
        }

        if (!ignore) {
          //setError(false);
          //setLoading(false);
          setMoviesList(responseBody);
          console.log("moviesList:", moviesList.results);
        } else {
          console.log("== ignoring results");
        }
      }

      fetchMoviesList();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ currentGenre, pageNumber ]);

  return (
    <div>
      <SideMenu>
        <ul className="sideLinks">
          {genreList.map(genre => (
            <li key={genre.id}>
              <NavLink onClick={() => setPageNumber(1)} to={'/genre/' + genre.id} activeClassName="activeLink">{genre.name}</NavLink>
            </li>
          ))}
        </ul>
        {currentGenre ? (
          <PageNavigation>
            {pageNumber > 1 ? ( <button onClick={() => setPageNumber(pageNumber - 1)}>Previous Page</button>)
              : ( <button onClick={() => setPageNumber(pageNumber - 1)} disabled>Previous Page</button>)}
            <p>Current Page: {pageNumber}</p>
            {pageNumber < moviesList.total_pages ? ( <button onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>)
              : ( <button onClick={() => setPageNumber(pageNumber + 1)} disabled>Next Page</button>)}
          </PageNavigation> )
          : ( <></> )
        }
      </SideMenu>
      <InfoPage>
        <ul>
          {currentGenre ? moviesList.results.map(movie => (
            <li className="movie" key={movie.id}>
              <NavLink to={"/movie/" + movie.id} activeClassName="activeLink">
                <div>
                  <img src={movie.poster_path != null ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ movie.poster_path : require ( '../images/obaasanJohnsu.png' )} />
                </div>
                {movie.title}
              </NavLink>
            </li>
          )) :
            <div>
              Pick a genre to see movies of that genre.
            </div>
          }
        </ul>
      </InfoPage>
    </div>
  );
}

export default Genre;
