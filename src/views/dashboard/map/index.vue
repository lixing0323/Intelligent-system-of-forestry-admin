<template>
  <!--此处，div排列顺序不能改变，先画地图，然后中间的图片，再次其他的-->
  <div class="business-map">
    <div class="map" :style="{ height: height + 'px' }">
      <div id="province" class="map" />
    </div>

    <header-image />
  </div>
</template>

<script>
/* eslint-disable */
import HeaderImage from './compoennts/header'
import FullScreen from './compoennts/fullScreen'
import TrianglePNG from '@/assets/map/triangle.png'

import { getDomainData } from '@/api/dashboard/domain.js'
import { getCarbonSinkData } from "@/api/dashboard/carbonSink";
// 地图
  var map;

  export default {
    name: "map-show",
    components: { HeaderImage, FullScreen },
    props: {
      // id
      id: {
        type: String,
        default: "container"
      },
      uuid: {
        type: String,
        default: undefined
      }
    },
    computed: {
    },
    data() {
      return {
        TrianglePNG,
        height: document.documentElement.clientHeight - 5,
        markers: [],
        domain: [],
        forestry: {},
        groups: [
           { longitude: '109.832654',  latitude: '37.838099'  }, // 榆林
          { longitude: '109.700589',  latitude: '36.21953'  }, // 延安
          { longitude: '109.01671',  latitude: '34.359562'  }, // 西安
          { longitude: '107.432185',  latitude: '32.880493'  }, // 汉中
          // { longitude: '108.644072',  latitude: '32.579881'  }, // 安康
          { longitude: '107.168056',  latitude: '34.316907'  }, // 宝鸡
          // { longitude: '108.348869',  latitude: '34.624322'  }, // 咸阳
          // { longitude: '109.032498',  latitude: '35.146861'  }, // 铜川
          // { longitude: '110.32207',  latitude: '33.530487'  }, // 商洛
          { longitude: '109.809348',  latitude: '34.803123'  } // 渭南
        ],
        cityName: undefined,
        rightTopLoading: false
      }
    },
    watch: {},
    mounted() {
      this.rightTopLoading = true
      this.createMap()
      this.getData()
    },
    created() {
    },
    methods: {
      // 新建地图
      createMap() {
        const that = this
        map = new AMap.Map('province', {
          resizeEnable: true,
          keyboardEnable: false,
          mapStyle: "amap://styles/grey",
          center: [108.947044, 35.98445],
          zoom: 7,
          pitch: 0,
          viewMode: '3D', // 地图模式
        });
        map.on('click', function(e) {
          // 拾取所在位置的行政区
          const props = that.disProvince.getDistrictByContainerPos(e.pixel)
          if (props) {
            that.gotoDetails(props.NAME_CHN)
          }
        });
        map.clearMap();
      },
      // 配置地图数据
      setMapData() {
        // 设置标记点
        this.setMarkers()
        // 陕西省绘图
        this.initProvince();
        this.disProvince.setMap(map);
      },
      // 新建多个标记 自定义 image = require('@/assets/map/red.png')
      setMarkers() {
        const that = this
        let infoWindow = new AMap.InfoWindow({isCustom: true, offset: new AMap.Pixel(10, 0)})

        for (let i=0; i<this.groups.length; i++) {
          const sampling = 1
          const target = 2
          const position = [this.groups[i].longitude, this.groups[i].latitude]
          const country = '区'
          const street = '街道'

          this.markers[i] = new AMap.Marker({
            content: '<div class="markerClass more-animation"></div>',
            position: position,
            offset: new AMap.Pixel(0, 0),
            shape: new AMap.MarkerShape({coords: [18, 18, 18], type: 'circle'}),
            extData: {
              label:  that.showTipContent(null, country, sampling, target ),
              sampling: sampling, street: street }
          });
          map.add(this.markers[i]);
          // 显示鼠标窗口提示
          AMap.event.addListener(this.markers[i], 'mouseover', (e) => {
            const props = that.disProvince.getDistrictByContainerPos(e.pixel)
            if (props) {
              const content = that.showTipContent(props.NAME_CHN,[])
              infoWindow.setContent(content);
              infoWindow.open(map, position);
            }
          });
          // 隐藏窗体
          AMap.event.addListener(this.markers[i], 'mouseout', () => {
            infoWindow.close()
          });
          // 点击marker进入子界面
          AMap.event.addListener(this.markers[i], 'click', (e) => {
          });
        }
      },
      // 鼠标提示
      showTipContent(city, list) {
        return`<div class="content-window-card">
                 <div class="info-top">
                    <div class="title">${city}</div>
                    <div class="row-label label">
                        <div class="column-title"></div><div class="column">数量</div><div class="column">面积(公顷)</div><div class="column">碳储(吨)</div>
                    </div>
                 </div>
                 <div class="info-middle">
                    <div class="row-label">
                        <div class="column-title">林地</div><div class="column">2</div><div class="column">250</div><div class="column">350</div>
                    </div>
                     <div class="row-label">
                        <div class="column-title">草原</div><div class="column">3</div><div class="column">360</div><div class="column">460</div>
                    </div>
                     <div class="row-label">
                        <div class="column-title">湿地</div> <div class="column">4</div><div class="column">260</div><div class="column">231</div>
                    </div>
                      <div class="row-label">
                        <div class="column-title">荒漠</div><div class="column">1</div><div class="column">123</div><div class="column">158</div>
                    </div>
                 </div>
                 <div class="info-bottom"><img style="width: 1.1rem;height: 0.5rem" src="https://yanchang-1253330314.cos.ap-chengdu.myqcloud.com/temp/image/triangle.png" /></div>
               </div>`
      },
      // 设置区域图 610000 = 西安  depth = 地级市
      initProvince() {
        this.disProvince = new AMap.DistrictLayer.Province({
          adcode: [610000], depth: 1,
          styles: {
            'fill': '#191E2C',
            'province-stroke': '#00D93C',
            'city-stroke': '#00D93C', // 中国地级市边界
            'county-stroke': '#00D93C' // 中国区县边界
          }
        });
      },
      // 跳转详情
      gotoDetails(name) {
        if (this.domain && this.domain.length > 0) {
          const index = this.domain.findIndex(item => name.indexOf(item.name) !== -1)
          const id = index !== -1 ? this.domain[index].id : 1
          this.$router.push({name: 'CityDetails', params: { id: id  }})
        } else {
          this.$message({ message: `城市数据还未返回或者数据错误，请稍后再点击`, duration: 1500, type: 'error' })
        }
      },
      // 获取数据
      getData() {
        // 获取区域数据, 获取林业的碳汇量数据
        Promise.all([getDomainData(), getCarbonSinkData()]).then(res => {
          this.domain = res[0]
          this.forestry = res[1][0]
          this.setMapData()
          this.rightTopLoading = false
        }).catch(() => (this.rightTopLoading = false))
      }
    }
  }
  /* eslint-disable */
