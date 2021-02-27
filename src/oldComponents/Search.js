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

const InfoPage = styled.div`
  display: inline-block;
  position: absolute;
  left: 0px;
  float: left;
  margin-top: 40px;
  width: 100%;
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

  .searchBar {
    margin-top: 10px;
    margin-left: 40px;
    padding: 5px;
    width: 200px;
    height: 25px;
    font-size: 15px;
    background-color:powderblue;
    border-color: powderblue;
  }

  .searchButton {
    height: 41px;
    padding: 5px;
    background-color: gold;
    border-color: gold;
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
  padding: 8px;
  background-color: white;
  margin-top: 10px;
  margin-left: 30px;

  > * {
    display: inline;
    margin: 5px;
  }

  button {
    background-color: gold;
  }
`;

export function Search(){
  const { url, path } = useRouteMatch();
  const [ inputQuery, setInputQuery ] = useState("");
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ moviesList, setMoviesList ] = useState({results: []});
  const [ pageNumber, setPageNumber ] = useState(1);

  useEffect(() => {
    if (inputQuery) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchSearchResults() {
        let responseBody = {};
        //setLoading(true);
        try {
          console.log("inputQuery:", inputQuery);
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=b369da1370460aa195101abae0307148&query=${inputQuery}&page=${pageNumber}`,
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
        } else {
          console.log("== ignoring results");
        }
        // console.log("== response body:", responseBody);
      }

      fetchSearchResults();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ searchQuery, pageNumber ]);

  return (
    <div>
      <InfoPage>
        <form onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery(inputQuery);
          setPageNumber(1);
        }}>
          <input className="searchBar"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
          />
          <button className="searchButton" type="submit">Search</button>
        </form>
        {searchQuery ? (
          <PageNavigation>
            {pageNumber > 1 ? ( <button onClick={() => setPageNumber(pageNumber - 1)}>Previous Page</button>)
              : ( <button onClick={() => setPageNumber(pageNumber - 1)} disabled>Previous Page</button>)}
            <p>Current Page: {pageNumber}</p>
            {pageNumber < moviesList.total_pages ? ( <button onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>)
              : ( <button onClick={() => setPageNumber(pageNumber + 1)} disabled>Next Page</button>)}
          </PageNavigation> )
          : ( <></> )
        }
        <ul>
          {searchQuery ? moviesList.results.map(movie => (
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
              Search for a movie.
            </div>
          }
        </ul>
      </InfoPage>
    </div>
  );
}
