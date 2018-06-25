const nearestPointOnGeometry = require('../src/nearestPointOnGeometry')
const assert = require('assert')

describe('Line', function () {
  it ('1', function () {
    let inputGeom = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [ 10, 10 ],
          [ 10, 20 ]
        ]
      }
    }
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 11, 11 ]
      }
    }
    let expected = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 11, 11 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    console.log(JSON.stringify(actual, null, '  '))
    assert(actual, expected)
  })
})
