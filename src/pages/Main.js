import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Form, AutoComplete } from "antd";
import { Icon } from "@iconify/react";
import MainBack from "../assets/new-background.png";
import MainCircleImage from "../assets/MainCircle.png";
import Ellipse from "../assets/Ellipse.png"
import EllipseDOC from "../assets/EllipseDOC.png"
import verctor from "../assets/Vector.png"
import Services from "./Services";
import Contact from "./Contact";
import PlacesAutocomplete from "react-places-autocomplete";
import insertTopSearch from "./insertTopSearch";
import axios from "axios";
import { terms, MAPBOX_TOKEN } from "../config";
import Navbar from "../components/Navbar";
import { Autocomplete, Divider, TextField, Typography } from "@mui/material";
import { Img, background } from "@chakra-ui/react";
import compined from "../assets/Combined-Shape.png"
import strock from "../assets/Stroke-1.png"


const IconWrapper = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  pointer-events: none;

  svg {
    position: absolute;
    width: 16px;
    height: 16px;
    color: purple;
  }
`;

const StyledErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StyledTextContainer = styled.div`
  flex: 1;
  padding-right: 2rem;
`;

const StyledImageContainer = styled.div`
  flex: 1;
 display: flex;
 justify-content: center;
`;

const StyledImage = styled.img`
  width: 70%; /* Adjust as needed */
`;
const StyledImageEllips = styled.img`
    position: absolute;
    left: 10px;
    top: -52px;
    width: 30%;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 10rem;

  .treatment-text {
    color: white;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10rem;
  }

  .ant-input {
    width: 0rem;
    height: 50px;

    @media screen and (max-width: 768px) {
      width: 80%;
    }
  }

  .type-button {
    width: fit-content;
    margin-left: 5px;
  }
