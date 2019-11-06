const copyArray = require('../../utils/copyArray');

class Material {
    constructor(materialJson) {
        this.id = materialJson.id;
        this.height = materialJson.height;
        this.width = materialJson.width;
    }
    rotate() {
        [this.height, this.width] = [this.width, this.height];
    }
    copy() {
        return new Material({
            'id': this.id,
            'height': this.height,
            'width': this.width
        });
    }
};

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	moveDown() {
		this.y ++;
	}
	moveLeft() {
		this.x --;
	}
};

class Rectangle {
	constructor(lowerLeft,upperRight) {
		this.lowerLeft = lowerLeft;
		this.upperRight = upperRight;
	}
};

class Input {
    constructor(table, materials) {
        this.table = table;
        this.materials = materials;
    }
    copy() {
        return new Input(this.table.copy(), copyArray(this.materials));
    }
};

// function getList(len) {
//     list = [];
//     for (let i = 0; i < len; i++) {
//         list.push(i)
        
//     }
//     return list;
// }

// function moveDown(rectangle) {
// 	rectangle.lowerLeft.moveDown();
// 	rectangle.upperRight.moveDown();
// 	return rectangle;
// }

// function moveLeft(rectangle) {
// 	rectangle.lowerLeft.moveLeft();
// 	rectangle.upperRight.moveLeft();
// 	return rectangle;
// }

// function haveCross(r1, r2) {
// 	let haveCrossX = (r1.lowerLeft.x <= r2.upperRight.x && r2.lowerLeft.x <= r1.upperRight.x);
// 	let haveCrossY = (r2.upperRight.y <= r1.lowerLeft.y && r1.upperRight.y <= r2.lowerLeft.y);
// 	return haveCrossX && haveCrossY;
// }

// function isOccupied(space, occupiedSpaces, table) {
// 	if (space.lowerLeft.y > table.height || space.lowerLeft.x < 1) {
// 		return true;
//     }
//     occupiedSpaces.forEach(rectangle => {
//         if(haveCross(space, rectangle)){
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
    materialsCount = input.materials.length;
    for (let i = 0; i < materialsCount; i ++) {
        if ((mask >> i)&1) {
            input.materials[i].rotate();
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
    // list = getList(input.materials.length);
    // ans = input;
    // do {
    //     inputPermutate = applyPermutate(input, list);
    //     ans = getBestAns(ans, inputPermutate);
    // } while(next_permutation(list.begin(), list.end()));
    // return ans;
}

function rotateAndPermutate(input) {
    materialsCount = input.materials.length;
    ans = input;
    for (let mask = 0; mask < (1 << materialsCount); mask ++) {
        console.log(input);
        // inputRotate = applyRotate(input, mask);
        console.log(input.copy());
        inputRotate = applyRotate(input.copy(), mask);
        // ansPossible = permutate(inputRotate);
        console.log(inputRotate);
        console.log('********************************');
        // ans = getBestAns(ans, ansPossible);
    }
    return ans;
}

function solve(input) {
    return rotateAndPermutate(input);
}

function inputJsonToClass(inputJson) {
    table = new Material(inputJson.table);
    materials = [];
    inputJson.materials.forEach(material => {
        materials.push(new Material(material));
    });
    return new Input(table, materials);
}

function resolveCut(inputJson) {
    inputClass = inputJsonToClass(inputJson);
    // console.log(inputClass);
    output = solve(inputClass);
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