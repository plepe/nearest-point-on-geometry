# nearest-point-on-geometry
Takes a point and a geometry (Point, Polygon, LineString, GeometryCollection, ...) and calculates the closest point on the geometry using turf. If the point lies within a polygon, it will return the point itself.

nearest-point-on-geometry mostly relies on @turf/nearest-point-on-line and accepts the same parameters.

## Usage
```js
const nearestPointOnGeometry = require('nearest-point-on-geometry')

let line = turf.lineString([
    [-77.031669, 38.878605],
    [-77.029609, 38.881946],
    [-77.020339, 38.884084],
    [-77.025661, 38.885821],
    [-77.021884, 38.889563],
    [-77.019824, 38.892368]
])
let pt = turf.point([-77.037076, 38.884017]);

let snapped = nearestPointOnGeometry(line, pt, {units: 'miles'})

console.log(snapped)
```

Result:
```json
{
    "type": "Feature",
    "properties": {
        "dist": 0.4239819718626291,
        "location": 0.2112562928240912,
        "index": 0
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            -77.02996941477018,
            38.88136146322953
        ]
    }
}
```
