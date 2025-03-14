import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

// NavLink highlights the active link. This functionality of highlighting the link takes place on client side, we will 
// keep that logic seperated seperated in a different JS file where 'use client' is used.
import NavLink from './nav-link';

export default function MainHeader() {
        return (
                <>
                        <MainHeaderBackground />
                        <header className={classes.header}>
                                <Link className={classes.logo} href="/">

                                        {/* Next.js Image excels in size optimization by automatically serving correctly sized images for each device. 
                                        It utilizes modern image formats like WebP and AVIF to reduce file sizes while maintaining quality. 
                                        The component determines the width and height of the image based on the imported file, 
                                        preventing layout shifts during image loading. 
                                        Next.js Image leverages native browser lazy loading, ensuring that images are loaded only when they enter the viewport. 
                                        This improves page load times, particularly for websites with numerous images
                                        priority property makes sure that the image is loaded as soon as the page is loaded*/}
                                        <Image src={logoImg} alt="A plate with food on it" priority />
                                        NextLevel Food
                                </Link>

                                <nav className={classes.nav}>
                                        <ul>
                                                <li>
                                                        <NavLink href="/meals">Browse Meals</NavLink>
                                                </li>
                                                <li>
                                                        <NavLink href="/community">Foodies Community</NavLink>
                                                </li>
                                        </ul>
                                </nav>
                        </header>
                </>
        );
}