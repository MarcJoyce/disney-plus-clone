import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';

import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommended from './Recommended';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';

const Home = (props) => {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommendedMovies = [];
  let newDisneyMovies = [];
  let originalMovies = [];
  let trendingMovies = [];
  let bannerMovies = [];

  useEffect(() => {
    db.collection('movies').onSnapshot( (snapshot) => {
      
      snapshot.docs.map( (doc) => {
        switch (doc.data().type ) {
          case "recommended" : 
            recommendedMovies = [ ...recommendedMovies, { id: doc.id, ...doc.data() }];
            break;
          case "new" :
            newDisneyMovies = [ ...newDisneyMovies, { id: doc.id, ...doc.data() }];
            break;
          case "original" :
            originalMovies = [ ...originalMovies, { id: doc.id, ...doc.data() }];
            break;
          case "trending" :
            trendingMovies = [ ...trendingMovies, { id: doc.id, ...doc.data() }];
            break;
        }
        if (doc.data().hasOwnProperty('bannerImage')) {
          bannerMovies = [ ...bannerMovies, { id: doc.id, ...doc.data() }];
        }
      })

      dispatch( setMovies( {
        recommended: recommendedMovies,
        newDisney: newDisneyMovies,
        trending: trendingMovies,
        original: originalMovies,
        banner: bannerMovies,
      }))
    })
  }, [ userName ])
   

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

const Container = styled.main`
position: relative;
min-height: calc(100vh - 250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw - 5px);

&:after {
  background: url("/assets/images/home-background.png") center center / cover no-repeat fixed;
  content: '';
  position: absolute;
  inset: 0px;
  opacity: 1;
  z-index: -1;
}
`;

export default Home;