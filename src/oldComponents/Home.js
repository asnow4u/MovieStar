import React from 'react';
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
  margin-top: 20px;
  width: 100%;
  height: 100%;

  .intro {
    background-color: #ff3535;
    text-align: center;
    color: gold;
    font-size: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 99.2%;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    font-size: 50px;
    margin-left: 60px;
  }

  .movie {
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

  .movieList {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
`;

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=b369da1370460aa195101abae0307148');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ list: json });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.list.results){
      return (
        <InfoPage>
          <div className="intro">
            <div>
              Welcome to the less is more TmDB movie site. Below you will see what is currently on list as playing.
            </div>
            <div>
               Navigate through the site by using the tabs at the top to find popular movies, upcoming movies and top rated movies.
            </div>
            <div>
               You will also be able to check out some the movie genres and even search for movies using the search bar at the top right of the page.
            </div>
          </div>
          <h1 className="title">Now Playing:</h1>
          <ul className="movieList">
            {this.state.list.results.map(i => (
                <li key={i.id} className="movie">
                  <NavLink to={"/movie/" + i.id} activeClassName="activeLink">
                    <div>
                      <img src={i.poster_path != null ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ i.poster_path : require ( '../images/obaasanJohnsu.png' )} />
                    </div>
                    {i.title}
                  </NavLink>
                </li>
            ))}
          </ul>
        </InfoPage>
      );
    } else {
      return (
        <InfoPage>
        </InfoPage>
      );
    }
  }
}

export default Home;
