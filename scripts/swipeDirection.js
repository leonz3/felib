
export default (startX, startY, endX, endY) => {
    return Math.abs(endX - startX) >= Math.abs(endY - startY)
        ? (endX - startX > 0 ? 'right': 'left')
        : (endY - endY > 0 ? 'down': 'up');
};