`;

const StyledContainer = styled.div`
  min-height: 100vh;
  background-image: url(${MainBack});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  image-rendering: optimizeQuality;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  /*  */


  h5 {
    color: var(--main-color);
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    background-attachment: scroll;
    padding: 2rem;
    background-position: 20% center;
    min-height: 100vh;
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledMainText = styled.h1`
  color: white;
  padding-top: 6rem;
  text-align: center;
  font-size:54px;
  font-weight: 600;
  font-family: 'Domine', serif; /* Apply Domine font */
  animation: ${fadeInAnimation} 2s ease-in-out;
  text-align: start;
  margin-top: 50px;
    padding-left: 60px;
  @media screen and (max-width: 768px) {
    padding-top: 3rem;
    font-size: 1.5rem;
  }

  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: purple;
    margin-top: 1rem;
  }
`;
const Styleimagecontainer=styled.div`
display: flex;
align-items: center;
gap: 10px;
background-color: white;
/* height: fit-content; */
border-radius: 15px;
padding: 5px;
position: absolute;
bottom: -35px;
right: 0;
width:206px;
height:79px;
`
const StyledImageEllipsDoctor =styled.img`

`
const Main = () => {
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [options, setOptions] = useState([]);
    // Define suggestions state
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = useCallback((value) => {
    const filterTerm = value.trim(); // Trim any leading or trailing whitespace
    setSearchTerm(filterTerm);

    const filteredOptions = terms
      .filter((term) => term.toLowerCase().includes(filterTerm.toLowerCase()))
      .map((term) => ({ value: term }));

    setOptions(filteredOptions);
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (!searchTerm) {
          setErrorMessage("Please enter a search term");
        } else if (!address) {
          setErrorMessage("Please enter a location");
        } else {
          const filterTerm = searchTerm.trim(); // Trim any leading or trailing whitespace
          console.log("Search term:", filterTerm);

          // Update top searches in the database
          insertTopSearch(filterTerm);

          // Update top searches in the database
          console.log("Before updateTopSearches");
          // updateTopSearches(filterTerm);
          console.log("After updateTopSearches");

          navigate("/results", {
            state: {
              searchTerm: filterTerm,
              location: address,
              checkedOptions: checkboxOptions,
            },
          });
        }
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleAddressChange = async (value) => {
    setAddress(value);
  
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${MAPBOX_TOKEN}`
      );
  
      // Filter suggestions for US cities
      const usCities = response.data.features.filter(
        (suggestion) =>
          suggestion.context &&
          suggestion.context.find(
            (context) => context.id.startsWith("country") && context.short_code === "us"
          )
      );
  
      setSuggestions(usCities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  

  const [checkboxOptions, setCheckboxOptions] = useState([
    { label: "PRP", value: "PRP", checked: false },
    { label: "Stem Cell Therapy", value: "Stem", checked: false },
    { label: "Prolotherapy", value: "Prolotherapy", checked: false },
  ]);

  const handleButtonClick = (value) => {
    const updatedOptions = checkboxOptions.map((option) =>
      option.value === value ? { ...option, checked: !option.checked } : option
    );
    setCheckboxOptions(updatedOptions);
  };

  const handleButtonStyle = (value) => {
    const option = checkboxOptions.find((option) => option.value === value);
    return option.checked
      ? { color: "white", backgroundColor: "var(--main-color)" }
      : {};
  };

  const handleSuggestionClick = (suggestion, event) => {
    event.stopPropagation(); // Stop event propagation

    const filterTerm = suggestion.value.toString(); // Convert to string
    setSearchTerm(filterTerm.toLowerCase());
    console.log(`search term: ${searchTerm}`);
  };

  console.log("Render options:", options);

  return (
    <Layout style={{overflow:"hidden"}}>
   <Navbar/>
      
      <StyledContainer>
       
        <StyledMainContainer style={{marginTop:"50px"}}>
          <StyledTextContainer>
            <StyledMainText>
              Find a Regenerative Medicine Doctor<br></br> based on your condition
            </StyledMainText>
            <p style={{ color: 'white',
            paddingLeft: "60px", }}>
              Treatment with a best doctor, for your good today and tomorrow.
            </p>
            <StyledForm form={form} onFinish={handleSubmit} layout="vertical" style={{
             flex:1,
            marginTop:"20px",
           zIndex:"1111",
            display:"flex",
            flexDirection:"column",
            justifyContent:'flex-start',
            alignItems:"flex-start",
            marginLeft:"54px",
        
            }}>
              {/* Display error message */}
              {errorMessage && (
                <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
              )}

              <div className="form-row" style={{
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "rgba(255, 255, 255, 16%)",
                  border: "0.4px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: "12px",
                  padding: "20px 30px",
                  gap: "10px",
                  width: "650px",
                  height: "90px",
                  borderBottom:"none",
                  borderBottomLeftRadius:"0",
                 
              }}>
                <div style={{ display: "flex",
                 justifyContent: "center", 
              position:"relative",
                 }}>
                  <Img src={verctor} style={{
                    position:'absolute',
                    left:"0",
                    bottom:"14px",
                    marginLeft:"10px"
                  }}/>
                  <input
                  options={options}
                  onSelect={(value) => setSearchTerm(value)}
                  onSearch={handleSearch}
                style={{
                  backgroundColor:"#191049",
                  color:"#9E9E9E",
                  border:"none",
                  padding:"0px 35px",
                  borderRadius:"5px",
                 fontSize:"14px",
                 width:"250px"
                }}
                  placeholder="Search medical conditions"
                  
                  
                  />
                  
                  <Img src={strock} style={{
                    position:'absolute',
                    right:"10px",
                    bottom:"16px",
                    marginLeft:"10px"
                  }}/>
                </div>
                <div style={{ display: "flex",
                 justifyContent: "center", 
              position:"relative",
                 }}>
                  <Img src={compined} style={{
                    position:'absolute',
                    left:"0",
                    bottom:"14px",
                    marginLeft:"10px"
                  }}/>
                  <input
                  // value={address}
                  onSelect={(value) => setAddress(value)}
                  onSearch={handleAddressChange}
                  placeholder="Enter a location..."
                  options={suggestions.map((suggestion) => ({
                    label: suggestion.place_name,
                    value: suggestion.place_name,
                  }))}
                style={{
                  backgroundColor:"#191049",
                  color:"#9E9E9E",
                  border:"none",
                  padding:"0px 35px",
                  borderRadius:"5px",
                  width:"250px"
                 
                }}
                 />
                  <Img src={strock} style={{
                    position:'absolute',
                    right:"10px",
                    bottom:"16px",
                    marginLeft:"10px"
                  }}/>
                 
                </div>
              
                <Button 
                style={{
                 
                    background:"linear-gradient(#0019FB, #E409E8)",
                    borderRadius:"12px",
                    fontWeight:"normal",
                   
                    textTransform:"capitalize",
                   
                    fontFamily:" 'Poppins', sans-serif",
                    border:"1px solid #E409E8",
                    color:"white",
                    padding:"25px 25px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}
                className="search-button" htmlType="submit">
                Search
              </Button>
              </div>
             <div 
             style={{
              
              backgroundColor: "rgba(255, 255, 255, 0.16)",
              border: "0.4px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "12px",
              padding: "20px 30px",
              gap: "5px",
              width: "350px",
              height: "60px",
              borderTopLeftRadius:"0",
              borderTopRightRadius:"0",
              borderTop:"none",
              textAlign:"start",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0px",
              paddingTop:"5px",
              paddingLeft:"10px"
          
          }}
             >
             <p style={{
                paddingTop: "25px",
                paddingBottom: "0",
                marginBottom: "0",
                color:"#FFFFFF",
                fontWeight:"400",
                fontSize:"15px",
                fontFamily: "Poppins, sans-serif",
             }}>Select Treatment Type :</p>
              <div className="button-group" style={{
                display:"flex",
                
                color:"white",
                textAlign:"center",
                paddingTop:"-10px",
                justifyContent:'space-between',
                marginTop:"5px"
              }}>
                {/* {checkboxOptions.map((option) => (
                  <Button
                    className="type-button"
                    type={option.checked ? "primary" : "default"}
                    onClick={() => handleButtonClick(option.value)}
                    style={handleButtonStyle(option.value)}
                    key={option.value}
                  >
                    {option.label}
                  </Button>
                ))} */}
                <Typography
                    className="type-button"
                    sx={{
                      background:"linear-gradient(#0019FB, #E409E8)",
                    borderRadius:"12px",
                    fontWeight:"normal",
                   
                    textTransform:"capitalize",
                   
                    fontFamily:" 'Poppins', sans-serif",
                    border:"1px solid #E409E8",
                    color:"white",
                    
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100px !important" ,
                    height:"35px !important",
                    cursor:"pointer"
                    }}
                  >
                   prp
                  </Typography>
                  <Typography sx={{
                    fontSize:"12px",
                    lineHeight:"40px",
                    cursor:"pointer"
                  }}>Stem Cell Therapy</Typography>
                  <Typography sx={{
                    fontSize:"12px",
                    lineHeight:"40px",
                   cursor:"pointer"
                  }}>Prolotherapy</Typography>
              </div>
             </div>
              
            </StyledForm>
          </StyledTextContainer>
          <StyledImageContainer style={{
            position:"relative",
            marginTop:"50px"
          }}>
            <StyledImageEllips src={Ellipse} alt="Ellipse"/>
            <StyledImage src={MainCircleImage} alt="Main Circle" />
            <Styleimagecontainer>
            <StyledImageEllipsDoctor src={EllipseDOC} alt="EllipseDOC"/>
            <Typography sx={{fontWeight:"bold"}}><span style={{
              color:"#2117F9"
            }}>10k+</span> Happy Patients</Typography>
            </Styleimagecontainer>
          </StyledImageContainer>
        </StyledMainContainer>
      </StyledContainer>
      <Services />
      <Contact />
    </Layout>
  );
};

export default Main;
