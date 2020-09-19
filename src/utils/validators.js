/* eslint-disable no-useless-escape */
export function phoneNumberValidator(rule, value, callback) {
    if (/^1[3456789]\d{9}$/.test(value)) {
        callback();
    } else {
        callback(new Error('手机号码不正确'));
    }
}

export function nameValidator(rule, value, callback) {
    if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        callback();
    } else {
        callback(new Error('仅支持输入汉字'));
    }
}

export function idNumberValidator(rule, value, callback) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('身份证号格式不正确'));
    }
}
export function emailValidator(rule, value, callback) {
    // 邮箱
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('邮箱格式不正确'));
    }
}
export function password1Validator(rule, value, callback) {
    // /8到16位数字与字母组合
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('密码必须是8到16位数字与字母组合'));
    }
}

export function passwordValidator(rule, value, callback) {
    // todo 密码安全性要求
    callback('');
}
