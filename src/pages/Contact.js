import React from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import YouTube from 'react-youtube';
import { Heading } from '@chakra-ui/react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import EllipseDOC from "../assets/EllipseDOC.png"
import EllipseDOC2 from "../assets/Ellipse 8.png"
import EllipseDOC3 from "../assets/Ellipse 11.png"
import mask from "../assets/Mask group.png"
import hero from "../assets/hero-bg.png"
import icon from "../assets/Icon.png"
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Tweener  from '../assets/logo-twitter 2.png';

const Contact = () => {
  const onFinish = (values) => {
    console.log(values);
    message.success('Thank you for contacting us!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // YouTube video options
  const videoOptions = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div style={{
      backgroundColor:"#140437"
    }}>
 <section className="contact-section" style={{
      backgroundColor:"#140437",
      width:"100%",
        display:"flex",
        justifyContent:"center",
        flexDirection:'column',
        alignItems:"center",
        marginBottom:"100px"
    }}>
        <Heading style={{
          marginTop:"300px",
        width:"40%",
        display:"flex",
        justifyContent:"center",
        flexDirection:'column',
        alignItems:"center"
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
      <div style={{
        width:"90%",
        display:"flex",
        // justifyContent:"space-between"
        alignItems:"center",
        gap:"50px"
      }}>
      <Row gutter={24} style={{
        width:"100%",
       
      }}>
        <Col span={24}>
          <div style={{ padding: '2rem',display:"flex",alignItems:'start' }}>
            
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              style={{
                width:"100%"
              }}
            >
               <Heading style={{
         
        width:"100%",
        display:"flex",
        justifyContent:"center",
        flexDirection:'column',
        alignItems:"start"
        }}>
        
          <h2 className='header' style={{
          fontWeight:"'Poppins', sans-serif",
          color:"white",
          fontWeight:"600",
          fontSize:"30px"
          }}>Get in touch</h2>
          <p style={{
            color:"#C5C5C5",
            fontWeight:"400",
            fontSize:"15px",
            fontWeight:"'Poppins', sans-serif"
          }}>Our friendly team would love to hear from you.</p>
        </Heading>
              
              <Form.Item
            
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
               
              >
                
               <div style={{
                display:"flex",
                justifyContent:"space-between",
              
               }}>
             <div style={{
              width:"48%"
             }}><label style={{
                  color:"white",
                  marginBottom:"10px"
                }}>First name</label>
               <Input style={{
               backgroundColor:"#201451",
               border:"none",
               color:"#8A8A8A"
              }} placeholder='First name'/></div>
              <div style={{
              width:"48%"
             }}>
                <label style={{
                  color:"white",
                  marginBottom:"10px"
                }}>Last name</label>
              <Input  style={{
               backgroundColor:"#201451",
               border:"none",
               color:"#8A8A8A"
              }} placeholder='Last name'/>
              </div>
               </div>
              </Form.Item>
                <label style={{
                  color:"white",
                  marginBottom:"10px"
                }}>Email</label>
              <Form.Item
              
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input  style={{
               backgroundColor:"#201451",
               border:"none",
               color:"#8A8A8A"
              }} placeholder='you@company.com'/>
              </Form.Item>
              <label style={{
                  color:"white",
                  marginBottom:"10px"
                }}>Phone number</label>
              <Form.Item
               
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input  style={{
               backgroundColor:"#201451",
               border:"none",
               color:"#8A8A8A"
              }} placeholder='11111'/>
              </Form.Item>
              <label style={{
                  color:"white",
                  marginBottom:"10px"
                }}>Message</label>
              <Form.Item
               
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your message!',
                  },
                ]}
              >
                <Input.TextArea   style={{
               backgroundColor:"#201451",
               border:"none",
               color:"#8A8A8A",
              padding:"50px 0"
              }}/>
              </Form.Item>

              <Form.Item>
              <Form.Item>
              <FormControlLabel style={{
                color:"#8A8A8A"
              }} control={<Checkbox defaultChecked style={{
                color:"#201451"
              }} />} label="You agree to our friendly privacy policy." />
              </Form.Item>
                <Button style={{
                   marginLeft:"20px",
                   background:"linear-gradient(#0019FB, #E409E8)",
                   borderRadius:"8px",
                   padding:"20px 40px",
                   width:"100%",
                   fontSize:"22px",
                   textTransform:"capitalize",
                   fontWeight:"500",
                   fontFamily:" 'Poppins', sans-serif",
                   border:"2px solid #E409E8",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   margin:"0 auto"
                }} type="primary" htmlType="submit">
                  Send message
                </Button>
              </Form.Item>
            </Form>
           
          </div>
        </Col>
        {/* <Col span={12}>
          <div style={{ padding: '2rem', marginTop: '10rem' }}>
            <YouTube videoId="tEncDAF5KEA" opts={videoOptions} />
          </div>
        </Col> */}
      </Row>
          <div style={{
            position:"relative",
           
           
          }}>
              <img style={{
                width:"100%"
              }} src={mask}/>
              <div style={{
                 display: "flex",
                 alignItems: "center",
                 gap: "10px",
                 backgroundColor: "white",
                 /* height: fit-content; */
                 borderRadius: "15px",
                 width:"206px",
                  height:"79px",
                  position:"absolute",
                  top:"150px",
                  left:"-25px"
              }}>
          <img src={EllipseDOC} alt="EllipseDOC"/>
            <Typography sx={{fontWeight:"bold"}}><span style={{
              color:"#2117F9"
            }}>10k+</span> Happy Patients</Typography>
              </div>
              <div style={{
                 display: "flex",
                 alignItems: "center",
                 gap: "10px",
                 backgroundColor: "white",
                 /* height: fit-content; */
                 borderRadius: "15px",
                 width:"206px",
                  height:"79px",
                  position:"absolute",
                  top:"-15px",
                  right:"0px"
              }}>
          <img src={EllipseDOC2} alt="EllipseDOC2"/>
            <Typography sx={{fontWeight:"bold"}}><span style={{
              color:"#2117F9"
            }}> 1400+ </span>Medical Staff</Typography>
              </div>
              <div style={{
               padding:"20px",
               paddingBottom:"0",
                 gap: "10px",
                 backgroundColor: "#FFFFFFBF",
                 /* height: fit-content; */
                 borderRadius: "15px",
                 width:"320px",
                  height:"173px",
                  position:"absolute",
                  bottom:"-50px",
                  right:"-50px"
              }}>
          
           <div style={{
           display:"flex",
            gap:"10px",
            marginBottom:"10px"

           }}>
            <img src={EllipseDOC3} alt="EllipseDOC2"/>
           <Typography sx={{fontWeight:"700",fontSize:'20px'}}>Our Clients <span style={{
              color:"#2117F9"
            }}> Reviews </span>
              <Typography style={{fontSize:"14px",fontWeight:"400"}}>Rating:  ⭐⭐⭐⭐⭐ <span style={{fontWeight:"300",fontSize:"14px"}}>(5/5 stars)</span></Typography>
            </Typography>
          
           </div>
           <Typography style={{fontWeight:"400",fontSize:"12px",fontWeight:"'Poppins', sans-serif"}}>As a client of this healthcare website. I'm thoroughly impressed with the personalized care I've received.</Typography>
              </div>
            </div>
      </div>
    </section>
   <section style={{
       display:"flex",
        flexDirection:"column",
         justifyContent:"start",
        alignItems:"center",
        minHeight:"100vh",
        backgroundImage: `url(${hero})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
       
        backgroundPosition: "center center",}}
        >
          <div style={{
            color:"white",
          }}>
          <header style={{
             marginTop:"140px",
             textAlign:"center",
             display:"flex",
             flexDirection:"column",
             gap:"10px"
          }}>
            <h1>Frequently asked questions</h1>
            <p>Everything you need to know about the product and billing.</p>
          </header>
          <div style={{
            display:"flex",
            justifyContent:"center",

            alignItems:"center",
            flexDirection:"column",
            margin:"auto",
            marginTop:"30px",
            width:"70%"
          }}>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              borderBottom:"1px solid #EAECF0",
            marginBottom:"20px",
            width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>Is there a free trial available?</p>
                <p style={{
                  fontWeight:"400",
                  fontSize:"12px",
                  color:"#B7B7B7",
                  fontFamily:"Poppins, sans-serif"
                }}>Yes, you can try us for free for 30 days.
                   If you want, we’ll provide you with a free,
                    personalized 30-minute onboarding call to get you up and running as soon as possible.</p>
              </div>
              <img src={icon}/>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              borderBottom:"1px solid #EAECF0",
              marginBottom:"20px",
              width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>Can I change my plan later?</p>
               
              </div>
              <img src={icon}/>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              borderBottom:"1px solid #EAECF0",
              marginBottom:"20px",
              width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>What is your cancellation policy?</p>
               
              </div>
              <img src={icon}/>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              borderBottom:"1px solid #EAECF0",
              marginBottom:"20px",
              width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>Can other info be added to an invoice?</p>
               
              </div>
              <img src={icon}/>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              borderBottom:"1px solid #EAECF0",
              marginBottom:"20px",
              width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>How does billing work?</p>
               
              </div>
              <img src={icon}/>
            </div>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"start",
              
              marginBottom:"20px",
              width:"100%"
            }}>
              <div>
                <p style={{
                  fontWeight:"500",
                  fontSize:"20px",
                  fontFamily:"Poppins, sans-serif"
                }}>How do I change my account email?</p>
               
              </div>
              <img src={icon}/>
            </div>
          </div>
          </div>
    </section>
    <section style={{
      // height:"300px",
      padding:"50px 0",
      width:'100%',
      display:"flex",
    justifyContent:"space-around",
      alignContent:"start",
      marginTop:"50px",
      position:"relative",
     
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <img style={{
              height: "4rem",
              width: "10rem",
              // marginRight: "50px",
              // marginLeft: "1rem",
              cursor: "pointer",
              padding: "5px",
              marginTop:"-28px"
            }} src={Logo} alt="Regen Global Logo" />
           
      </Link>
      
      <div style={{
        display:"flex",
        gap:"20px"
      }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#fff',fontSize:"16px",fontWeight:"400" ,fontFamily:"Poppins, sans-serif"}}>
           Home
           
      </Link>
      <Link to="/Services" style={{ textDecoration: 'none', color: '#fff' ,fontSize:"16px",fontWeight:"400" ,fontFamily:"Poppins, sans-serif"}}>
           About
           
      </Link>
      <Link to="/Contact" style={{ textDecoration: 'none', color: '#fff',fontSize:"16px",fontWeight:"400" ,fontFamily:"Poppins, sans-serif" }}>
           Contact
           
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: '#fff',fontSize:"16px",fontWeight:"400" ,fontFamily:"Poppins, sans-serif" }}>
           FAQ
           
      </Link>
      </div>
      <div style={{
        width:"30px",
        height:"30px",
        background:"#000",
        borderRadius:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <img src={Tweener}/>
      </div>
      <span style={{
          width: "80%",
          height: ".5px",
          display: "block",
          background:"linear-gradient(#FFFFFF 0%,#FFFFFF 100%,#FFFFFF 0%)",
          margin: "auto",
          position: "absolute",
          bottom: "30px",
          left: "114px",
         
     }}></span>
    
    </section>
    <p style={{
      fontSize:"20px",
      fontWeight:"400",
      textAlign:"center",
      fontFamily:"Poppins, sans-serif" ,
      color:"#CBD5E1",
      
     }}>© Copyright 2023, All Rights Reserved by Regenerative</p>
    </div>
   
  );
};

export default Contact;
