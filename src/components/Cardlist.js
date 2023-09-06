import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import backgroundIMG from "../assets/Ellipse 66.png"
import vector1 from "../assets/Vector.png"
import vector2 from "../assets/Vector (1).png"
import vector3 from "../assets/Vector5.png"
const StyledCardList = styled.div`
  display: flex;
  justify-content: space-around;
  /* height: 40vh; */
 width: 80% !important;
  margin: 0 auto;
  margin-top: 5%;
  color: white;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 90%;
  }
`;

const CardList = () => {
  const cards = [
    {
      id: 1,
      title: 'Stem Cell Therapy',
      body:
        'Stem cell therapy is a form of regenerative medicine designed to repair damaged cells within the body by reducing inflammation and modulating the immune system.',
        src:`${vector1}`
    },
    {
      id: 2,
      title: 'PRP/Platelet Rich Plasma',
      body:
        'Platelet-rich plasma (PRP) therapy uses injections of a concentration of a patient’s own platelets to accelerate the healing of injured tendons, ligaments, muscles and joints.',
        src:`${vector2}`
      },
    {
      id: 3,
      title: 'Prolotherapy',
      body:
        'Prolotherapy is a non-surgical injection procedure used to relieve back pain by treating connective tissue injuries (ligaments and tendons) of the musculoskeletal system that have not healed by either rest or conservative therapy in order to relieve back pain.',
        src:`${vector3}`
      },

  ];

  return (
    <StyledCardList>
      {cards.map((card) => (
      
        <div key={card.id} style={{
          width:"370px !important",
          height:"500px !important",
          borderRadius:"12px",
          border:"1px solid #6A6A6A",
          backgroundColor:"#201451",
          padding:"40px 30px 30px 20px",
          zIndex:2
        }}>
          <div style={{
            position:"relative",
            marginBottom:"20px"
          }}>
            <img width={100} height={100} src={backgroundIMG}/>
            <img src={card.src} style={{
              position:"absolute",
             left:"24%",
             bottom:"30%",
             width:"45px",
             height:'47px'
            
            }}/>

          </div>
          <div style={{
          fontSize:"25px",
          fontWeight:"700",
          lineHeight:"1",
          width:"100%",
          fontWeight:"'Poppins', sans-serif",
          marginBottom:"10px"

        }}>{card.title}</div>
          <div style={{
           fontSize:"15px",
          fontWeight:"400",
          lineHeight:"1",
          width:"100%",
          color:"#BEBEBE",
          fontWeight:"'Poppins', sans-serif"
        }}>{card.body}</div>
        </div>
        // <Card key={card.id} header={card.title} body={card.body} />
      ))}
    </StyledCardList>
  );
};

export default CardList;
