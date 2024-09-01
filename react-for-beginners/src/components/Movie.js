import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({id, poster_img, title, overview, release_date}) {
  return (
    <Link to={`/movie/${id}`} className={styles.item_movie}>
      <div className="wrap_thumb">
        {!poster_img ? <span className="ico_noimg"></span> : <img src={`https://image.tmdb.org/t/p/w200${poster_img}`} alt="poster" />}
      </div>
      <div className={styles.cont_movie}>
        <h2 className={styles.tit_movie}>{title}</h2>
        <dl className={styles.info_date}>
          <dt>📅 개봉예정일 :</dt>
          <dd>{release_date}</dd>
        </dl>
        <p className={styles.desc_movie}>{overview}</p>
      </div>
    </Link>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  poster_img: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
}

export default Movie;