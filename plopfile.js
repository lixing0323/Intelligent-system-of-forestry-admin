const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')
const htListGenerator = require('./plop-templates/HtList/prompt.js')
const htListContainerGenerator = require('./plop-templates/HtListContainer/prompt.js')
const htFormGenerator = require('./plop-templates/HtForm/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('HtForm', htFormGenerator)
  plop.setGenerator('HtList', htListGenerator)
  plop.setGenerator('HtListContainer', htListContainerGenerator)
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
