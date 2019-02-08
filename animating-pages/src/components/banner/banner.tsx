import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import bannerData from '../../data/banners/home/data';
import { preloadImage } from '../../utilities/preload-image';
import styles from './banner.module.css';

/**
 * Fades in the banner using anime.js
 */
const animateBanner = () => {
    anime({
        duration: 600,
        easing: 'easeInOutQuad',
        targets: '.animation',
        rotate: [-0.5, 0],
        scale: [1.05, 1],
        skewX: [0.5, 0]
    })
};

/**
 * Returns true if the banner can be updated, false if it cannot. Supports an optional callback function.
 * @param {string} direction - 'next' or 'previous' - The slide direction.
 * @param {number} activeBanner - The index of the current banner.
 * @param {function} [callback] - An optional callback function, currently updates the active banner.
 */
const canBannerUpdate = (direction: string, activeBanner: number, callback?: (newBannerIndex: number) => void) => {
    const bannerLength: number = bannerData.length;
    const canDecrement: boolean = activeBanner > 0;
    const canIncrement: boolean = activeBanner < bannerLength - 1; // -1 as arrays are 0 index based

    // todo: Prevent repeated code here
    if (direction === 'next' && canIncrement) {
        if (callback) {
            callback(activeBanner + 1);
        }
        return true;
    } else if (direction === 'previous' && canDecrement) {
        if (callback) {
            callback(activeBanner - 1);
        }
        return true;
    }

    return false;
};

/**
 * This function will set the banner image but also make a call to preload the next banner image
 * @param {number} activeBanner - The active banner
 */
const setBannerImage = (activeBanner: number) => {
    const nextBannerIndex = activeBanner + 1;

    if (bannerData[nextBannerIndex]) {
        preloadImage(bannerData[nextBannerIndex].image);
    }

    return bannerData[activeBanner].image;
};

const Banner = () => {
    const [activeBanner, setActiveBanner] = useState(0);
    const valuesToTriggerRender: any[] = [activeBanner];

    // Re-render only happens if the values inside valuesToTriggerRender change
    useEffect(() => {
        animateBanner();
    }, valuesToTriggerRender);

    // todo: Use React.Context or Redux rather than passing activeBanner through to multiple components
    // todo: Improve animations, may need to render all slides out for this
    // todo: Preload the next image on hover rather than automatically?
    //     Currently we presume the user will change slide, will not always be the case
    //     Will be less impactful but will still load the image slightly earlier than without
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.image} animation`}
                 style={{backgroundImage: `url(${setBannerImage(activeBanner)})`}}/>
            <div className={styles.content}>
                <div className={styles.text}>
                    {bannerData[activeBanner].text}
                </div>
                <div className={styles.links}>
                    <h2>Links Go Here</h2>
                </div>
                <div className={styles.arrows}>
                    <h2 onClick={() => canBannerUpdate('next', activeBanner, setActiveBanner)}
                        className={`${styles.arrow} ${styles.next}`}>NEXT</h2>
                    <h2 onClick={() => canBannerUpdate('previous', activeBanner, setActiveBanner)}
                        className={`${styles.arrow} ${styles.next}`}>PREV</h2>
                </div>
            </div>
        </div>
    )
};


export default Banner;