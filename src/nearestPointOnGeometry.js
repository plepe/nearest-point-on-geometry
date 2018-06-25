const turf = {
  nearestPointOnLine: require('@turf/nearest-point-on-line').default,
  booleanPointInPolygon: require('@turf/boolean-point-in-polygon').default
}

function nearestPointOnGeometry (feature, pt, options) {
  switch (feature.geometry.type) {
    case 'LineString':
    case 'MultiLineString':
      return turf.nearestPointOnLine(feature, pt, options)
    case 'Polygon':
      if (turf.booleanPointInPolygon(pt, feature, options)) {
        let result = JSON.parse(JSON.stringify(pt))
        result.properties = {
          "dist": 0,
          "location": 0
        }
        return result
      } else {
        let modifiedFeature = JSON.parse(JSON.stringify(feature))
        modifiedFeature.geometry.type = 'MultiLineString'
        return nearestPointOnGeometry(modifiedFeature, pt, options)
      }
    default:
  }
}

module.exports = nearestPointOnGeometry
