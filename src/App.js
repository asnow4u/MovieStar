import React from 'react';
import NavBar from './components/Navbar';
import ShowRoom from './components/ShowRoom';

const App = () => {

  const [navTab, setNavTab] = React.useState("Home");

  const navChangeEvent = (tab) => {
    setNavTab(tab);
  }

  return (
    <>
      <div className="bannerContainer">
      </div>

      <NavBar current={navTab} navChangeEvent={navChangeEvent}/>

      <ShowRoom current={navTab}/>

    </>
  )
}

export default App;
