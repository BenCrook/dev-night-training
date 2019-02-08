/**
 * Preloads specified image
 * todo: Loads the second image twice? Once as a preload then again as the user enters the second slide
 * todo: Idea for this - Function that loads the image then sets it
 * todo: Split preload functions into their own file
 * todo: Throw error?
 */
export const preloadImage = (image: string) => {
    const img = new Image();
    img.src = image;

    const getImage = new Promise(function(resolve, reject) {
        img.onload = function () {
            resolve(img);
        }
    });

    getImage.then(function(img) {
        return img;
    });
};