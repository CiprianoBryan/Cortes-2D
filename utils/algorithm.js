let permutations = [];
let used = [];

exports.permutations = list => {
    for (let i = 0; i < list.length; i ++) {
        let element = list.splice(i, 1)[0];
        used.push(element);
        if (list.length == 0) {
            permutations.push(used.slice());
        }
        this.permutations(list);
        list.splice(i, 0, element);
        used.pop();
    }
    return permutations;
};