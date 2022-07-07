<template>
  <div>
    <!--    <app-big-image-->
    <!--      :is-show.sync="bigImageVisible"-->
    <!--      :img-src="bigImageSrc"-->
    <!--    />-->
    <el-table
      ref="table"
      v-loading="isLoading"
      class="width-percentage-100"
      :data="list"
      :border="isBorder"
      :show-header="isShowHeader"
      :row-key="rowKey"
      highlight-current-row
      size="mini"
      empty-text="暂无数据"
      element-loading-text="加载中"
      :header-cell-style="handleHeaderStyle"
      :row-style="handleRowStyle"
      :cell-style="handleCellStyle"
      @selection-change="onSelectionChange"
    >
      <slot name="isSelection" />
      <ht-table-column v-if="isShowNumber" type="index" label="序号" />
      <ht-table-column
        v-for="item in tableTitles"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align"
        :fixed="item.fixed"
      >
        <template v-slot="{row, $index}">
          <!-- format = information, 显示商品信息 -->
          <span v-if="item.format === 'information'" class="information">
            <div class="logo">
              <img
                class="info-logo-size"
                :src="row['iLogo'] || defaultImage"
                @click="handelClickToEnlargeImage($event)"
              >
            </div>
            <div class="name-div">
              <div class="name">{{ row["iName"] }}</div>
              <div class="category">{{ row["iCategory"] }}</div>
              <div class="code">{{ row["iCode"] }}</div>
            </div>
          </span>
          <span v-else-if="item.format === 'QRCode'">
            <el-popover
              placement="right"
              width="230"
              height="400"
              trigger="hover"
              style="margin-right: 20px"
            >
              <span>
                <vue-qr ref="Qrcode" :text="row.qrCode" :size="200" />
              </span>
              <el-link slot="reference" style="width:30px;margin: 0 auto"><vue-qr :text="row.qrCode" :size="30" /></el-link>
            </el-popover>
            <slot name="qrCodeOperation" :info="{row: row, index: $index}" />
          </span>
          <!-- format = icon, 显示图片 -->
          <span v-else-if="item.format === 'img'">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.imgUrls[0]"
              :preview-src-list="row.imgUrls"
              fit="contain"
            />
          </span>
          <!-- format = time, 将时间格式化为去掉秒的数据 -->
          <span v-else-if="item.format === 'time'">{{
            row[item.prop] | removeTheSecondsOfTime
          }}</span>
          <!-- format = currency, 显示金额 -->
          <span v-else-if="item.format === 'currency'">
            <span v-if="item.currencyType" class="currency">{{
              row[item.prop] | formatToCurrency(row[item.currencyType])
            }}</span>
            <span v-else class="currency">{{
              row[item.prop] | formatToCurrency
            }}</span>
          </span>
          <span v-else-if="item.format === 'sixMoney'">
            <span class="currency">{{
              row[item.prop] | formatMoneySixDecimal }}
            </span>
          </span>
          <!-- format = percent, 显示百分比 -->
          <span v-else-if="item.format === 'percent'">
            <span>{{
              row[item.prop] | formatToPercent
            }}</span>
          </span>
          <span v-else-if="item.format === 'money'">
            <span class="currency">￥{{ row[item.prop] }}</span>
          </span>
          <!-- format = bold, 加粗字体 -->
          <span v-else-if="item.format === 'bold'">
            <span class="bold">{{ row[item.prop] }}</span>
          </span>
          <!-- format = move, 上移, 下移事件 -->
          <span v-else-if="item.format === 'move'">
            <el-button
              v-if="scope.$index !== 0"
              size="mini"
              @click="handleMoveUp(scope.$index)"
            >
              <i class="fa fa-arrow-circle-up" /> 上移
            </el-button>
            <el-button
              v-if="scope.$index + 1 !== data.length"
              size="mini"
              @click="handleMoveDown(scope.$index)"
            >
              <i class="fa fa-arrow-circle-down" /> 下移
            </el-button>
          </span>
          <!-- format = link，点击事件 -->
          <span v-else-if="item.format === 'link'">
            <u class="link" @click="handleClickLink(row, item.label)">{{
              row[item.prop]
            }}</u>
          </span>
          <!-- format = a, 网页跳转 -->
          <span v-else-if="item.format === 'a'">
            <u class="link">
              <a :href="row[item.prop]" target="_blank">{{
                row[item.prop]
              }}</a>
            </u>
          </span>
          <!-- format = tooltip, 显示不下了 -->
          <span v-else-if="item.format === 'tooltip'" class="table-tooltip">
            <el-tooltip
              effect="light"
              :content="row[item.tooltips]"
              placement="left"
            >
              <span class="tooltips">{{ row[item.prop] }}</span>
            </el-tooltip>
          </span>
          <!-- format = number, 强制显示成数字 -->
          <span v-else-if="item.format === 'number'">{{
            +row[item.prop]
          }}</span>
          <!-- format = start, 星级 -->
          <span v-else-if="item.format === 'star'">
            <el-rate :value="+row[item.prop]" disabled />
          </span>
          <!-- format = color, 颜色块 -->
          <span v-else-if="item.format === 'color'">
            <div
              class="color-block"
              :style="{ 'background-color': row[item.prop] }"
            />
          </span>
          <!-- format = tag, 标记 -->
          <span v-else-if="item.format === 'tag'">
            <el-tag
              v-if="item.value && item.prop && row[item.prop]"
              :type="item.value[row[item.prop]]"
            >{{ row[item.prop] }}</el-tag>
          </span>
          <!-- format = question, 点击问号显示文字 -->
          <span v-else-if="item.format === 'question'">
            {{ row[item.prop] }}
            <el-popover
              v-if="row.questionIcon"
              placement="right-start"
              width="200"
              trigger="click"
              :content="row.question"
            >
              <i slot="reference" class="fa fa-question-circle-o question" />
            </el-popover>
          </span>
          <span v-else-if="item.format === 'switch'">
            <el-switch
              v-if="item.prop"
              v-model="row[item.prop]"
              @change="switchChange(row)"
            />
          </span>
          <span v-else-if="item.format === 'status'">
            <status v-if="row[item.prop]" :status="row[item.prop]" :status-types="item.statusType" />
          </span>
          <span v-else>
            <span v-if="item.secondProp" :style="item.style">{{ (row[item.prop] && row[item.prop][item.secondProp]) ? row[item.prop][item.secondProp] : '-' }}</span>
            <span v-else :style="item.style">{{ row[item.prop] ? row[item.prop] : '-' }}</span>
          </span>
        </template>
      </ht-table-column>
      <slot name="extra" />
      <ht-table-column-operation v-if="btWidth" :width="btWidth + 'px'">
        <template v-slot="{row, $index}">
          <el-popover
            v-if="actionTooltips"
            placement="left-start"
            width="200"
            trigger="click"
            :content="actionTooltips"
          >
            <i
              slot="reference"
              class="fa fa-question-circle-o question"
              @click="handleClickQuestion($index)"
            />
          </el-popover>
        </template>
        <template v-slot="{row, $index}">
          <span v-if="!row.otherButton && row.showDropdown">
            <ht-button type="text" @click="handleClickOthersButton(row, row.mainButton.name)">{{ row.mainButton.name }}</ht-button>
            <el-dropdown trigger="click" @command="handleClickOthersButton(row, $event)">
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right" /></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="i in row.otherButtons" :key="i.name" :command="i.name">
                  <ht-popover-button
                    v-if="i.isPopoverButton"
                    :disabled="i.disabled"
                    type="text"
                    :danger-text="i.dangerText"
                    :confirm-title="i.confirmTitle"
                    :button-color="i.buttonColor && !i.dangerText ? i.buttonColor : ''"
                    @confirmed="confirmMethod(row, i.name)"
                  >{{ i.name }}
                  </ht-popover-button>
                  <ht-button v-else type="text" :style="{color: i.color}">{{ i.name }}</ht-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--            <el-dropdown-->
            <!--              size="mini"-->
            <!--              trigger="click"-->
            <!--              split-button-->
            <!--              type="primary"-->
            <!--              @command="-->
            <!--                handleClickOthersButton(scope.$index, row, $event)-->
            <!--              "-->
            <!--              @click="handleClickMainButton(scope.$index, row)"-->
            <!--            >-->
            <!--              {{ getMainButtonName(row.buttons) }}-->
            <!--              <el-dropdown-menu slot="dropdown">-->
            <!--                <el-dropdown-item-->
            <!--                  v-for="name in getOthersButtonName(row.buttons)"-->
            <!--                  :key="name"-->
            <!--                  :command="name"-->
            <!--                >{{ name }}</el-dropdown-item>-->
            <!--              </el-dropdown-menu>-->
            <!--            </el-dropdown>-->
          </span>
          <span v-else-if="!row.otherButton && !row.showDropdown">
            <ht-button style="margin-right: 10px" type="text" @click="handleClickOthersButton(row, row.mainButton.name)">{{ row.mainButton.name }}</ht-button>
            <span v-for="i in row.otherButtons" :key="i.id" style="margin-right: 10px">
              <ht-button
                v-if="!i.isPopoverButton"
                type="text"
                :style="{color: i.buttonColor}"
                :disabled="i.disabled"
                @click="handleClickOthersButton(row, i.name)"
              >{{ i.name }}</ht-button>
              <ht-popover-button
                v-else
                :disabled="i.disabled"
                type="text"
                :danger-text="i.dangerText"
                :confirm-title="i.confirmTitle"
                :button-color="i.buttonColor && !i.dangerText ? i.buttonColor : ''"
                @confirmed="confirmMethod(row, i.name)"
              >{{ i.name }}
              </ht-popover-button>
            </span>
          </span>
          <span v-else>
            <ht-button type="text" @click="handleClickOthersButton(row, row.mainButton.name)">{{ row.mainButton.name }}</ht-button>
            <ht-button
              v-if="!row.otherButton.isPopoverButton"
              type="text"
              :style="{color: row.otherButton.buttonColor}"
              :disabled="row.otherButton.disabled"
              @click="handleClickOthersButton(row, row.otherButton.name)"
            >{{ row.otherButton.name }}</ht-button>
            <ht-popover-button
              v-else
              :disabled="row.otherButton.disabled"
              type="text"
              :danger-text="row.otherButton.dangerText"
              :confirm-title="row.otherButton.confirmTitle"
              :button-color="row.otherButton.buttonColor && !row.otherButton.dangerText ? row.otherButton.buttonColor : ''"
              @confirmed="confirmMethod(row, row.otherButton.name)"
            >{{ row.otherButton.name }}
            </ht-popover-button>
          </span>
        </template>
      </ht-table-column-operation>
    </el-table>

    <div
      v-if="isShowPagination && page.total > 0 && list"
      class="pagination-container"
    >
      <ht-pagination
        style="float: right;margin-bottom: 10px"
        :total="page.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.perPage"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
