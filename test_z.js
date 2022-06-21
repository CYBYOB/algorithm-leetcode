
let obj = {},
    map = new Map,
    tempKey = '';

const t_0 = +new Date()
for (let i = 0; i < 5000000; i++) {
    const randomVal = Math.random(),
        key = `${i} - ${randomVal}`;

    if (randomVal > 0.5 && !tempKey) {
        tempKey = key;
    }

    obj[key] = key;
    map.set(key, key);
}

const obj_t1 = +new Date();
const obj_val = obj[tempKey];
const obj_t2 = +new Date();

const map_t1 = +new Date();
const map_val = map.get(tempKey);
const map_t2 = +new Date();

console.log('t_0', t_0);
console.log('obj_t1', obj_t1);
console.log('obj_t2', obj_t2);

console.log('obj_t2 - obj_t1', obj_t2 - obj_t1);
console.log('map_t2 - map_t1', map_t2 - map_t1);