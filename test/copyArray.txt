function copyArray(array) {
    arrayCopy = [];
    array.forEach(element => {
        arrayCopy.push(element.copy());
    });
    return arrayCopy;
}

module.exports = copyArray;