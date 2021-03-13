import React from 'react';

const Search = (tab) => {

  const clearForm = () => {
    document.getElementById('myInput').value = '';
    tab.changeSearchQuery('');
  }

  return (
    <form className="searchForm" onSubmit={(e) => {
      e.preventDefault();

    }}>
     <input className="searchFormInput" id="myInput" type='text' onChange={(e) => {tab.changeSearchQuery(e.target.value)}}/>
     <button onClick={() => clearForm()} className="searchClearForm" type="submit">Clear</button>

    </form>
  )
}

export default Search;
