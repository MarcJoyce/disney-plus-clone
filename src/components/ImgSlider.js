import styled from 'styled-components';

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectBanner } from '../features/movie/movieSlice';

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToSroll: 1,
    autoplay: true,
  };

  const movies =  useSelector(selectBanner);
  
  return (
      <Carousel {...settings} >
      { 
        movies && movies
        .map( ( movie, key ) => (
            <Wrap key={key}>
                <Link to={"/detail/" + movie.id}>
                <a>
                  <img src={movie.bannerImage} alt={movie.title} />
                </a>
                </Link>
            </Wrap>
          ))
         }
      </Carousel>
  )
}


const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgba(150, 160, 170, 1);
    }
  }

  li.slick-active button:before {
    color: #FFFFFF !important;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb( 0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    border: 3px solid transparent;
    transition: all 0.2s ease 0s;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      box-shadow: rgb(0 0 0 / 80%) 0px 40px 60px -16px,
      rgb(0 0 0 / 72%) 0px 30px 20px -10px;
      transform: scale(1.005);
      border-color: rgba(250, 250, 250, 0.8);
    }
  }
`;


export default ImgSlider