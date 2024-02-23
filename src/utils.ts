export const getRandomPosition = () => {
    const container = document.querySelector('.sticker-area-container');

    // Get the dimensions of the container element relative to the viewport size
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate the maximum allowable positions within the inner area of the container
    const maxX = containerWidth - 100;
    const maxY = containerHeight - 100;

    // Generate random x and y coordinates within the inner area of the container
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
};

export const getUserName = () => localStorage.getItem('stickerspam-name');
export const setUserName = (value: string) => localStorage.setItem('stickerspam-name', value.toLowerCase());