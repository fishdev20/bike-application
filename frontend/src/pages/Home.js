import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import "../styles/home.scss";
import { Grid } from '@mui/material';
import bikeAnimation from "../animation/bikeAnimation.json"
import Lottie from 'react-lottie'



const Home = ({active, mode}) => {
    let app = useRef(null)
    let images = useRef(null)
    let content = useRef(null)
    let tl = gsap.timeline()


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: bikeAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    
  useEffect(() => {
   
    // Images Vars
    const secondImage = images.current.firstElementChild;
    const firstImage = images.current.lastElementChild;
    const contentP = content.current.children[1];
    

    //Image animation
        gsap.to(app.current, {duration: 0.5, autoAlpha: 1, delay: 0});
      gsap.to(firstImage,{duration: 2, y: -120, opacity: 1, zIndex: 1})
      gsap.to(firstImage.firstElementChild, {duration: 2,scale: 1.5,autoAlpha: 1, ease: "power3.easeOut"})
      gsap.to(secondImage,{duration: 2, y: 50, opacity: 1})
      gsap.to(secondImage.firstElementChild,{duration: 2,scale: 1.5, ease: "power3.easeOut"})

    tl.to('.hero-content-line', {
        'clipPath': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', 
        opacity: 1,
        y: 0, 
        duration: 1,
        ease: "power3.easeOut"
    })
    tl.to( contentP, {
        'clipPath': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', 
        opacity: 1,
        y: 0, 
        duration: 1,
        ease: "power3.easeOut"
    });

  }, [tl])
    return ( 
        <div className='hero'  ref={app} >
            <div className={`container ${active ? 'blur' : ''} ${mode ? 'light' : ''}`}>
                <section>
                    <Grid container className="hero-inner">
                        <Grid item xs={12} md={6} className="hero-content">
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
                                    In this service, you can view Bike's stations and bike's journeys in Helsinki, you also can add a new journey yourself in Journeys tab.
                                </p>
                                <div className='bike-animation'>
                                    <Lottie options={defaultOptions}
                                        height={350}
                                        width={350}
                                    />
                                </div>

                                  
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="hero-images">
                            <div ref={images}  className="hero-images-inner">
                                <div className="hero-image second">
                                <img src={'https://livinginheldotcom.files.wordpress.com/2016/08/helsinki_city_bikes_hietalahti.jpg?w=584'} alt="bike" />
                                </div>
                                <div className="hero-image first">
                                    <img src={'https://kathrindeter.com/wp-content/uploads/2021/03/IMG_0630-2.jpg'} alt="bike" />
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