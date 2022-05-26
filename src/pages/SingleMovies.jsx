import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';



import '../assets/styles/main.scss'


const SingleMovies = () => {

    const {id} = useParams();
    const [movieList, ListSetter] = useState({
        isFetched: false,
        data: {},
        error: null
    })

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params:{
                api_key: "7b569a40a0e5bb279cbb8360767434cc",
            }
        })
        .then((response) =>{
            console.log(response)
            ListSetter({
                isFetched: true,
                data: response.data,
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
    }, [])

    console.log(movieList)

    return(
        <div className="singleMovie">
          {
               movieList.isFetched ? (
                <div className="movie-wrapper">
                <div className="movie-inner">
                    <div className="movieBox-left">
                         <img src={`https://image.tmdb.org/t/p/w500/${movieList.data.poster_path}`} alt="" className="show-img" />
                    </div>
                    <div className="movieBox-right">
                             <h1 className='show-title'>
                                 {movieList.data.original_title}
                             </h1>
                             <p className="show-subtitle">
                                 {movieList.data.tagline}
                             </p>
                             <div className="show-info">
                                 <p className="show-type">
                                     {movieList.data.type}
                                 </p>
                                 <p className="show-country">
                                 Country: <b>{movieList.data.production_countries.name}</b>
                                 </p>
                                 <p className="show-language">
                                 Language: <b>{movieList.data.original_language}</b>
                                 </p>
                             </div>
                             <p className="show-overview">
                                 {movieList.data.overview}
                             </p>
                             
                    </div>
            </div>
            </div>
               ) : (
                   <h1>Loading....</h1>
               )
          }
        </div>
    )
}

export default SingleMovies;