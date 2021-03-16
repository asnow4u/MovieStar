import React from 'react';

const InfoPanel = (show) => {

  const [showDetails, setShowDetails] = React.useState('');

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
          <img className="infoPanelPosterImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + showDetails.poster_path}/>
        </div>
        <div className="infoPanelData">
          <h1 className="infoPanelTitle"> { show.media === "Movie" ? showDetails.title : showDetails.name}</h1>

          <ul className="infoPanelGenreList">
          {showDetails.genres.map((genres) => {
              return (<li key={genres.id} className="infoPanelGenreListElement">--{genres.name}--</li>);
          })}
          </ul>

          <div className="infoPanelSection">
            <div className="infoPanelDisc">
              <p>{showDetails.overview}</p>


            </div>

            <div className="infoPanelDetails">

              {show.media==="Movie" ?
                <ul className="infoPanelDetailList">
                  <li className="infoPanelDetailListElements">Release Date: {showDetails.release_date}</li>
                  <li className="infoPanelDetailListElements">Length: {showDetails.runtime} minutes</li>
                  <li className="infoPanelDetailListElements">Revenue: ${showDetails.revenue.toLocaleString()}</li>
                </ul>
              : <ul className="infoPanelDetailList">
                  <li className="infoPanelDetailListElements">Release Date: {showDetails.first_air_date}</li>
                  <li className="infoPanelDetailListElements">Seasons: {showDetails.number_of_seasons}</li>
                  <li className="infoPanelDetailListElements">Episodes: {showDetails.number_of_episodes}</li>
                </ul>}
            </div>
          </div>

          <div className="infoPanelReview">
              <img className="infoPanelReviewStar" src="star.png"/>
              <p className="infoPanelReviewScore">{showDetails.vote_average}</p>
          </div>

        </div>
      </div>
    );

  }

  return (<></>);
}

export default InfoPanel;
