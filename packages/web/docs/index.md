---
toc: false
---

# Vietnam TopoJSON

```js
import geo from 'npm:d3-geo'

const { province: file, municipalities: sub } =
  await FileAttachment('data/can-tho.json').json()
display(file)

const projection = Object.assign({}, { type: 'mercator' })
const styles = Object.assign({}, { fill: '#fcfcfc', stroke: '#ccc' })
const opts = Object.assign({}, { width: 800, height: 800 })

const textAtCenter = (obj, text) => {
  const [x, y] = d3.geoCentroid(obj)
  return { x, y, text }
}
```

```js
// vl.markGeoshape({
//   stroke: '#aaa',
//   fill: '#fff',
//   strokeWidth: 1,
// })
//   .data(vl.topojson(thuanAn).feature('centers'))
//   .width(1000)
//   .height(1000)
//   .config({ projection: { type: 'mercator' } })
//   .render()
```

Thông tin căn bản

## Thành phố, thị xã, quận, huyện

```js
const districts = topojson.feature(file, file.objects.districts)

const centers = topojson
  .feature(file, file.objects.centers)
  .features.map((d) => {
    const text = _.get(d, 'id')
    const [x, y] = d.geometry.coordinates

    return { x, y, text }
  })
```

```js
Plot.plot({
  ...opts,
  projection: {
    ...projection,
    domain: districts,
  },
  marks: [
    Plot.geo(districts, { fill: 'id' }),
    Plot.dot(centers, {
      x: 'x',
      y: 'y',
      fill: '#444',
    }),
    Plot.text(centers, {
      x: 'x',
      y: 'y',
      text: 'text',
      fill: '#fff',
      stroke: '#333',
      strokeWidth: 2,
      fontWeight: 600,
      dy: -10,
      fontSize: 12,
    }),
  ],
})
```

## Phường, xã, thị trấn

```js
display(sub)
const d = topojson.feature(sub, sub.objects.districts)

const c = topojson.feature(sub, sub.objects.centers).features.map((d) => {
  const text = _.get(d, 'properties.@relations[0].reltags.name')
  const [x, y] = d.geometry.coordinates

  return { x, y, text }
})
```

```js
Plot.plot({
  ...opts,
  projection: {
    ...projection,
    domain: d,
  },
  marks: [
    Plot.geo(d, { fill: 'id' }),
    Plot.dot(c, {
      x: 'x',
      y: 'y',
      fill: '#444',
    }),
    Plot.text(c, {
      x: 'x',
      y: 'y',
      text: 'text',
      fill: '#fff',
      stroke: '#333',
      strokeWidth: 2,
      fontWeight: 600,
      dy: -10,
      fontSize: 12,
    }),
  ],
})
```
