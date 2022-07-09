/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function isValidEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@\w+([-.]\w+)*\.([A-Za-z]{2,4})$/

  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function isValidCellPhone(phone) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

export function isValidPhone(phone) {
  const reg = /^([\d]{3,4}-?)?[\d]{7,8}$/
  return reg.test(phone)
}

export function isValidLinePhone(phone) {
  const reg = /^([0-9-]+)$/
  return reg.test(phone)
}

export function isValidUserName(username) {
  const reg = /^[\w]{4,16}$/
  return reg.test(username)
}

export function isValidPassword(password) {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?_-]).*$/
  return reg.test(password)
}

export function isValidSimplePassword(password) {
  const reg = /^.*(?=.{6,}).*$/
  return reg.test(password)
}
// 中文字符\u4E00 - \u9FA5

export function isValidChinese(chinese) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(chinese)
}

export function isValidUnifyCode(unifyCode) {
  const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/
  return reg.test(unifyCode)
}

export function isValidIDNumber(idNumber) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(idNumber)
}

// 中文 英文 数字 （兼容外国人名）
export function isValidUnionName(unionName) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5\s]+$/
  return reg.test(unionName)
}
