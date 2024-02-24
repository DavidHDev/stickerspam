import { Sticker } from "./Interfaces/Sticker";

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

export const getStickerCount = (stickers: Sticker[]) => {
  // Count occurrences of each sticker type
  const typeCounts: { [key: string]: number } = stickers.reduce((counts, item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
    return counts;
  }, {});

  return typeCounts;
}

export const getLeaderboard = (stickers: Sticker[]) => {
  // Step 1: Count occurrences of each user in the "placedby" property
  const userCounts: { [key: string]: number } = {};
  stickers.forEach(item => {
    userCounts[item.placedBy] = (userCounts[item.placedBy] || 0) + 1;
  });

  // Step 2: Generate a leaderboard of the top 3 users
  const leaderboard: string[] = Object.entries(userCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
    .slice(0, 3) // Take top 3
    .map(([user, count], index) => `${index + 1} - ${user} (${count} stickers)`);

  return leaderboard;
}

export const getUserName = () => localStorage.getItem('stickerspam-name');
export const setUserName = (value: string) => localStorage.setItem('stickerspam-name', value.toLowerCase());