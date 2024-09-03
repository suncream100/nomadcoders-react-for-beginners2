import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [countryName, setCountryName] = useState([]);
  const [credit, setCredit] = useState([]);

  const fetchData = async () => {
    try {
      const apiArr = [
        {
          apiName : 'movieApi',
          apiUrl : `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&api_key=5984953a74d52b49b9aa45ad23721fa5`
        },
        {
          apiName : 'countryApi',
          apiUrl : `https://api.themoviedb.org/3/configuration/countries?language=ko-KR&api_key=5984953a74d52b49b9aa45ad23721fa5`,
        },
        {
          apiName : 'creditApi',
          apiUrl : `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR&api_key=5984953a74d52b49b9aa45ad23721fa5`
        }
      ];
      
      // Promise.allSetteled 여러 API 호출 결과와 값을 반환
      const promiseResults = await Promise.allSettled(
        apiArr.map(async (url) => await (await fetch(url.apiUrl)).json())
      );

      // 각 결과를 해당 state에 저장
      apiArr.forEach((item, index) => {
        if (promiseResults[index].status === 'fulfilled') {
          switch (item.apiName) {
            case 'movieApi':
              setMovie(promiseResults[index].value);
              break;
            case 'countryApi':
              setCountryName(promiseResults[index].value);
              break;
            case 'creditApi':
              const {cast, crew} = promiseResults[index].value;
              setCredit([crew.find(item => item.department === 'Directing'), ...cast.slice(0, 5)]);
              break;
            default:
              break;
          }
        }
      });
    } catch (err) {
      console.log(`error!`)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  return (
    <Fragment>
      {!loading ? <div className="wrap_movie wrap_detail">
        <h1 className="tit_movie">개봉예정작 ✨</h1>
        <div className="box_g">
          <div className={styles.summary_detail}>
            <div className="wrap_thumb">
              {!movie.poster_path ? <span className="ico_noimg"></span> : <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />}
            </div>
            <dl className={styles.info_movie}>
              <div>
                <dt>제목</dt>
                <dd>{movie.title}{movie.title !== movie.original_title ? ` (${movie.original_title})` : null}</dd>
              </div>
              <div>
                <dt>개봉예정일</dt>
                <dd>{movie.release_date}</dd>
              </div>
              <div>
                <dt>상영시간</dt>
                <dd>{movie.runtime ? movie.runtime : '-'}분</dd>
              </div>
              <div>
                <dt>장르</dt>
                <dd>
                  {movie.genres ?
                    movie.genres.map((item) => (
                      <span className={styles.txt_info} key={item.id}>{item.name}</span>
                    ))
                    : '-'
                  }
                </dd>
              </div>
              <div>
                <dt>국가</dt>
                <dd>
                  {movie.production_countries ?
                    movie.production_countries.map((item) => {
                      const country = countryName.find(obj => obj.iso_3166_1 === item.iso_3166_1);
                      return (
                        <span className={styles.txt_info} key={item.iso_3166_1}>
                          {country ? country.native_name : '-'}
                        </span>
                      );
                    }) 
                    : '-'
                  }
                </dd>
              </div>
              <div>
                <dt>소개</dt>
                <dd>{movie.overview}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.credit_detail}>
            <h2 className={styles.tit_credit}>감독/출연</h2>
            <ul className={styles.list_credit}>
              {credit.map((item) => (
                <li key={item.credit_id}>
                  <div className="wrap_thumb">
                    {!item.profile_path ? <span className="ico_noimg"></span> : <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} alt="profile" />}
                  </div>
                  <div className={styles.cont_credit}>
                    <h2 className={styles.tit_profile}>{item.name}</h2>
                    {item.department !== 'Directing' && item.character === '' ? null :
                      <span className={styles.txt_job}>
                        {item.department === 'Directing' ? '감독' : `${item.character === 'Self' ? '본인' : item.character} 역`}
                      </span>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> : null}
      {loading ? <Loading /> : null}
    </Fragment>
  )
}

export default Detail;