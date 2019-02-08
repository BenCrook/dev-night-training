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
 * Returns true if the banner can proceed to the next
 * @param {number} activeBanner
 * @returns {boolean}
 */
const canBannerIncrement = (activeBanner: number) => {
    return activeBanner < bannerData.length - 1;
};

/**
 * Returns true if the banner can revert to the previous one
 * @param {number} activeBanner
 * @returns {boolean}
 */
const canBannerDecrement = (activeBanner: number) => {
    return activeBanner > 0;
};

/**
 * This function will get the banner image but also make a call to preload the next banner image
 * @param {number} activeBanner - The active banner
 */
const getBannerImage = (activeBanner: number) => {
    const nextBannerIndex = activeBanner + 1;

    if (bannerData[nextBannerIndex]) {
        preloadImage(bannerData[nextBannerIndex].image);
    }

    return bannerData[activeBanner].image;
};

const Banner = () => {
    const [activeBanner, setActiveBanner] = useState(0);
    const valuesToTriggerRender: any[] = [activeBanner];
    const nextBanner = activeBanner + 1;
    const prevBanner = activeBanner - 1;

    // Re-render only happens if the values inside valuesToTriggerRender change
    useEffect(() => {
        animateBanner();
    }, valuesToTriggerRender);

    // todo: Possibly use React.Context or Redux rather than passing activeBanner through to multiple functions
    // todo: Improve animations, may need to render all slides out for this
    // todo: Simply markup (too many unnecessary elements)
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.image} animation`}
                 style={{backgroundImage: `url(${getBannerImage(activeBanner)})`}}/>
            <div className={styles.content}>
                <div className={styles.text}>
                    {bannerData[activeBanner].text}
                </div>
                <div className={styles.links}>
                    <h2>Links Go Here</h2>
                </div>
                <div className={styles.arrows}>
                    <h2 className={`${styles.arrow} ${styles.next}`}
                        onClick={() =>
                            canBannerIncrement(activeBanner) ? setActiveBanner(nextBanner) : null}>
                        NEXT
                    </h2>
                    <h2 className={`${styles.arrow} ${styles.next}`}
                        onClick={() =>
                            canBannerDecrement(activeBanner) ? setActiveBanner(prevBanner) : null}>
                        PREV
                    </h2>
                </div>
            </div>
        </div>
    )
};


export default Banner;