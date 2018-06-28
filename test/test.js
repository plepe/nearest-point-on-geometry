const nearestPointOnGeometry = require('../src/nearestPointOnGeometry')
const fs = require('fs')
const chai = require('chai')
const chaiAlmost = require('chai-almost')
chai.use(chaiAlmost())

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

    chai.expect(actual).to.be.deep.almost(expected)
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

    chai.expect(actual).to.be.deep.almost(expected)
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

    chai.expect(actual).to.be.deep.almost(expected)
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

    chai.expect(actual).to.be.deep.almost(expected)
  })
})

describe('MultiLineString', function () {
  // Source: © OpenStreetMap contributors
  let inputGeom = JSON.parse(fs.readFileSync('test/inputs/r163465.json'))

  it ('1', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3291285, 48.2027968 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 0.04707428477293389,
        "index": 29,
        "location": 1.3351649549618807
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.329760420272503, 48.202753931180844 ]

      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    chai.expect(actual).to.be.deep.almost(expected)
  })
})

describe('Polygon', function () {
  // Source: © OpenStreetMap contributors
  let inputGeom = JSON.parse(fs.readFileSync('test/inputs/w24867729.json'))

  it ('outer', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3305369, 48.1972988 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 0.04738346135585843,
        "index": 5,
        "location": 0.14028363679620684
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3308994, 48.1976498 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    chai.expect(actual).to.be.deep.almost(expected)
  })

  it ('inner', function () {
    let inputPt = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3311103, 48.1983119 ]
      }
    }
    let expected = {
      "type": "Feature",
      "properties": {
        "dist": 0,
        "location": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 16.3311103, 48.1983119 ]
      }
    }

    let actual = nearestPointOnGeometry(inputGeom, inputPt)

    chai.expect(actual).to.be.deep.almost(expected)
  })
})
