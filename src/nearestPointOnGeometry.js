const turf = {
  nearestPointOnLine: require('@turf/nearest-point-on-line').default,
  booleanPointInPolygon: require('@turf/boolean-point-in-polygon').default
}

function nearestPointOnGeometry (feature, pt, options) {
  var result

  if (!feature.geometry) {
    return null
  }

  switch (feature.geometry.type) {
    case 'LineString':
    case 'MultiLineString':
      return turf.nearestPointOnLine(feature, pt, options)
    case 'Polygon':
      if (turf.booleanPointInPolygon(pt, feature, options)) {
        let result = JSON.parse(JSON.stringify(pt))
        result.properties = {
          'dist': 0,
          'location': 0
        }
        return result
      } else {
        let modifiedFeature = JSON.parse(JSON.stringify(feature))
        modifiedFeature.geometry.type = 'MultiLineString'
        return nearestPointOnGeometry(modifiedFeature, pt, options)
      }
    case 'MultiPolygon':
      result = feature.geometry.coordinates.map(coord => {
        let modifiedFeature = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: coord
          }
        }

        return nearestPointOnGeometry(modifiedFeature, pt, options)
      })

      result = result.sort((a, b) => {
        if (!a || !b) {
          return null
        }

        return a.properties.dist - b.properties.dist
      })

      if (result.length > 0) {
        return result[0]
      }

      return
    case 'GeometryCollection':
      result = feature.geometry.geometries.map(geom => {
        let modifiedFeature = {
          type: 'Feature',
          geometry: geom
        }

        return nearestPointOnGeometry(modifiedFeature, pt, options)
      })

      result = result.sort((a, b) => {
        if (!a || !b) {
          return null
        }

        return a.properties.dist - b.properties.dist
      })

      if (result.length > 0) {
        return result[0]
      }

      return
    default:
      console.log('nearestPointOnGeometry: don\'t know how to handle ' + feature.geometry.type)
  }
}

module.exports = nearestPointOnGeometry
