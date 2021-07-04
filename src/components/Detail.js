import styled from 'styled-components'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import db from '../firebase';

const Detail = (props) => {

  const { id } = useParams();
  const [detailData, setDetailData] = useState({});


  useEffect(() => {
    db.collection("movies").doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setDetailData(doc.data());
      } else {
        console.log("No such document in firebase");
      }
    }).catch((error) => {
      alert(error.message);
    })
  }, [id]);


  return (
<Container>
  <Background>
    <img src={detailData.backgroundImage} alt={detailData.title} />
  </Background>
  <TitleImage>
    <img src={detailData.titleImage} alt={detailData.title} />
  </TitleImage>
  <ContentMeta>
    <Controls>
      <Player>
        <img src="/assets/images/play-icon-black.png" alt="" />
        <span>Play</span>
      </Player>
      <Trailer>
        <img src="/assets/images/play-icon-white.png" alt="" />
        <span>Trailer</span>
      </Trailer>
      <AddList>
      <span></span>
      <span></span>
      </AddList>
      <GroupWatch>
        <div>
          <img src="/assets/images/group-icon.png" alt="" />
        </div>
      </GroupWatch>
    </Controls>
    <SubTitle>{detailData.subTitle}</SubTitle>
    <Description>{detailData.description}</Description>
  </ContentMeta>
</Container>
  )
}

const Container = styled.div`
position: relative;
min-height: calc(100vh - 250px);
overflow-x: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw - 5px);
`;

const Background = styled.div`
left: 0;
opacity: 0.8;
position:fixed;
right: 0;
top: 0;
z-index: -1;

img {
  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    width: initial;
  }
}
`;

const TitleImage = styled.div`
align-items: flex-end;
display: flex;
-webkit-box-pack: start;
justify-content: flex-start;
margin: 0 auto;
height: 30vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img {
  max-width: 600px;
  min-width: 200px;
  width: 35vw;
}
`;

const ContentMeta = styled.div`
max-width: 874px;
`;

const Controls = styled.div`
display: flex;
align-items: center;
flex-flow: row nowrap;
margin: 24px 0;
min-height: 56px;
`;

const Player = styled.button`
font-size: 15px;
margin: 0 22px 0;
padding: 0 24px;
height: 56px;
border-radius: 4px;
display: flex;
align-items: center;
cursor: pointer;
justify-content: center;
letter-spacing: 1.5px;
text-align: center;
text-transform: uppercase;
background-color: rgba(250, 250, 250, 1);
border: none;
color: rgba(0, 0, 0, 1);

img {
  width: 32px;
}

  &:hover {
    background-color: rgba(190, 190, 190, 1);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 10px 0 0;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
background-color: rgba(0, 0, 0, 0.3);
border: 1px solid rgba(250, 250, 250, 1);
color: rgba( 250, 250, 250, 1);
`;

const AddList = styled.div`
margin-right: 16px;
height: 44px;
width: 44px;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.6);
border-radius: 50%;
border: 2px solid #FFFFFF;
cursor: pointer;

span {
  background-color: rgba(250, 250, 250, 1);
  display: inline-block;

  &:first-child {
    height: 2px;
    transform: translate(1px, 0px) rotate(0deg);
    width: 16px;
  }

  &:nth-child(2) {
    height: 16px;
    transform: translateX(-8px) rotate(0deg);
    width: 2px;
  }
}
`;

const GroupWatch = styled.div`
height: 44px;
width: 44px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background-color: rgba(255, 255, 255, 1);

div {
  height: 40px;
  width: 40px;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
`;

const SubTitle = styled.div`
  color: rgba(250, 250, 250, 1);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  color: rgba(250, 250, 250, 1);
  line-height: 1.5;
  font-size: 20px;
  padding: 16px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;