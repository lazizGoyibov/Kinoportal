import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';



import '../assets/styles/main.scss'


const SingleShow = () => {

    const {id} = useParams();
    const [movieList, ListSetter] = useState({
        isFetched: false,
        data: {},
        error: null
    })

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
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
        <div className="singleShow container">
          {
               movieList.isFetched ? (
                   <div className="show-wrapper">
                       <div className="show-inner">
                           <div className="showBox-left">
                                <img src={`https://image.tmdb.org/t/p/w500/${movieList.data.poster_path}`} alt="" className="show-img" />
                           </div>
                           <div className="showBox-right">
                                    <h1 className='show-title'>
                                        {movieList.data.original_name}
                                    </h1>
                                    <p className="show-subtitle">
                                        {movieList.data.tagline}
                                    </p>
                                    <div className="show-info">
                                        <p className="show-type">
                                            {movieList.data.type}
                                        </p>
                                        <p className="show-country">
                                        Country: <b>{movieList.data.origin_country}</b>
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

export default SingleShow;