import React, { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { firestore } from './persistence/firebase.config';
import { addDoc, collection } from '@firebase/firestore';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './App.css'

import HomePage from './pages/HomePage';
import StopsNearMePage from './pages/StopsNearMePage';
import RoutePage from './pages/RoutePage';
import FavouriteStopsPage from './pages/FavouriteStopsPage';

import AOS from 'aos';
import 'aos/dist/aos.css';
import apiServices from './persistence/apiServices';
import firebaseFunctions from './persistence/services';

function App() {
  useEffect(() => {
    AOS.init(
      { duration: 2000,
        once: false, // whether animation should happen only once - while scrolling down
        mirror: true, // whether elements should animate out while scrolling past them
    });
    AOS.refresh();
  });

  const getTransitData = async () => {
    let res = await apiServices.getStops(500, 49.187706, -122.850060);
    let routes = res[21].Routes.split(', ')
    console.log(routes);
  }

  // getTransitData();

  // (async () => {
  //   let res = await firebaseFunctions.getFaveStops();
  //   console.log(res);
  // })();

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/stops-near-me' element={<StopsNearMePage />}/>
              <Route path='/favourite-stops' element={<FavouriteStopsPage />}/>
              <Route path='/recent-queries' element={<HomePage />}/>
              <Route path='/routes/:id' element={<RoutePage />}/>
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
