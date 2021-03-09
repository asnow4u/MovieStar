import React from 'react';

const Search = (tab) => {

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

    }}>
     <input type='text' onChange={(e) => {tab.changeSearchQuery(e.target.value)}}/>
     <button type="submit">Search</button>
    </form>
  )
}

export default Search;
