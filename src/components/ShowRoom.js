import React from 'react';
import ShowTile from './ShowTile.js';
import InfoPanel from './InfoPanel.js';


const ShowRoom = (tab) => {

  const [data, setData] = React.useState([]);
  const [infoId, setInfoId] = React.useState(-1);

  React.useEffect(() => {
    const fetchData = async () => {

      try {
        let field = '';

        if (tab.current === "Home") {
          field = "now_playing";
        } else if (tab.current === "Upcoming"){
          field = "upcoming";
        } else if (tab.current === "Popular"){
          field = "popular";
        } else {
          throw Error("Navigation tab not found");
        }

        const res = await fetch('https://api.themoviedb.org/3/movie/' + field + '?api_key=b369da1370460aa195101abae0307148');

        if (!res.ok) {
          throw Error(res.statusText);
        }
        const json = await res.json();
        setData(json.results);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [tab]);


  const toggleDetailMenu = (id) => {
    setInfoId(id);
  }

  return (
    <>
      <div>
        {data.map((show) => {
          return (<ShowTile key={show.id} movie={show} toggleDetailMenu={toggleDetailMenu}/>)
        })}
      </div>

      {infoId >= 0 ? <InfoPanel data={data.filter((show) => {return show.id == infoId;})}/> : <></>}

    </>
  )
}

export default ShowRoom;