// 表格组件
// import AppBigImage from "@/components/bigImage";
// import defaultImage from "@/assets/default.png";
// import { createUniqueString } from "@/utils/index.js";
// import HtListContainer from '@/components/HtListContainer'
import HtList from '@/components/HtList'

export default {
  name: 'AppTable',
  extends: HtList,
  // components: {
  //   AppBigImage
  // },
  props: {
    tableData: {
      type: Array,
      default: undefined
    },
    rowKey: {
      type: [String, Function],
      default: undefined
    },
    buttons: { type: Array, default: undefined },
    // 行项目操作按钮禁灰
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    // table name
    name: {
      type: String,
      default: 'table'
    },
    // 是否需要序号
    isShowNumber: {
      type: Boolean,
      default: true
    },
    // 是否需要翻页组件
    isShowPagination: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    isShowHeader: {
      type: Boolean,
      default: true
    },
    // 是否需要栅格
    isBorder: {
      type: Boolean,
      default: true
    },
    // 是否支持操作按钮带图片
    isIconButton: {
      type: Boolean,
      default: false
    },
    // 表格操作列
    options: {
      type: Array,
      default: undefined
    },
    // loading提示框
    loadingText: { type: String, default: undefined },
    // loading状态
    loadingStatus: {
      type: Boolean,
      default: false
    },
    // 操作列表宽度，如果设置了，就证明有操作列表
    btWidth: {
      type: Number,
      default: undefined
    },
    // 操作列表提示信息
    actionTooltips: {
      type: String,
      default: undefined
    },
    // 获取单元格样式
    cellStyle: {
      type: [Function],
      default: undefined
    },
    // 是否在某些条件下对可选行进行限制
    filterSelect: {
      type: [Function, Boolean],
      default: undefined
    }
  },
  data() {
    return {
      // 放大图是否显示
      bigImageVisible: false,
      // 放大图的图片的路径
      bigImageSrc: '',
      // 单选选中的值
      singleSelectedRadio: false,
      // 默认图
      // defaultImage,
      // 单选当前的id序号，用于回显
      singleSelectedPage: undefined,
      singleSelectedIndex: undefined
    }
  },
  methods: {
    // 获取操作按钮个数
    getButtonNumber(bts) {
      if (bts) {
        return bts.length
      }
    },
    // 获取主按钮名称
    getMainButtonName(bts) {
      if (bts && bts.length > 0) {
        return bts[0]
      }
    },
    confirmMethod(row, name) {
      this.$emit('confirmMethod', row, name, 'confirmMethod')
    },
    // 获取除第一个之外的其他按钮名称
    getOthersButtonName(bts) {
      if (bts && bts.length > 1) {
        const others = Object.assign([], bts)
        others.splice(0, 1)
        return others
      }
    },
    // 点击按钮传递给父组件
    handleClickMainButton(index, row) {
      this.handleClickOthersButton(
        index,
        row,
        this.getMainButtonName(row.buttons)
      )
    },
    handleClickOthersButton(row, name) {
      this.$emit('subOptionButton', row, name)
    },
    // 设置表头样式
    handleHeaderStyle({ row, column, rowIndex, columnIndex }) {
      return { backgroundColor: '#e5e9f2', color: '#333' }
    },
    // 设置行的样式
    handleRowStyle({ row, rowIndex }) {},
    // 设置单元格的样式
    handleCellStyle({ row, column, rowIndex, columnIndex }) {
      if (this.cellStyle) {
        return this.cellStyle(row, column, rowIndex, columnIndex)
      }
    },
    // 禁止多选的行
    handleSelectable(row, index) {
      this.$emit('selectable', row)
      let a
      if (this.filterSelect) {
        a = row.canSelect
      } else {
        a = true
      }
      return a
    },
    // 上移
    handleMoveUp(index) {
      this.data[index] = this.data.splice(index - 1, 1, this.data[index])[0]
    },
    // 下移
    handleMoveDown(index) {
      this.data[index] = this.data.splice(index + 1, 1, this.data[index])[0]
    },
    // 点击链接
    handleClickLink(row, title) {
      this.$emit('subClickLink', { row: row, title: title })
    },
    // 点击表格中的疑问符号
    handleClickQuestion(index) {},
    // 滑块switch改变
    switchChange(val) {
      this.$emit('switchChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-size {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.info-logo-size {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.button-margin-left {
  margin-left: 8px;
}

.link {
  cursor: pointer;
  color: #4876ff;
}

.information {
  .logo {
    width: 60px;
    float: left;
    display: inline-flex;
  }

  .name-div {
    width: 150px;
    float: left;
    .name {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: normal;
    }
    .category {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: normal;
    }
    .code {
      font-size: 12px;
      color: #999;
    }
  }
}

.tooltips {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: normal;
}

.color-block {
  width: 50px;
  height: 30px;
}

.pagination-container {
  margin-top: 10px;
}

.currency {
  font-weight: bold;
}

.bold {
  font-weight: bold;
}

.question {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
  margin-left: -5px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
