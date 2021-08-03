import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'

export default () => {

  const [movieList, setMovieList] = useState([]); //Passa as informações para MovieList

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      console.log(list);
      setMovieList(list);
    }

    loadAll();
  }, []);
  
  
  return(
    <div className="page">
      <section className="lists">
        {
          movieList.map((item, key) =>  (
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))
        }
      </section>




      {/* <h1>
        3 - Header
        2 - Destaque
        1 - Listas (não é necessário repetir)
        4 - Rodapé basicão
      
      </h1> */}
      

    </div> 
  )
}