import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import MovieCard from "../components/MovieCard"



const SearchPage =  () => {

    const {id} = useParams();
    const [movieList, ListSetter] = useState({
        isFetched: false,
        data: {},
        error: null
    })

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${id}`, {
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
    }, [id])

    return (
        
          <Container maxWidth="lg" minWidth="sm">
          <div className="searchPage">
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

          
          </div>
        </Container>
      
    )
}


export default SearchPage;