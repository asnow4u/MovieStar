import React from 'react';
import ShowSlider from './ShowSlider.js';
import InfoPanel from './InfoPanel.js';


const ShowRoom = (tab) => {

  const [nowPlaying, setNowPlaying] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);

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


    if (tab.current === "Movie") {
      fetchData("movie", "now_playing");
      fetchData("movie", "popular");
      fetchData("movie", "top_rated");
      fetchData("movie", "upcoming");

    } else if (tab.current === "TV Show"){
      fetchData("tv", "airing_today");
      fetchData("tv", "popular");
      fetchData("tv", "top_rated");
      fetchData("tv", "on_the_air");
    } else {
      console.err("Navigation tab not found");
    }

  }, [tab]);


  const toggleDetailMenu = (id) => {
    setSelectedId(id);
  }


  return (
    <>
      <div className="showRoomContainer">
        <ShowSlider media={tab.current} data={nowPlaying} category={"Now Playing"} toggleDetailMenu={toggleDetailMenu}/>
        <ShowSlider media={tab.current} data={upcoming} category={"Upcoming"} toggleDetailMenu={toggleDetailMenu}/>
        <ShowSlider media={tab.current} data={popular} category={"Popular"} toggleDetailMenu={toggleDetailMenu}/>
        <ShowSlider media={tab.current} data={topRated} category={"Top Rated"} toggleDetailMenu={toggleDetailMenu}/>
      </div>

      {selectedId >= 0 ? <InfoPanel id={selectedId} media={tab.current}/> : <></>}
    </>
  )
}

export default ShowRoom;
