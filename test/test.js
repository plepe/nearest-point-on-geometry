const nearestPointOnGeometry = require('../src/nearestPointOnGeometry')
const assert = require('assert')
const fs = require('fs')

describe('Line1', function () {
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

  it ('1', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 11, 11 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 110.26078777700333,
        "location": 95.77796570566463,
        "index": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10, 10.861350749552146 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    assert.deepEqual(actual, expected)
  })

  it ('2', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 11, 11 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 110.26078777700333,
        "location": 95.77796570566463,
        "index": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10, 10.861350749552146 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    assert.deepEqual(actual, expected)
  })
})

describe('Line2', function () {
  // Source: © OpenStreetMap contributors
  let inputGeom = JSON.parse(fs.readFileSync('test/inputs/w29074985.json'))

  it ('1', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3441138, 48.1906075 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 0.014454011694039613,
        "location": 0.011256207004934349,
        "index": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.344180956600606, 48.19072953472854]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    assert.deepEqual(actual, expected)
  })

  it ('2', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3453122, 48.1918759 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 0.12873819094065436,
        "location": 0.13198731534777547,
        "index": 5
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.34575523213101, 48.19075643600322 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    assert.deepEqual(actual, expected)
  })
})
