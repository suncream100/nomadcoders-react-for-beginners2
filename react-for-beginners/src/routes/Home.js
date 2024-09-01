import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getMovies = async() => {
    const {results, page, total_pages} = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&region=KR&page=1&api_key=5984953a74d52b49b9aa45ad23721fa5`)).json();
    setMovies(results);
    setCurrentPage(page);
    setTotalPages(total_pages);
    setLoading(false);
  }
  const getMoreMovies = async() => {
    const {results, page} = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&region=KR&page=${currentPage + 1}&api_key=5984953a74d52b49b9aa45ad23721fa5`)).json();
    setCurrentPage(page);
    setMovies((current) => [...current, ...results]);
    setLoading(false);
  }
  const moreBtnAction = () => {
    setLoading(true);
    getMoreMovies();
  }
  useEffect(() => {
    getMovies();
  },[]);
  return (
    <div className="wrap_movie">
      <h1 className="tit_movie">개봉예정작 ✨</h1>
      <div className="box_g">
        <ul className={styles.list_movie}>
          {movies.map((item) => (
            <li key={item.id}>
              <Movie
                id={item.id}
                title={item.title}
                poster_img={item.poster_path}
                overview={item.overview}
                release_date={item.release_date}
              />
            </li>
          ))}
        </ul>
        {currentPage === totalPages ? null : <button type="button" onClick={moreBtnAction} className={styles.btn_more}>더보기</button>}
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
}

export default Home;