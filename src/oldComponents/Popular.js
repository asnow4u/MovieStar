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

class Popular extends React.Component {
  constructor(){
    super();
    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=b369da1370460aa195101abae0307148');
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

export default Popular;
