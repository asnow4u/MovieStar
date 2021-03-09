import React from 'react';

const InfoPanel = (show) => {

  const [showDetails, setShowDetails] = React.useState('');

  // console.log(show.data[0]);

  React.useEffect(() => {
    const getDetails = async (media) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/` + media + `/` + show.id + `?api_key=b369da1370460aa195101abae0307148&append_to_response=credits`,
        );

        if (!res.ok) {
          throw Error(res.statusText);
        }

        setShowDetails(await res.json());


      } catch (e) {
        console.log(e);
      }
    }

    if (show.media==="Movie") {
      getDetails("movie");
    } else if (show.media==="TV Show"){
      getDetails('tv');
    }

  }, [show]);

  console.log(showDetails);

  if (showDetails){
    return (
      <div className="infoPanelBackGround" onClick={() => show.toggleDetailMenu(-1)}>
        <div className="infoPanelPoster">
          <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + showDetails.poster_path}/>
        </div>
        <div className="infoPanelData">
          <h3>{showDetails.title}</h3>
          { showDetails.homepage ? <div onClick={() => {
            window.open(showDetails.homepage, '_blank');
          }}>Website</div> : <></>}
          {showDetails.genres.map((genres) => {
              return (<p key={genres.id}>{genres.name}</p>);
          })}
          <p>{showDetails.overview}</p>

          { show.media==="Movie" ?
              <>
                <p>Release Date: {showDetails.release_date}</p>
                <p>Length: {showDetails.runtime} minutes</p>
                <p>Revenue: ${showDetails.revenue.toLocaleString()}</p>
              </> : <></> }

          <p>Review Score: {showDetails.vote_average}</p>
        </div>
      </div>
    );

  }

  return (<></>);
}

export default InfoPanel;
