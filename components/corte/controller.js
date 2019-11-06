const Point = require('../../utils/point');
const Rectangle = require('../../utils/rectangle');
const Object = require('../../utils/object');
const Algorithm = require('../../utils/algorithm');

const INF = 10000*10000;

function isOccupied(space, occupiedSpaces, table) {
	if (space.lowerLeft.y > table.height || space.lowerLeft.x < 1) {
		return true;
	}
	for (let i = 0; i < occupiedSpaces.length; i ++) {
		let rectangle = occupiedSpaces[i];
        if (Rectangle.haveCross(space, rectangle)) {
            return true;
        }
    }
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

function getSolution(ans) {
	let cost = 0;
	let tables = [];
	let occupiedSpaces = [];
    let materialsCount = ans.materials.length;
    for (let i = 0; i < materialsCount; i++) {
    	let lowerLeft = Point.new(ans.table.width - ans.materials[i].width + 1, 0);
    	let upperRight = Point.new(ans.table.width, - ans.materials[i].height + 1);
    	let space = Rectangle.new(lowerLeft, upperRight);
    	if (isSpaceBigger(space, ans.table)) {
    		return {
				cost: INF,
				tables: []
			};
		}
    	if (!moveSpace(Object.copy(space), occupiedSpaces, ans.table)) {
			cost += Rectangle.area2(ans.table) - getSumAreas(occupiedSpaces);
			tables.push(occupiedSpaces);
    		occupiedSpaces = [];
    		moveSpace(Object.copy(space), occupiedSpaces, ans.table);
		}
	}
	if (occupiedSpaces.length) {
		cost += Rectangle.area2(ans.table) - getSumAreas(occupiedSpaces);
		tables.push(occupiedSpaces);
	}
	// console.log(tables);
	return {
		cost: cost,
		tables: tables
	};
}

function getBestAns(ans1, ans2) {
    return getSolution(ans1).cost < getSolution(ans2).cost? ans1: ans2;
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

function permutate(input, Return) {
	let ans = Object.copy(input);
	let list = Object.list(input.materials.length);
	let permutations = Algorithm.permutations(list);
    for (let i = 0; i < permutations.length; i ++) {
		let permutate = permutations[i];
		let inputPermutate = applyPermutate(Object.copy(input), permutate);
		ans = getBestAns(ans, inputPermutate);
	};
	Return(ans);
}

function rotateAndPermutate(input) {
    let materialsCount = input.materials.length;
    let ans = input;
    for (let mask = 0; mask < 1 << materialsCount; mask ++) {
		let inputRotate = applyRotate(Object.copy(input), mask);
		permutate(inputRotate, (res) => {ansPossible = res});
		ans = getBestAns(ans, ansPossible);
    }
    return ans;
}

function solve(input) {
    return rotateAndPermutate(input);
}

function resolveCut(input) {
	let output = solve(input);
	let solution = getSolution(output);
	console.log("sol:" + solution);
	console.log('**********************************');
	console.log('**********************************');
	console.log('**********************************');
	console.log("cost: " + solution.cost);
	console.log(solution.tables);
    for (let i = 0; i < solution.tables.length; i ++) {
        let table = solution.tables[i];
        console.log("TABLE %d:", i + 1);
        table.forEach(material => {
            console.log("[x1 - x2] [y1 - y2] = [%d - %d] [%d - %d]", material.lowerLeft.x, material.upperRight.x, material.upperRight.y, material.lowerLeft.y);
        });
    }
}

module.exports = resolveCut;