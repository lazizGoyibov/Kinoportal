import axios from 'axios';
import { useState,useEffect } from 'react';
import {Helmet} from "react-helmet";


import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';



import MovieCard from "../components/MovieCard"

import '../assets/styles/main.scss'

const Movies = () => {


    const [page, setPage] = useState(1)
    const [movieList, ListSetter] = useState({
        isFetched: false,
        data: {},
        error: null
    })

    const pageChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
            params:{
                api_key: "7b569a40a0e5bb279cbb8360767434cc",
            }
        })
        .then((response) =>{
            console.log(response)
            ListSetter({
                isFetched: true,
                data: response.data.results,
                error: false
            })
        })
        .catch((err) => {
            ListSetter({
                isFetched: true,
                data: {},
                error: false
            })
        })
    }, [page])

    console.log(movieList)

    return(
        <Container maxWidth="lg" minWidth="sm">
          <div className="Movies">

              <Helmet>
                  <title>
                      Movies
                  </title>
              </Helmet>
          <Grid container spacing={3} >
          {
               movieList.isFetched ? (
                   movieList.data.map((item, index) => (
                       <Grid item xs={6} sm={3}>
                           <MovieCard
                       id={item.id}
                       cardImg={item.poster_path}
                       cardTitle={item.title}
                       cardDate={item.release_date}
                       key={index}
                       path="/singleMovie/"
                       
                       />
                       </Grid>
                   ))
               ) : (
                   <h1>Loading....</h1>
               )
          }
          </Grid>

          <div className="pagination">
          <Pagination 
            count={50} 
            color="primary" 
            onChange={(e) => pageChange(e.target.textContent)}
            hideNextButton
            hidePrevButton
            
            />
          </div>
          </div>
        </Container>
    )
}

export default Movies;