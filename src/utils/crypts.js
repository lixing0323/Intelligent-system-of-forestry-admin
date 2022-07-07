const CryptoJS = require('crypto-js')

export function encryptByDES(originalStr, key) {
  key = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.lib.WordArray.random(8)
  const encrypted = CryptoJS.DES.encrypt(originalStr, key, {
    iv: iv
  })
  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)
}

const autoLoginkey = 'yc2021@authorize'
// 加密
export function encryptByDESForAutoAuthorize(originalStr) {
  const keyHex = CryptoJS.enc.Utf8.parse(autoLoginkey)
  const ivHex = CryptoJS.enc.Utf8.parse(autoLoginkey)
  const encrypted = CryptoJS.DES.encrypt(originalStr, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }
  )
  return encrypted.ciphertext.toString()
}
// 解密
export function decryptByDESForAutoAuthorize(encryptStr) {
  const keyHex = CryptoJS.enc.Utf8.parse(autoLoginkey)
  const ivHex = CryptoJS.enc.Utf8.parse(autoLoginkey)
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(encryptStr)
  }, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
