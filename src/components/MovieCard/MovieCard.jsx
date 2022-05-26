import {Link} from 'react-router-dom';

import './MovieCard.scss';


const MovieCard = ({id,cardTitle,cardImg,cardDate,path}) => {
    return(
        <Link to={`${path}${id}`} className="linkTO">
            <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${cardImg}`} alt="" className="card-img" />

            <div className="hover-block">
                <div className="card-text-block">
                            <h6 className="card-subtitle">
                                    {cardDate}
                            </h6>
                    <h4 className="card-title">
                        {cardTitle}
                    </h4>
                    
                    
                </div>
            </div>
        </div>


        </Link>
    )
}

export default MovieCard;