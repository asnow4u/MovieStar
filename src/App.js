import React from 'react';
import NavBar from './components/Navbar';
import ShowRoom from './components/ShowRoom';

const App = () => {

  const [navTab, setNavTab] = React.useState("Movie");

  const navChangeEvent = (tab) => {
    setNavTab(tab);
  }

  return (
    <>
      <NavBar current={navTab} navChangeEvent={navChangeEvent}/>

      <ShowRoom current={navTab}/>
    </>
  )
}

export default App;
