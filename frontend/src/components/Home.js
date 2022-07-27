import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import arrow from './images/arrow-right.svg'
import "../styles/home.scss";
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';



const Home = ({active, mode}) => {
    let app = useRef(null)
    let images = useRef(null)
    let content = useRef(null)
    let tl = gsap.timeline()
  useEffect(() => {
   
    // Images Vars
    const girlImage = images.current.firstElementChild;
    const boyImage = images.current.lastElementChild;
    const contentP = content.current.children[1];
    const contentButton = content.current.children[2];
    

    //Image animation
    gsap.to(app.current, {duration: 0.5, autoAlpha: 1, delay: 0});
      gsap.to(boyImage,{duration: 3, y: -120, opacity: 1, zIndex: 1})
      gsap.to(boyImage.firstElementChild, {duration: 3,scale: 1.5,autoAlpha: 1, ease: "power3.easeOut"})
      gsap.to(girlImage,{duration: 3, y: 50, opacity: 1})
      gsap.to(girlImage.firstElementChild,{duration: 3,scale: 1.5, ease: "power3.easeOut"})

    tl.to('.hero-content-line', {
        'clipPath': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', 
        opacity: 1,
        y: 0, 
        duration: 1
    })
    tl.to( contentP, {
        'clipPath': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', 
        opacity: 1,
        y: 0, 
        duration: 1
    });
    tl.to( contentButton, {
        y: -20,
        ease:'power3.easeOut',
        opacity: 1,
        
    });


    

    
  }, [tl])

  const handleClick = () => {
    gsap.to(".circle", {
        duration: 1, 
        x: 500,
        y: 50, 
        opacity: 1, 
        scale: 100, 
        zIndex: 4,
        // background: '#007ac9'
    });

    gsap.to(".hero-image", {
        duration: 0.5, 
        opacity: 0, 
        // background: '#007ac9'
    });
    gsap.to(".nav", {
        duration: 0.5, 
        opacity: 0, 
        display:  "block",
        // background: '#007ac9'
    });
  }
    return ( 
        <div className='hero'  ref={app} >
            <div className={`container ${active ? 'blur' : ''} ${mode ? 'light' : ''}`}>
                <section>
                    <Grid container className="hero-inner">
                        <Grid item xs={12} md={6} className="hero-content">
                            <div className='nav'>
                                <nav>
                                    {/* <Link to="/">Home</Link> |{" "} */}
                                    <Link to="journeys">Journeys</Link>
                                    <Link to="stations">Stations</Link>
                                </nav>
                            </div>
                            
                            <div 
                            className="hero-content-inner" 
                            ref={content}
                            >
                                <h1>
                                    <div className="hero-content-line">
                                        Bike Application 
                                    </div>
                                    <div className="hero-content-line">
                                        Helsinki! 
                                    </div>
                                    
                                    <div className="hero-content-line">
                                        Solita Academic 2022.
                                    </div>
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..
                                </p>
                                {/* <div className="btn-row">
                                    <button 
                                        className={`explore-button ${mode ? 'buttonLight' : 'buttonDark'}`}
                                        onClick={handleClick}
                                    >
                                        Explore
                                       
                                    <div className="arrow-icon">
                                        
                                        <img src={arrow} alt="row"/>
                                        <div className='circle'></div>
                                    </div>
                                    
                                    </button>
                                    
                                </div> */}
                                  
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="hero-images">
                            <div ref={images}  className="hero-images-inner">
                                <div className="hero-image girl">
                                <img src={'https://livinginheldotcom.files.wordpress.com/2016/08/helsinki_city_bikes_hietalahti.jpg?w=584'} alt="boy" />
                                </div>
                                {/* <div className="hero-image boy">
                                    <img src={imgBoy} alt="boy" />
                                </div> */}
                                <div className="hero-image boy">
                                    <img src={'https://kathrindeter.com/wp-content/uploads/2021/03/IMG_0630-2.jpg'} alt="boy" />
                                </div>
                            </div>
                        </Grid>
                    </Grid>  
                </section>
            </div> 
            
        </div>
        
        
        
    )
}

export default Home