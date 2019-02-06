import React, { Component } from 'react';
import anime from 'animejs';
import styles from './hero.module.css';
import initialBannerImage from './images/alireza-khajehali-1.jpg';
import secondBannerImage from './images/sunset-mountain.jpg';
import thirdBannerImage from './images/snow-mountain-2.jpg';
import fourthBannerImage from './images/snow-mountain-e.jpg';

interface PropsInterface {

}

interface StateInterface {
    activeBanner: number
}

interface HeroInterface {
    image: string,
    text: string
}

// We could also use HeroInterface[] here but I find Array<HeroInterface> to be more explicit and consistent.
// See https://toddmotto.com/typing-arrays-typescript for more methods
const heroData: Array<HeroInterface> = [
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

class Hero extends Component<PropsInterface, StateInterface> {
    constructor(props: PropsInterface) {
        super(props);

        this.state = {
            activeBanner: 0
        }
    }

    /**
     * Methods to run once the component has mounted
     */
    componentDidMount() {
        Hero.fadeInBanner();
        this.preLoadBannerImages();
    }

    /**
     * Preloads images so three isn't a white flash during slides
     */
    preLoadBannerImages() {
        heroData.forEach((banner) => {
            const img = new Image();
            img.src = banner.image;
        })
    }

    /**
     * Fades in the banner.
     * This is a static method as it remains the same across all instances of this class
     */
    static fadeInBanner() {
        anime({
            duration: 600,
            easing: 'easeInOutQuad',
            targets: '.animation',
            rotate: [-0.5, 0],
            scale: [1.05, 1],
            skewX: [0.5, 0]
        })
    }

    /**
     * Updates the hero
     * @param {string} direction - 'next' or 'previous' - The slide direction.
     */
    updateHero(direction: string) {
        const activeBanner: number = this.state.activeBanner;
        const heroLength: number = heroData.length;
        const canDecrement: boolean = activeBanner > 0;
        const canIncrement: boolean = activeBanner < heroLength - 1; // -1 as length is 0 index based

        if (direction === 'next' && canIncrement) {
            this.setState((state) => {
                return {
                    activeBanner: state.activeBanner + 1
                };
            });
        } else if (direction === 'previous' && canDecrement) {
            this.setState((state) => {
                return {
                    activeBanner: state.activeBanner - 1
                };
            });
        } else {
            return
        }

        Hero.fadeInBanner();
    }

    render() {
        const state: StateInterface = this.state;
        const activeBanner: number = state.activeBanner;

        //@toDo: Tidy up animations, may need to render all slides out
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.image} animation`} style={{backgroundImage: `url(${heroData[activeBanner].image})`}} />
                <div className={styles.content}>
                    <div className={styles.text}>
                        {heroData[activeBanner].text}
                    </div>
                    <div className={styles.links}>
                        <h2>Links Go Here</h2>
                    </div>
                    <div className={styles.arrows}>
                        <h2 onClick={() => this.updateHero('next')} className={`${styles.arrow} ${styles.next}`}>NEXT</h2>
                        <h2 onClick={() => this.updateHero('previous')} className={`${styles.arrow} ${styles.next}`}>PREV</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hero;