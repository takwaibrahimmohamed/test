import React from 'react'
import styled from 'styled-components'
import Cardlist from '../components/Cardlist'
import DNAImg from '../assets/image 22.png'
import docImg from '../assets/Ellipse 61.png'
import hero from "../assets/hero-bg.png"
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Button } from 'antd'
const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
 
  margin: 0 auto;


background-color: #140437;
  .header {
    color: #444444;
  }

  h2 {
    color: #4811ab;
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  p {
    /* font-size: 1.2rem; */
    line-height: 1.5;
    letter-spacing: 0.05em;
    margin-bottom: 0;
    /* color: #a41ced; */
    font-weight: bold;
  }
div {
    width: 40%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: auto;

    div {
      width: 80%;
      margin: 2rem auto;
      text-align: center;
    }
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* h2 {
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: 0.1em;
    margin-top: 5rem;
    margin-bottom: 1rem;
  } */

  #bar {
    color: #4811ab;
    text-align: center;
  }

  /* #paragraph {
    color: #444444;
    font-size: 1.2rem;
    line-height: 1.5;
    letter-spacing: 0.05em;
    width: 100%;
    margin-top: 1.5rem;
    text-align: center;
    margin-bottom: 0;
  } */
`

const Services = () => {
  return (
    <div style={{
      backgroundColor:"#140437"
    }}>
      <StyledSection id='services-section' className='serv' style={{
       marginBottom: "200px",
      }}>
        <div style={{
           position:"relative"
        }}>
          <img src={DNAImg} style={{
            width:"500px",
            height:"500px",
            borderRadius:"50%",
           

          }} alt="dna"/>
         <box style={{width:"373px",
        minHeight:"239px",
        backgroundColor: "white",
        position: "absolute",
        borderRadius:"10px",
        top: "340px",
        left: "200px",
        paddingBottom:"20px"
        }}>
          <box style={{
            display: "flex",
            padding: "25px 25px",
            paddingBottom:"0",
            gap: "30px",
          }}>
            <img src={docImg}/>
            <p style={{
             fontWeight:"normal",
             display:"flex",
             flexDirection:"column",
             color:"#252627",
             fontWeight:"700",
             fontSize:"18px",
            }}>
              <span style={{
                fontWeight:"600",
                fontFamily:"Poppins, sans-serif",
                color:'#0E63F4',
                fontSize:"15px"
              }}>Neurologist</span>
              Dr. Melissa Kim
            </p>
          </box>
          <box style={{
            display:"flex",
            flexDirection:"column",
            padding:"25px",
            paddingTop: "10px"
          }}>
            <p style={{
               fontWeight:"400",
               fontFamily:"Poppins, sans-serif",
               fontSize:"16px",
               color:'#000'
            }}>Specialist in:</p>
            <p 
            style={{
              fontWeight:"600",
              fontFamily:"Poppins, sans-serif",
              fontSize:"14px",
              color:'#000'
           }}
            >
            I am Neurologist specializes in disorders of the nervous system,
             including the brain, spinal cord, and nerves.
            </p>
            <button style={{
              border:"none",
              backgroundColor:"#0E63F4",
              color:"white",
              borderRadius:"10px",
              padding:"20px 0",
              marginTop:"10px",
              marginBottom:"-20px",
              fontWeight:"700",
              fontSize:"14px"
            }}>Book Appointment</button>
          </box>
          
         </box>
        </div>
        <div style={{
       
          display:"flex",
          flexDirection:"column",
          gap:"30px"
        }}>
        <h2 style={{
             color:"white",
             fontWeight:"600",
             fontSize:"34px",
            
             fontFamily: "Poppins, sans-serif",
        }}>WHAT IS REGENERATIVE MEDICINE?</h2>
          <p  style={{
             color:"white",
             fontFamily: "Poppins, sans-serif",
             fontWeight:"400",
             fontSize:"20px",
        }}>
          The process of repairing or regenerating human cells, tissues, or organs as a result of disease, aging, or defects. 
          </p>
          <p  style={{
             color:"white",
             fontFamily: "Poppins, sans-serif",
             fontWeight:"400",
             fontSize:"15px"
        }}>
          The process of repairing or regenerating human cells, tissues, or organs as a result of disease, aging, or defects.
           The process of repairing or regenerating human cells, tissues, or organs as a result of disease, aging, or defects.
          </p>
          <button style={{
              marginLeft:"20px",
              background:"linear-gradient(#0019FB, #E409E8)",
              borderRadius:"25px",
              padding:"20px 40px",
              fontSize:"22px",
              textTransform:"capitalize",
              fontWeight:"500",
              fontFamily:" 'Poppins', sans-serif",
              border:"2px solid #E409E8",
              width:"294px",
              color:"white"
          }}>
            Explore Now  >>
          </button>
        </div>
      </StyledSection>
      <StyledSection id='about-section'
      style={{
        flexDirection:"column",
        minHeight:" 100vh",
        backgroundImage: `url(${hero})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        

      }}
      >
        <Heading style={{
          marginTop:"300px"
        }}>
          <Typography sx={{
            color:"#c40ceb",
            fontWeight:"500",
            fontSize:"20px",
            fontWeight:"'Poppins', sans-serif"

          }}>Our Services To You</Typography>
          <h2 className='header' style={{
 fontWeight:"'Poppins', sans-serif",
 color:"white",
 fontWeight:"700",
          }}>Our Medical Care Offerings</h2>
          <p style={{
            color:"#fff",
            fontWeight:"400",
            fontSize:"15px",
            fontWeight:"'Poppins', sans-serif"
          }}>Health services for you refer
             to a comprehensive range of medical and healthcare provisions
              available to address your individual health needs.</p>
        </Heading>
        <Cardlist />
      </StyledSection>
   
    </div>
  )
};

export default Services
