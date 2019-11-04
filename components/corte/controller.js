const point = require('../../utils/point');
const rectangle = require('../../utils/rectangle');
const object = require('../../utils/object');

// function isOccupied(space, occupiedSpaces, table) {
// 	if (space.lowerLeft.y > table.height || space.lowerLeft.x < 1) {
// 		return true;
//     }
//     occupiedSpaces.forEach(rectangle => {
//         if (haveCross(space, rectangle)) {
//             return true;
//         }
//     });
// 	return false;
// }

// function insideTable(space, table) {
// 	return space.upperRight.y >= 1;
// }

// function moveSpace(space, &occupiedSpaces, table) {
// 	isMoveAny = false;
// 	isMove;
// 	do {
// 		isMove = false;
//     	while (!isOccupied(moveDown(space), occupiedSpaces, table)) {
//     		space = moveDown(space);
//     		isMove = true;
// 		}
// 		while (!isOccupied(moveLeft(space), occupiedSpaces, table)) {
//     		space = moveLeft(space);
//     		isMove = true;
//     		while (!isOccupied(moveDown(space), occupiedSpaces, table)) {
// 	    		space = moveDown(space);
// 	    		isMove = true;
// 			}
// 		}
// 		if (!insideTable(space, table)) {
// 			isMove = false;
// 		}
// 		if (isMove) {
// 			isMoveAny = true;
// 		}
// 	} while (isMove);
// 	if (isMoveAny) {
// 		occupiedSpaces.push(space);
// 	}
// 	return isMoveAny;
// }

// function getSpace(rectangle) {
// 	w = rectangle.upperRight.x - rectangle.lowerLeft.x + 1;
// 	h = rectangle.lowerLeft.y - rectangle.upperRight.y + 1;
// 	return w*h;
// }

// function getSumSpaces(vector<Rectangle> occupiedSpaces) {
//     sumSpaces = 0;
//     occupiedSpaces.forEach(rectangle => {
//         sumSpaces += getSpace(rectangle);
//     });
// 	return sumSpaces;
// }

// function impossibleAns(space, table) {
// 	exceededX = (space.upperRight.x - space.lowerLeft.x + 1 > table.width);
// 	exceededY = (space.lowerLeft.y - space.upperRight.y + 1 > table.height);
// 	return exceededX || exceededY;
// }

// function getCost(ans) {
// 	cost = 0;
// 	occupiedSpaces;
//     materialsCount = ans.materials.length;
//     for (let i = 0; i < materialsCount; i++) {
//     	lowerLeft = Point(ans.table.width - ans.materials[i].width + 1, 0);
//     	upperRight = Point(ans.table.width, - ans.materials[i].height + 1);
//     	space = Rectangle(lowerLeft, upperRight);
//     	if (impossibleAns(space, ans.table)) {
//     		return INF;
// 		}
//     	if (!moveSpace(space, occupiedSpaces, ans.table)) {
//     		cost += ans.table.height*ans.table.width - getSumSpaces(occupiedSpaces);
//     		occupiedSpaces.clear();
//     		moveSpace(space, occupiedSpaces, ans.table);
// 		}
// 	}
// 	if (occupiedSpaces.length) {
// 		cost += ans.table.height*ans.table.width - getSumSpaces(occupiedSpaces);
// 	}
// 	return cost;
// }

// function getTables(ans) {
// 	tables = Array();
// 	occupiedSpaces;
// 	materialsCount = ans.materials.length;
//     for (let i = 0; i < materialsCount; i ++) {
//     	lowerLeft = Point(ans.table.width - ans.materials[i].width + 1, 0);
//     	upperRight = Point(ans.table.width, - ans.materials[i].height + 1);
//     	space = Rectangle(lowerLeft, upperRight);
//     	if (!moveSpace(space, occupiedSpaces, ans.table)) {
//     		tables.push(occupiedSpaces);
//     		occupiedSpaces.clear();
//     		moveSpace(space, occupiedSpaces, ans.table);
// 		}
// 	}
// 	if (occupiedSpaces.length) {
// 		tables.push(occupiedSpaces);
// 	}
// 	return tables;
// }

// function getBestAns(ans1, ans2) {
//     return getCost(ans1) < getCost(ans2)? ans1: ans2;
// }

function applyRotate(input, mask) {
    let materialsCount = input.materials.length;
    for (let i = 0; i < materialsCount; i ++) {
        if ((mask >> i)&1) {
            rectangle.rotate(input.materials[i]);
        }
    }
    return input;
}

// function applyPermutate(input, id) {
//     materialsPermutate = [];
//     materialsCount = input.materials.length;
//     for (let i = 0; i < materialsCount; i ++) {
//         materialsPermutate.push(input.materials[id[i]]);
//     }
//     input.materials = materialsPermutate;
//     return input;
// }

function permutate(input) {
    return input;
    // list = object.list(input.materials.length);
    // ans = input;
    // do {
    //     inputPermutate = applyPermutate(input, list);
    //     ans = getBestAns(ans, inputPermutate);
    // } while(next_permutation(list.begin(), list.end()));
    // return ans;
}

function rotateAndPermutate(input) {
    let materialsCount = input.materials.length;
    let ans = input;
    for (let mask = 0; mask < 1 << materialsCount; mask ++) {
        inputRotate = applyRotate(object.copy(input), mask);
        // ansPossible = permutate(inputRotate);
        // ans = getBestAns(ans, ansPossible);
    }
    return ans;
}

function solve(input) {
    return rotateAndPermutate(input);
}

function resolveCut(input) {
    output = solve(input);
    // console.log(getCost(output));
    // tables = getTables(output);
    // for (let i = 0; i < tables.length; i ++) {
    //     table = tables[i];
    //     console.log("TABLE %d:", i + 1);
    //     table.forEach(material => {
    //         console.log("[x1 - x2] [y1 - y2] [%d - %d] [%d - %d]", material.lowerLeft.x, material.upperRight.x, material.upperRight.y, material.lowerLeft.y);
    //     });
    // }
}

module.exports = resolveCut;