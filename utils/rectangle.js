const point = require('./point');
const object = require('./object');

exports.new = (lowerLeft, upperRight) => ({
    lowerLeft: object.copy(lowerLeft),
    upperRight: object.copy(upperRight)
});

exports.moveDown = rectangle => {
    point.moveDown(rectangle.lowerLeft);
    point.moveDown(rectangle.upperRight);
    return rectangle;
};

exports.moveLeft = rectangle => {
    point.moveLeft(rectangle.lowerLeft);
    point.moveLeft(rectangle.upperRight);
    return rectangle;
};

exports.rotate = rectangle => {
    [rectangle.height, rectangle.width] = [rectangle.width, rectangle.height];
};

exports.area = rectangle => {
	let width = rectangle.upperRight.x - rectangle.lowerLeft.x + 1;
	let height = rectangle.upperRight.y - rectangle.lowerLeft.y + 1;
	return width * height;
};

exports.area2 = rectangle => {
	return rectangle.width * rectangle.height;
};

exports.haveCross = (r1, r2) => {
	let haveCrossX = (r1.lowerLeft.x <= r2.upperRight.x && r2.lowerLeft.x <= r1.upperRight.x);
    let haveCrossY = (r1.lowerLeft.y <= r2.upperRight.y && r2.lowerLeft.y <= r1.upperRight.y);
	return haveCrossX && haveCrossY;
};