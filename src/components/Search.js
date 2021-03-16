import React from 'react';

const Search = (tab) => {

  return (
    <form className="searchForm" onSubmit={(e) => {
      e.preventDefault();
    }}>
     <input className="searchFormInput" id="myInput" type='search' onChange={(e) => {tab.changeSearchQuery(e.target.value)}}/>
    </form>
  )
}

export default Search;
