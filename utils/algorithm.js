exports.list_permutation = list => {
    let permArr = [];
    let usedChars = [];
    for (let i = 0; i < list.length; i++) {
        let ch = list.splice(i, 1)[0];
        usedChars.push(ch);
        if (list.length == 0) {
            permArr.push(usedChars.slice());
        }
        list_permutation(list);
        list.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
};