var sync = require('sync');

const Point = require('../../utils/point');
const Rectangle = require('../../utils/rectangle');
const Object = require('../../utils/object');
const Algorithm = require('../../utils/algorithm');

const INF = 10000*10000;

function isOccupied(space, occupiedSpaces, table) {
	if (space.lowerLeft.y > table.height || space.lowerLeft.x < 1) {
		return true;
    }
    occupiedSpaces.forEach(rectangle => {
        if (Rectangle.haveCross(space, rectangle)) {
            return true;
        }
    });
	return false;
}

function isInsideTable(space, table) {
	return space.upperRight.y >= 1;
}

function moveSpace(space, occupiedSpaces, table) {
	let isMoveAny = false;
	let isMove;
	do {
		isMove = false;
    	while (!isOccupied(Rectangle.moveDown(Object.copy(space)), occupiedSpaces, table)) {
    		space = Rectangle.moveDown(Object.copy(space));
    		isMove = true;
		}
		while (!isOccupied(Rectangle.moveLeft(Object.copy(space)), occupiedSpaces, table)) {
    		space = Rectangle.moveLeft(Object.copy(space));
    		isMove = true;
    		while (!isOccupied(Rectangle.moveDown(Object.copy(space)), occupiedSpaces, table)) {
	    		space = Rectangle.moveDown(Object.copy(space));
	    		isMove = true;
			}
		}
		if (!isInsideTable(space, table)) {
			isMove = false;
		}
		if (isMove) {
			isMoveAny = true;
		}
	} while (isMove);
	if (isMoveAny) {
		occupiedSpaces.push(space);
	}
	return isMoveAny;
}

function getSumAreas(occupiedSpaces) {
    let sumAreas = 0;
    occupiedSpaces.forEach(rectangle => {
        sumAreas += Rectangle.area(rectangle);
    });
	return sumAreas;
}

function isSpaceBigger(space, table) {
	let exceededX = (space.upperRight.x - space.lowerLeft.x + 1 > table.width);
	let exceededY = (space.lowerLeft.y - space.upperRight.y + 1 > table.height);
	return exceededX || exceededY;
}

function getCost(ans) {
	console.log('ans:');
	console.log(ans);
	console.log('******************');
	let cost = 0;
	let occupiedSpaces = [];
    let materialsCount = ans.materials.length;
    for (let i = 0; i < materialsCount; i++) {
    	let lowerLeft = Point.new(ans.table.width - ans.materials[i].width + 1, 0);
    	let upperRight = Point.new(ans.table.width, - ans.materials[i].height + 1);
    	let space = Rectangle.new(lowerLeft, upperRight);
    	if (isSpaceBigger(space, ans.table)) {
    		return INF;
		}
    	if (!moveSpace(Object.copy(space), occupiedSpaces, ans.table)) {
    		cost += Rectangle.area2(ans.table) - getSumAreas(occupiedSpaces);
    		occupiedSpaces.clear();
    		moveSpace(Object.copy(space), occupiedSpaces, ans.table);
		}
	}
	if (occupiedSpaces.length) {
		cost += Rectangle.area2(ans.table) - getSumAreas(occupiedSpaces);
	}
	return cost;
}

function getTables(ans) {
	let tables = [];
	let occupiedSpaces = [];
	let materialsCount = ans.materials.length;
    for (let i = 0; i < materialsCount; i ++) {
    	let lowerLeft = Point.new(ans.table.width - ans.materials[i].width + 1, 0);
    	let upperRight = Point.new(ans.table.width, - ans.materials[i].height + 1);
    	let space = Rectangle.new(lowerLeft, upperRight);
    	if (!moveSpace(Object.copy(space), occupiedSpaces, ans.table)) {
    		tables.push(occupiedSpaces);
    		occupiedSpaces.clear();
    		moveSpace(Object.copy(space), occupiedSpaces, ans.table);
		}
	}
	if (occupiedSpaces.length) {
		tables.push(occupiedSpaces);
	}
	return tables;
}

function getBestAns(ans1, ans2) {
    return getCost(ans1) < getCost(ans2)? ans1: ans2;
}

function applyRotate(input, mask) {
    let materialsCount = input.materials.length;
    for (let i = 0; i < materialsCount; i ++) {
        if ((mask >> i)&1) {
            Rectangle.rotate(input.materials[i]);
        }
    }
    return input;
}

function applyPermutate(input, permutate) {
    let materialsPermutate = [];
    let materialsCount = input.materials.length;
    for (let i = 0; i < materialsCount; i ++) {
        materialsPermutate.push(input.materials[permutate[i]]);
    }
    input.materials = materialsPermutate;
    return input;
}

function permutate(input) {
	let ans = Object.copy(input);
	let list = Object.list(input.materials.length);
	let permutations = Algorithm.permutations(list);
	console.log(input);
	console.log(permutations);
	console.log('-------------------------');
	// console.log(ans);
    permutations.forEach(permutate => {
		let inputPermutate = applyPermutate(Object.copy(input), permutate);
		console.log('init comparate:');
		console.log(ans);
		console.log(permutate);
		console.log(inputPermutate);
		console.log('end comparate:');
		ans = getBestAns(ans, inputPermutate);
		console.log('ans in permutate:');
		console.log(ans);
		resolve(ans); // delete
    });
    // return ans;
}

function rotateAndPermutate(input) {
    let materialsCount = input.materials.length;
    let ans = input;
    for (let mask = 0; mask < 1 << materialsCount; mask ++) {
		console.log("in mask: " + mask);
		console.log("***********************");
		console.log("***********************");
		let inputRotate = applyRotate(Object.copy(input), mask);
		console.log('> inputRotate:');
		console.log(inputRotate);
		let ansPossible = new Promise(permutate(inputRotate)).then(function(data) {
			console.log("> ansPossible:");
			console.log(ansPossible);
		});
		// console.log("> ansPossible:");
		// console.log(ansPossible);
		console.log("***********************");
		console.log("***********************");
		console.log("***********************");
		ans = getBestAns(ans, ansPossible);
		return ans; // delete
    }
    // return ans;
}

function solve(input) {
    return rotateAndPermutate(input);
}

function resolveCut(input) {
    let output = solve(input);
    // console.log("cost: " + getCost(output));
    // let tables = getTables(output);
    // for (let i = 0; i < tables.length; i ++) {
    //     let table = tables[i];
    //     console.log("TABLE %d:", i + 1);
    //     table.forEach(material => {
    //         console.log("[x1 - x2] [y1 - y2] = [%d - %d] [%d - %d]", material.lowerLeft.x, material.upperRight.x, material.upperRight.y, material.lowerLeft.y);
    //     });
    // }
}

module.exports = resolveCut;