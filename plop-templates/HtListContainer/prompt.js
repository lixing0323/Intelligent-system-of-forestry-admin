const { notEmpty } = require('../utils.js')

module.exports = {
  description: '基于HtListContainer的组建生成器',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请输入HtListContainer组建的名称，如SummaryPoolList',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'path',
    message: '请输入src/views/下的相对路径，如 ReqPlan/summary-pool-item',
    validate: notEmpty('path')
  },
  {
    type: 'input',
    name: 'HtListFileName',
    message: '请输入HtList组件所在相对路径，如 ReqPlan/summary-pool-item/base-list.vue',
    validate: notEmpty('HtListFileName')
  },
  {
    type: 'input',
    name: 'HtListImportClassName',
    message: '请输入import名，如 ReqPlanListComponent',
    validate: notEmpty('HtListImportClassName')
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
    const fileName = '{{dashCase name}}'
    const path = '{{path}}'
    const actions = [{
      type: 'add',
      path: `src/views/${path}/${fileName}.vue`,
      templateFile: 'plop-templates/HtListContainer/index.hbs',
      data: {
        name: name,
        HtListFileName: '{{HtListFileName}}',
        HtListImportClassName: '{{properCase HtListImportClassName}}',
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
