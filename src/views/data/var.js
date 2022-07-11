// 碳库类型
export const CARBON_TYPE_OPTIONS = [
  '林地', '草地', '湿地', '荒地'
]

// 样地类别
export const PLOT_TYPE_OPTIONS = [
  '乔木林地', '竹林地', '疏林地', '特殊灌木林地', '一般灌木林地',
  '未成林人工造林地', '未成林封育地', '采伐迹地', '火烧迹地', '其他迹地', '苗圃地'
]

// 地貌
export const LANDFORMS_OPTIONS = [
  '极高山', '高山', '中山', '低山', '丘陵', '平原'
]

// 坡向
export const SLOPE_DIRECTION_OPTIONS = [
  '东', '南', '西', '北', '东北', '东南', '西北', '西南', '无'
]

// 坡位
export const SLOPE_POSITION_OPTIONS = [
  '脊', '上', '中', '下', '谷', '平底'
]

// 坡度
export const SLOPE_DEGREES_OPTIONS = [
  'Ⅰ级平坡', 'Ⅱ级缓坡', 'Ⅲ级斜坡', 'Ⅳ级陡坡', 'Ⅴ级急坡', 'Ⅵ级陷坡'
]

// 土层厚度
export const SOIL_THICKNESS_OPTIONS = [
  '厚层土', '中层土', '薄层土'
]

// 腐殖层厚度
export const CURRENTS_LAYER_THICKNESS_OPTIONS = [
  '厚', '中', '薄'
]

// 拷贝数据
export function dataCopyToForm(form, data) {
  const content = JSON.parse(data.content)
  Object.assign(form, content)
  Object.assign(form, data)
}

// 获取数据
export function getJsonData(base = {}, content = {}) {
  return {
    plot_survey: {
      name: base.name,
      recorder_mobile: base.recorder_mobile,
      recorder_name: base.recorder_name,
      record_date: base.record_date,
      forest_property: base.forest_property,
      protection_zone: base.protection_zone,
      land_number: base.land_number,
      content: JSON.stringify(
        {
          // 基本信息
          gps_x: content.gps_x,
          gps_y: content.gps_y,
          carbon_type: content.carbon_type,
          plot_type: content.plot_type,
          comment: content.comment,
          // 土地信息
          land_forms: content.land_forms,
          altitude: content.altitude,
          slope_direction: content.slope_direction,
          slope_position: content.slope_position,
          slope_degrees: content.slope_degrees,
          soil_name: content.soil_name,
          soil_thickness: content.soil_thickness,
          currents_layer_thickness: content.currents_layer_thickness,
          ground_type: content.ground_type,
          desertification_type: content.desertification_type,
          desertification_degree: content.desertification_degree,
          wilderness_degree: content.wilderness_degree,
          gully_erosion_collapse_area_ratio: content.gully_erosion_collapse_area_ratio,
          soil_water_erosion_grade: content.soil_water_erosion_grade,
          soil_wind_erosion_grade: content.soil_wind_erosion_grade,
          carbon_dioxide_concentration: content.carbon_dioxide_concentration,
          // 类别详情
          litter_thickness: content.litter_thickness,
          shrub_coverage: content.shrub_coverage,
          shrub_height: content.shrub_height,
          herbaceous_coverage: content.herbaceous_coverage,
          herbaceous_height: content.herbaceous_height,
          total_vegetation_coverage: content.total_vegetation_coverage,
          vegetation_type: content.vegetation_type,
          forest_ownership: content.forest_ownership,
          forest_species: content.forest_species,
          origin: content.origin,
          dominant_tree_species: content.dominant_tree_species,
          average_age: content.average_age,
          age_group: content.age_group,
          diameter_group: content.diameter_group,
          average_DBH: content.average_DBH,
          average_tree_height: content.average_tree_height,
          canopy_closure: content.canopy_closure,
          forest_community_structure: content.forest_community_structure,
          forest_layer_structure: content.forest_layer_structure,
          tree_species_structure: content.tree_species_structure,
          phyllostachys_pubescens_stands_count: content.phyllostachys_pubescens_stands_count,
          scattered_phyllostachys_pubescens_count: content.scattered_phyllostachys_pubescens_count,
          natural_renewal_grade: content.natural_renewal_grade,
          total_sample_trees: content.total_sample_trees,
          total_standing_stock: content.total_standing_stock,
          forest_stock: content.forest_stock,
          afforestation_land_conditions: content.afforestation_land_conditions,
          operation_mode: content.operation_mode
        }
      )
    }
  }
}
