class Validator {
  // 验证手机号
  static tel(val) {
    return /^1[3,4,5,6,7,8,9]\d{9}$/.test(val);
  }
}

export default Validator;

