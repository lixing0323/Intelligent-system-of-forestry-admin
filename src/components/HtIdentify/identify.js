/**
 * 随机生成一个0~9之间的数
 */
function randomNum() {
  return Math.floor(Math.random() * 10)
}

/**
 * 随机生成一个字母
 * @param {boolean} isUpper 生成大写字母
 */
function randomAlphabet({ isUpper = false } = {}) {
  // a的Unicode值为97,z的Unicode值为123
  const alphabet = String.fromCharCode(Math.floor(Math.random() * 25) + 97)
  if (!isUpper) {
    return alphabet
  } else {
    return alphabet.toUpperCase()
  }
}

/**
 * 图片验证码随机排序
 * @param {string} str 图片验证码
 */
function shuffle(str) {
  return [...str].sort(() => Math.random() - 0.5).join('')
}

/**
 * 生成图片验证码
 * @param {number} length 图片验证码位数
 * @param {boolean} typeMix 数字和字母混合
 * @param {string} pureNumber 纯数字('number')或者字母('alphabet')
 * @param {boolean} randomTypeLen 随机生成类型个数组合
 * @param {boolean} capsLookMix 字母大小写混合
 * @param {number} numLength 混合类型下的数字个数
 * @param {number} UpperLength 大写字母的个数
 */
export function makeIdentifyCode({ length = 4, typeMix = true, pureNumber = 'alphabet', randomTypeLen = false, capsLookMix = false, numLength = 2, UpperLength = 1 } = {}) {
  let makeCode = ''
  // 数字和字母混合
  if (typeMix) {
    // 随机生成类型个数组合
    if (randomTypeLen) {
      // 字母大小写混合
      if (capsLookMix) {
        const numLength = Math.floor(Math.random() * length) + 1
        const UpperLength = numLength === length ? 0 : Math.floor(Math.random() * (length - numLength)) + 1
        for (let i = 0; i < numLength; i++) {
          makeCode += randomNum()
        }
        for (let i = 0; i < UpperLength; i++) {
          makeCode += randomAlphabet({ isUpper: true })
        }
        if (numLength + UpperLength < length) {
          for (let i = 0; i < length - numLength - UpperLength; i++) {
            makeCode += randomAlphabet()
          }
        }
      } else {
        const numLength = Math.floor(Math.random() * length) + 1
        for (let i = 0; i < numLength; i++) {
          makeCode += randomNum()
        }
        if (numLength < length) {
          for (let i = 0; i < length - numLength; i++) {
            makeCode += randomAlphabet()
          }
        }
      }
    } else {
      // 字母大小写混合
      if (capsLookMix) {
        const tempNumLength = numLength < 0 ? 2 : numLength > length ? 2 : numLength
        const tempUpperLength = UpperLength < 0 ? 1 : UpperLength > length - tempNumLength ? 1 : UpperLength
        for (let i = 0; i < tempNumLength; i++) {
          makeCode += randomNum()
        }
        for (let i = 0; i < tempUpperLength; i++) {
          makeCode += randomAlphabet({ isUpper: true })
        }
        if (tempNumLength + tempUpperLength < length) {
          for (let i = 0; i < length - tempNumLength - tempUpperLength; i++) {
            makeCode += randomAlphabet()
          }
        }
      } else {
        const tempNumLength = numLength < 0 ? 2 : numLength > length ? 2 : numLength
        for (let i = 0; i < tempNumLength; i++) {
          makeCode += randomNum()
        }
        if (tempNumLength < length) {
          for (let i = 0; i < length - tempNumLength; i++) {
            makeCode += randomAlphabet()
          }
        }
      }
    }
  } else {
    // 纯数字('number')
    if (pureNumber === 'number') {
      for (let i = 0; i < length; i++) {
        makeCode += randomNum()
      }
    }
    // 纯字母('alphabet')
    if (pureNumber === 'alphabet') {
      // 字母大小写混合
      if (capsLookMix) {
        const tempUpperLength = UpperLength < 0 ? 1 : UpperLength > length ? 1 : UpperLength
        for (let i = 0; i < tempUpperLength; i++) {
          makeCode += randomAlphabet({ isUpper: true })
        }
        if (tempUpperLength < length) {
          for (let i = 0; i < length - tempUpperLength; i++) {
            makeCode += randomAlphabet()
          }
        }
      } else {
        for (let i = 0; i < length; i++) {
          makeCode += randomAlphabet()
        }
      }
    }
  }
  return shuffle(makeCode)
}

