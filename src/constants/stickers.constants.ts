import star from '../assets/star.svg';
import bolt from '../assets/bolt.svg';
import heart from '../assets/heart.svg';
import like from '../assets/like.svg';


export const options = {
    star: {
        type: 'star',
        src: star
    },
    bolt: {
        type: 'bolt',
        src: bolt
    },
    heart: {
        type: 'heart',
        src: heart
    },
    like: {
        type: 'like',
        src: like
    }
};

export const nameRegex = /^\d+\s*-\s*([A-Za-z]+)\s*\(\d+\s*times\)$/;