</script>

<style lang="scss">
@import "~@/styles/element-variables.scss";
.map {
  width: 100%;
  height: 100%;
}

.markerClass {
  width: 18px;
  height: 18px;
  /*transform: translate3d(0px, 0px, 0px);*/
  position: relative;
  outline: none;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.75);
  border-radius: 100%;
  transform-origin: 0 0;
  display: block;
  opacity: 0.7;
}

.markerClass::after {
  content: "";
  -webkit-border-radius: 100%;
  border-radius: 100%;
  height: 300%;
  width: 300%;
  position: absolute;
  margin: -100% 0 0 -100%;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite; /*无穷反复*/
  animation-delay: 0.2s;
}

.more {
  background-color: $--color-font;
}

.more-animation {
  background-color: $--color-font;
}

.more-animation::after {
  box-shadow: 0 0 6px 2px $--color-font;
}

.less {
  background-color: #666666;
}

.less-animation {
  background-color: #666666;
}

.less-animation::after {
  box-shadow: 0 0 6px 2px #666666;
}

@keyframes pulsate {
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    filter: none;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
    filter: alpha(opacity=0);
  }
}

.tip-country {
  font-size: 14px;
  font-weight: bold;
}
.tip-number {
  font-weight: bold;
  font-size: 0.9rem;
}

.tip-label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.amap-marker-label {
  border: none;
  padding: 0;
}

.content-window-card {
  position: relative;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
  border: solid 1px #156519;
  box-shadow: 0 0 6px 2px #156519;
  color: #FFFFFF;
  border-radius: 25px;

  .row-label {
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .column-title {
      width: 45px;
    }
    .column {
      width: 65px;
    }
  }
  div.info-top {
    position: relative;
    border-radius: 15px 15px 0 0;
    background: none repeat scroll 0 0 #156519;
    border-bottom: 1px solid #FFF;
    color: #FFFFFF;
    font-weight: bold;
    line-height: 25px;
    padding: 0 10px;
    .title {
      font-size: 0.9rem !important;
    }
    .label {
      font-size: 0.5rem !important;
    }
  }


  div.info-middle {
    font-size: 12px;
    padding: 10px 6px;
    line-height: 20px;
    background-color: #156519;
    border-radius: 0 0 15px 15px;
  }

  div.info-bottom {
    height: 0;
    width: 100%;
    clear: both;
    border-radius: 0 0 15px 15px;
    text-align: center;
    position: relative;
    top: -0.3rem;
  }
}


</style>

