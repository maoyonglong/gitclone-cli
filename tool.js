// 判断类型
function judgeType(target) {
    if(typeof target === "string") {
        target = "String";
    }else if(typeof target === "number") {
        target = "Number"
    }else if(typeof target === "function") {
        target = "Function";
    }else if(target instanceof Array) {
        target = "Array";
    }else if(typeof target === "object") {
        target = "Object";
    }
    return target;
}

// 判断是否是数组
function isArray(target) {
    return judgeType(target) === "Array";
}

// 判断是否是对象
function isObject(target) {
    return judgeType(target) === "Object";
}

// 判断是否是函数
function isFunction(target) {
    return judgeType(target) === "Function";
}

// 判断是否是字符串
function isString(target) {
    return judgeType(target) === "String";
}

// 将冲突转成注释
function confictToCommentOut() {

}

module.exports = {
    isArray,
    isObject,
    isString,
    isFunction
};