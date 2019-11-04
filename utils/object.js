exports.copy = object => (
    JSON.parse(JSON.stringify(object))
);

exports.list = len => {
    let list = [];
    for (let i = 0; i < len; i ++) {
        list.push(i);
    }
    return list;
};