import React from 'react';

const InfoPanel = (show) => {

  const [movie, setMovie] = React.useState('');

  // console.log(show.data[0]);

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/` + show.id + `?api_key=b369da1370460aa195101abae0307148&append_to_response=credits`,
        );

        if (!res.ok) {
          throw Error(res.statusText);
        }

        setMovie(await res.json());


      } catch (e) {
        console.log(e);
      }
    }

    getDetails();
  }, [show]);

  console.log(movie);

  if (movie){
    return (
      <div>
        <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path}/>
        <h3>{movie.title}</h3>
        { movie.homepage ? <div onClick={() => {
          window.open(movie.homepage, '_blank');
        }}>Website</div> : <></>}
        {movie.genres.map((genres) => {
            return (<p key={genres.id}>{genres.name}</p>);
        })}
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Length: {movie.runtime} minutes</p>
        <p>Revenue: ${movie.revenue.toLocaleString()}</p>
        <p>Review Score: {movie.vote_average}</p>
      </div>
    )
  }

  return (<></>);
}

export default InfoPanel;
