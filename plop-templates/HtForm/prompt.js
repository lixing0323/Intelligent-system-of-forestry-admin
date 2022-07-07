const { notEmpty } = require('../utils.js')

// camelCase: changeFormatToThis
// snakeCase: change_format_to_this
// dashCase/kebabCase: change-format-to-this
// dotCase: change.format.to.this
// pathCase: change/format/to/this
// properCase/pascalCase: ChangeFormatToThis
// lowerCase: change format to this
// sentenceCase: Change format to this,
// constantCase: CHANGE_FORMAT_TO_THIS
// titleCase: Change Format To This

module.exports = {
  description: '基于HtForm的组建生成器',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请输入HtForm组建的名称，如SummaryPoolForm',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'path',
    message: '请输入src/views/components/下的相对路径，如 ReqPlan/summary-pool-item',
    validate: notEmpty('path')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'Components require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{properCase name}}'
    const path = '{{path}}'
    const actions = [{
      type: 'add',
      path: `src/views/components/${path}/form.vue`,
      templateFile: 'plop-templates/HtList/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
