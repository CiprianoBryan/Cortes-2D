const point = require('./point');

exports.moveDown = rectangle => {
    point.moveDown(rectangle.lowerLeft);
    point.moveDown(rectangle.upperRight);
};

exports.moveLeft = rectangle => {
    point.moveLeft(rectangle.lowerLeft);
    point.moveLeft(rectangle.upperRight);
};

exports.rotate = rectangle => {
    [rectangle.height, rectangle.width] = [rectangle.width, rectangle.height];
}