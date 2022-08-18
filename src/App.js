import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './App.css'

import HomePage from './pages/HomePage';
import StopsNearMePage from './pages/StopsNearMePage';
import RoutePage from './pages/RoutePage';
import FavouriteStopsPage from './pages/FavouriteStopsPage';
import RecentQueriesPage from './pages/RecentQueriesPage';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/stops-near-me' element={<StopsNearMePage />}/>
            <Route path='/favourite-stops' element={<FavouriteStopsPage />}/>
            <Route path='/recent-queries' element={<RecentQueriesPage />}/>
            <Route path='/routes/:id' element={<RoutePage />}/>
        </Routes>
    </ChakraProvider>
  );
}

export default App;
