
import './App.css';

import React from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Home from './components/home/home';
import { useWeb3Context } from './hooks/useWeb3Context';
import Wallet from './components/wallet/Wallet';
import NewManifest from './components/manifest/new';


function App() {
  const { connected, address } = useWeb3Context()
  return (
    <div>
      <Routes>
        <Route path="/" index element={ <Home />} />
        <Route path="/new" element={ <NewManifest />} />
      </Routes>
      <div className='navigation'>
        <Wallet />
        <a href='/new'>New Manifest</a>
      </div>
      <Outlet></Outlet>  
    </div>
  );
}

export default App;

//        <Route path="/claim/:id" element={ <Utility /> } />
