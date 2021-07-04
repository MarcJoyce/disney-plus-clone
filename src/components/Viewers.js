import styled from 'styled-components'


const Viewers = (props) => {
  return (
    <Container>
      <Wrap>
      <img src="/assets/images/viewers-disney.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/assets/videos/1564674844-disney.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/assets/images/viewers-pixar.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/assets/videos/1564676714-pixar.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/assets/images/viewers-marvel.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/assets/videos/1564676115-marvel.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/assets/images/viewers-starwars.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source src="/assets/videos/1608229455-star-wars.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/assets/images/viewers-national.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted>
          <source
            src="/assets/videos/1564676296-national-geographic.mp4"
            type="video/mp4"
          />
        </video>
      </Wrap>
    </Container>
  )
}

const Container = styled.div`
margin-top: 30px;
padding: 30px 0 26px;
display: grid;
grid-gap: 25px;
gap: 25px;
grid-template-columns: repeat(5, minmax(0, 1fr));

@media (max-width: 768px) {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
`;

const Wrap = styled.div`
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
rgb(0 0 0 / 73%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
transition: all .25s cubic-bezier(0.25, 0.45, 0.45, 0.95) 0s;
border: 3px solid rgba(250, 250, 250, 0.1);

img {
  inset: 0;
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  position: absolute;
  z-index: 1;
  top: 0;
}

video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: 0;
}

&:hover {
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 60px -16px,
  rgb(0 0 0 / 72%) 0px 30px 20px -10px;
  transform: scale(1.05);
  border-color: rgba(250, 250, 250, 0.8);
  video {
    opacity: 1;
  }
}
`;

export default Viewers;