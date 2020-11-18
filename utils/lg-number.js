/**
 * 转换整数，返回倍数及整数值，比如
 * 1000 >>> { times: 1, num: 100}
 * 3.14 >>> { times: 100, num: 3.14}
 * @param {Number} number 
 */
function toInteger(number = 0) {
    let ret = { times: 1, num: 0 };
    if (Number.isInteger(number)) {
        ret.num = number;
        return ret;
    }
    ret.times = Math.pow(10, number.toString().split('.')[1].length);
    ret.num = parseInt(number * ret.times + 0.5, 10);
    return ret;
}

// 保留两位小数
function numberFormat(value) {
    if(/\./.test(value)) {
        let [r1, r2] = value.toString().split('.');
        if(r2.length === 2) {
            return value;
        }else if(r2.length > 2) {
            return r1 + '.' + r2.slice(0, 2);
        }else {
            return r1 + '.' + r2 + '0';
        }
    }else {
        return value + '.00';
    }
}

/**
 * 运算结果
 * @param {Number} a 数字1
 * @param {Number} b 数字2
 * @param {String} operator 运算符
 */
function operation(a, b, operator) {

    let o1 = toInteger(a);
    let o2 = toInteger(b);

    let n1 = o1.num;
    let n2 = o2.num;

    let t1 = o1.times;
    let t2 = o2.times;

    let max = Math.max(t1, t2);
    let result = null;
    switch (operator) {
        case '+':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
           return result / max;
        case '-':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max;
        case '*':
            result = (n1 * n2) / (t1 * t2);
            return result;
        case '÷':
            result = (n1 / n2) * (t2 / t1);
            return result
    }
}


class BigNumber {
    // +
    plus(a, b) {
        return numberFormat(operation(a, b, '+'))
    }
    // -
    minus(a, b) {
        return numberFormat(operation(a, b, '-'));
    }
    // *
    multiply(a, b) {
        return numberFormat(operation(a, b, '*'));
    }
    // ÷
    divide(a, b) {
        return numberFormat(operation(a, b, '÷'));
    }
}

export default new BigNumber();



