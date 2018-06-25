const turf = {
  nearestPointOnLine: require('@turf/nearest-point-on-line').default
}

function nearestPointOnGeometry (geometry, pt, options) {
  return turf.nearestPointOnLine(geometry, pt, options)
}

module.exports = nearestPointOnGeometry
