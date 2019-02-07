import React, {useState, useEffect} from 'react';
import anime from 'animejs';
import styles from './hero.module.css';
import initialBannerImage from './images/alireza-khajehali-1.jpg';
import secondBannerImage from './images/sunset-mountain.jpg';
import thirdBannerImage from './images/snow-mountain-2.jpg';
import fourthBannerImage from './images/snow-mountain-e.jpg';

interface HeroInterface {
    image: string,
    text: string
}

// We could also use Array<HeroInterface> here but I find HeroInterface[] to be more concise.
// See https://toddmotto.com/typing-arrays-typescript for more methods
const heroData: HeroInterface[] = [
    {
        image: initialBannerImage,
        text: 'Text Goes Here - First Slide'
    },
    {
        image: secondBannerImage,
        text: 'Text Goes Here - Second Slide'
    },
    {
        image: thirdBannerImage,
        text: 'Text Goes Here - Third Slide'
    },
    {
        image: fourthBannerImage,
        text: 'Text Goes Here - Fourth Slide'
    }
];

/**
 * Preloads specified banner image so there isn't a flash or noticeable load during slides
 * todo: Only preload the second banner image after the first has loaded.
 * todo: Idea for this - Function that loads the image then sets it
 * todo: Split preload functions into their own file
 * todo: Throw error?
 */
const preloadBannerImage = (bannerIndexToPreload: number) => {
    // Check image exists else it will error
    if (heroData[bannerIndexToPreload]) {
        console.log(`Preloading ${heroData[bannerIndexToPreload].image}`);
        const img = new Image();
        img.src = heroData[bannerIndexToPreload].image;
    }
};

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
    const heroLength: number = heroData.length;
    const canDecrement: boolean = activeBanner > 0;
    const canIncrement: boolean = activeBanner < heroLength - 1; // -1 as arrays are 0 index based

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

const setBannerImage = (imageSrc: string, activeBanner: number) => {
    console.log(`Loading ${imageSrc}`);
    const img = new Image();
    img.src = imageSrc;

    img.onload = function () {
        console.log(`${imageSrc} HAS LOADED!`);
        preloadBannerImage(activeBanner + 1);
    };

    return imageSrc;
};

const Hero = () => {
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
                 style={{backgroundImage: `url(${setBannerImage(heroData[activeBanner].image, activeBanner)})`}}/>
            <div className={styles.content}>
                <div className={styles.text}>
                    {heroData[activeBanner].text}
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


export default Hero;