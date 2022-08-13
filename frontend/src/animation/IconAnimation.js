import React from 'react'
import Lottie from 'react-lottie';
import bikeLoading from "./bikeLoading.json"
import arrowUp from './arrowUp.json'
import bikeAnimation from './bikeAnimation.json'

export function BikeLoading() {
    const loadingOptions = {
        loop: true,
        autoplay: true, 
        animationData: bikeLoading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={loadingOptions}
                    height={350}
                    width={350}
                />
    )
}

export function BikeAnimation() {
    const bikeOptions = {
        loop: true,
        autoplay: true, 
        animationData: bikeAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={bikeOptions}
                    height={350}
                    width={350}
                />
    )
}

export function Arrow() {
    const arrowOptions = {
        loop: true,
        autoplay: true, 
        animationData: arrowUp,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={arrowOptions}
            height={70}
            width={70}
        />
    )
}
