import got from 'got'
import slugify from 'slugify'
import convert from 'osmtogeojson'
import mapshaper from 'mapshaper'
import { writeFile } from 'node:fs/promises'

import { regions } from './constants.js'

async function fetchLevel6(provinceId) {
  const data = `[out:json][timeout:25];

relation(${provinceId});
rel(r:"subarea");
out geom;`

  return await got
    .get(new URL(`https://overpass-api.de/api/interpreter?data=${data}`))
    .json()
}

async function fetchLevel8(provinceId) {
  const data = `[out:json][timeout:25];

relation(${provinceId});
rel(r:"subarea");
foreach {
  (
    rel(r:"subarea");
  );
  out geom;
}
out geom;`

  return await got
    .get(new URL(`https://overpass-api.de/api/interpreter?data=${data}`))
    .json()
}

function write(filename, geojson) {
  const target = new URL(`./data/${filename}`, import.meta.url)
  return writeFile(target.pathname, JSON.stringify(geojson))
}

for (const [provinceId, provinceName] of Object.entries(regions.mekong)) {
  const province = slugify(provinceName, { lower: true })

  console.log(`Fetching province: ${provinceName}`)
  const level6 = convert(await fetchLevel6(provinceId))

  console.log(`Fetching province with municipalities: ${provinceName}`)
  const level8 = convert(await fetchLevel8(provinceId))

  console.log(`Writing geojson…`)
  await write(province + '.geojson', level6)
  await write(province + '-mun.geojson', level8)
}
