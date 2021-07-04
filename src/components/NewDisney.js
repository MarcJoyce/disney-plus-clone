import styled from 'styled-components';
import { Link } from 'react-router-dom';


import { useSelector } from 'react-redux';
import { selectNewDisney } from '../features/movie/movieSlice';

const NewDisney = (props) => {

  const movies = useSelector(selectNewDisney);

  return (
    <Container>
      <h4>New to Disney+</h4>
      <Content>
      { 
          movies && movies.map( ( movie, key ) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={"/detail/" + movie.id}>
                <img src={movie.cardImage} alt={movie.title} />
              </Link>
            </Wrap>
          ))
         }
      </Content>
    </Container>
  )
}

const Container = styled.div`
padding: 0 0 24px;
`;

const Content = styled.div`
display: grid;
grid-gap: 25px;
gap: 25px;
grid-template-columns: repeat(4, minmax(0, 1fr));

@media (max-width: 768px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
`;

const Wrap = styled.div`
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 70%) 0px 25px 30px -10px,
rgb(0 0 0 / 75%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
transition: all .25s cubic-bezier(0.25, 0.45, 0.45, 0.95) 0s;
border: 3px solid rgba(250, 250, 250, 0.1);

img {
  inset: 0px;
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  position: absolute;
  transition: opacity .5s ease-in-out 0s;
  width: 100%;
  z-index: 1;
  top: 0;
}

&:hover {
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 50px -16px,
  rgb(0 0 0 / 72%) 0px 30px 22px -16px;
  border-color: rgba(250, 250, 250, 0.8);
  transform: scale(1.05);
}
`;


export default NewDisney;