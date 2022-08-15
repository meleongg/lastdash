import React, { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { firestore } from './persistence/firebase.config';
import { addDoc, collection } from '@firebase/firestore';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './App.css'

import HomePage from './pages/HomePage';
import StopsNearMePage from './pages/StopsNearMePage';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init(
      { duration: 2000,
        once: false, // whether animation should happen only once - while scrolling down
        mirror: true, // whether elements should animate out while scrolling past them
    });
    AOS.refresh();
  });

  const messageRef = useRef();
  const ref = collection(firestore, 'messages');

  const handleSave = async(e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value
    }

    try {
      await addDoc(ref, data);
    } catch (e) {
      console.log('Unable to write data!', e);
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/stops-near-me' element={<StopsNearMePage />}/>
              <Route path='/favourite-stops' element={<HomePage />}/>
              <Route path='/recent-queries' element={<HomePage />}/>
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
    // <div className="App">
    //   <div className='test-div' data-aos="fade-in">
    //     <h1>Hello this is filler</h1>
    //   </div>
    //   <FontAwesomeIcon icon={faCoffee} size='lg'/>
    //   <div className='test-div-form'>
    //     <form onSubmit={handleSave} className='test-form'>
    //       <label htmlFor="">Enter Message</label>
    //       <input type="text" ref={messageRef}/>
    //       <button type="submit">Submit</button>
    //     </form>
    //   </div>
    //   <div className='test-div' data-aos="fade-right">
    //     <h1>Hello this is filler also</h1>
    //   </div>
    //   <footer>
    //     <p>this my footer</p>
    //   </footer>
    // </div>
  );
}

export default App;
