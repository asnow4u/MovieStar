import React from 'react';
import NavBar from './components/Navbar';
import ShowRoom from './components/ShowRoom';

const App = () => {

  const [navTab, setNavTab] = React.useState("Movie");
  const [searchQuery, setSearchQuery] = React.useState('');

  const navChangeEvent = (tab) => {
    console.log(tab);
    setNavTab(tab);
  }

  const changeSearchQuery = (query) => {
    console.log(query);
    setSearchQuery(query);
  }

  return (
    <>
      <NavBar current={navTab} navChangeEvent={navChangeEvent} changeSearchQuery={changeSearchQuery}/>

      <ShowRoom current={navTab} query={searchQuery}/>
    </>
  )
}

export default App;
