import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie.js'
import Header from './components/Header'



export default () => {

  const [movieList, setMovieList] = useState([]); //Passa as informações para MovieList
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      console.log(list);
      setMovieList(list);

      //Pegando o featured
      let originals = list.filter( i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      //console.log(chosen);
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv'); 
      // Atribui à variável chosenInfo as informações coletadas da função (método) getMovieInfo, passando os parâmetros chosen.id e o tipo 'tv', pois estamos trabalhando somente com seriados


      setFeaturedData(chosenInfo);


    }

    loadAll();
  }, []);


  // Monitoramento da própria página (verifica o Scroll da Tela)

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);
  
  
  return(
    <div className="page">

      <Header black={blackHeader}/>

      {
        featuredData && <FeaturedMovie item={featuredData}/>
      }

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