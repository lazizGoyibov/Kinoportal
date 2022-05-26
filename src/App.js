import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { lazy, Suspense, useState } from 'react';

import Header from './containers/Header';


import {
  Home,
  Movies,
  TvShows,
  SingleMovies,
  SingleShows,
  SearchPage,
  
} from './pages';


import './assets/styles/main.scss'


const LoginPage = lazy(() => import("./pages/Auth/LoginPage")) 
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage")) 
const ErrorPage = lazy(() => import("./pages/ErrorPage")) 



function App() {

  const [token, setToken] = useState(window.localStorage.getItem("sessionToken"));

  return (
   <Router>
      <Suspense fallback={<h1>Loading............</h1>}>
      {
        token ?  ( 

          
          <div className="App">
          <Header/>
        <div className='container'>
            
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/tvShows" element={<TvShows/>}/>
            <Route path="/singleMovie/:id" element={<SingleMovies/>}/>
            <Route path="/singleTvShow/:id" element={<SingleShows/>}/>
            <Route path="/search/:id" element={<SearchPage/>}/>
            <Route  path="*" element={<ErrorPage/>}/>
          
        </Routes>
      

        </div>

      </div>
          
        ) :  (
          
        
          <>

           


            <Routes>
            <Route exact path="/login" element={<LoginPage setToken={setToken}/>}/>
            <Route exact path="/" element={<RegisterPage setToken={setToken}/>}/>
            <Route  path="*" element={<ErrorPage/>}/>
          
          </Routes>
          </>
        
        )
      }

      </Suspense>
   </Router>
  );
}

export default App;
