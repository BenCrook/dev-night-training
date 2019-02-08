import initialBannerImage from './alireza-khajehali-1.jpg';
import secondBannerImage from './sunset-mountain.jpg';
import thirdBannerImage from './snow-mountain-2.jpg';
import fourthBannerImage from './snow-mountain-e.jpg';

interface Banners {
    image: string,
    text: string
}

// Could also use Array<Banners> here but I find Banners[] to be more concise.
// See https://toddmotto.com/typing-arrays-typescript for more methods
const bannerData: Banners[] = [
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

export default bannerData;
