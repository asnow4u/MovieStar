import React from 'react';
import ShowSlider from './ShowSlider.js';
import ShowCarousel from './ShowCarousel.js';
import SearchContainer from './SearchContainer.js';
import InfoPanel from './InfoPanel.js';


const ShowRoom = (tab) => {

  const [nowPlaying, setNowPlaying] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState([]);

  const [selectedId, setSelectedId] = React.useState(-1);

  React.useEffect(() => {

    const fetchData = async (media, category) => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/' + media + '/' + category + '?api_key=b369da1370460aa195101abae0307148');

        if (!res.ok) {
          throw Error(res.statusText);
        }

        const json = await res.json();

        if (category === "now_playing" || category === "airing_today") {
          setNowPlaying(json.results);
        } else if (category === "popular") {
          setPopular(json.results);
        } else if (category === "top_rated") {
          setTopRated(json.results);
        } else if (category === "upcoming" || category === "on_the_air") {
          setUpcoming(json.results);
        } else {
          console.log("no category found");
        }

      } catch (error) {
        console.log(error);
      }
    }

    const fetchSearchData = async (category) => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/search/' + category + '?api_key=b369da1370460aa195101abae0307148&query=' + tab.query);

        if (!res.ok){
          throw Error(res.statusText);
        }

        const json = await res.json();
        setSearchQuery(json.results);

      } catch (error){
        console.log(error);
      }
    }


    if (tab.current === "Movie") {
      if (tab.query !== '') {
        fetchSearchData("movie");
      } else {
        fetchData("movie", "now_playing", false);
        fetchData("movie", "popular", false);
        fetchData("movie", "top_rated", false);
        fetchData("movie", "upcoming", false);
      }
    } else if (tab.current === "TV Show"){
      if (tab.query !== '') {
        fetchSearchData("tv");
      } else {
        fetchData("tv", "airing_today");
        fetchData("tv", "popular");
        fetchData("tv", "top_rated");
        fetchData("tv", "on_the_air");
      }
    } else {
      console.error("Navigation tab not found");
    }

  }, [tab]);


  const toggleDetailMenu = (id) => {
    setSelectedId(id);
  }

  if (tab.query !== '') {
    return (
      <div className="showContainer">
        <div className="showRoomContainer">
          <h1 className="searchTitle">Searching: {tab.query}</h1>
          <SearchContainer data={searchQuery} toggleDetailMenu={toggleDetailMenu} />
        </div>

        <div className="footer">
          Check out my portfolio XD
        </div>
      </div>
    )

  } else {

    return (
      <div className="showContainer">
        <div className="showCarouselContainer">
          <ShowCarousel data={popular} toggleDetailMenu={toggleDetailMenu}/>
        </div>

        <div className="showRoomContainer">
          <ShowSlider media={tab.current} data={nowPlaying} category={"Now Playing"} toggleDetailMenu={toggleDetailMenu}/>
          <ShowSlider media={tab.current} data={upcoming} category={"Coming Soon"} toggleDetailMenu={toggleDetailMenu}/>
          <ShowSlider media={tab.current} data={topRated} category={"The Best Of The Best"} toggleDetailMenu={toggleDetailMenu}/>
        </div>

        {selectedId >= 0 ? <InfoPanel id={selectedId} media={tab.current} toggleDetailMenu={toggleDetailMenu}/> : <></>}


        <div className="footer">
          <h1>Powered By: </h1>
          <img className="footerImage" src="movieDB.svg" alt=""/>
        </div>

      </div>
    )
  }
}

export default ShowRoom;
