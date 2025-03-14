// Purpose of 'use client' :
// Since NextJS is a full-stack framework. All React components and pages are servercomponents, 
// meaning they're rendered on the server-side and the resulting HTML/CSS/JS files codes are sent to the browser.
// However, there are certain elements in this component are that only available on the client side.
// Like the useState, useEffect hooks,event handlers. The useEffect will run after the page loads in the browser.
// So we need to explicitly mention 'use client', to tell NextJS to build a client component
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
        { image: burgerImg, alt: 'A delicious, juicy burger' },
        { image: curryImg, alt: 'A delicious, spicy curry' },
        { image: dumplingsImg, alt: 'Steamed dumplings' },
        { image: macncheeseImg, alt: 'Mac and cheese' },
        { image: pizzaImg, alt: 'A delicious pizza' },
        { image: schnitzelImg, alt: 'A delicious schnitzel' },
        { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        // change the currentImageIndex every 5 seconds
        useEffect(() => {
                const interval = setInterval(() => {
                        setCurrentImageIndex((prevIndex) =>
                                prevIndex < images.length - 1 ? prevIndex + 1 : 0
                        );
                }, 5000);

                return () => clearInterval(interval); // cleanup
        }, []);

        return (
                <div className={classes.slideshow}>
                        {images.map((image, index) => (
                                <Image
                                        key={index}
                                        src={image.image}
                                        className={index === currentImageIndex ? classes.active : ''}
                                        alt={image.alt}
                                />
                        ))}
                </div>
        );
}