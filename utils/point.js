exports.new = (x, y) => ({
    x: x,
    y: y
});

exports.moveDown = point => {
    point.y ++;
    return point;
};

exports.moveLeft = point => {
    point.x --;
    return point;
};