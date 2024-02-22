import got from 'got'
import { writeFile } from 'node:fs/promises'

import { regions } from './constants.js'

async function fetchRelation(relationId) {
  const res = await got
    .get(`https://www.openstreetmap.org/api/0.6/relation/${relationId}.json`)
    .json()

  return res.elements[0]
}

async function fetchMultipleRelations(relationIds) {
  if (relationIds.length === 0) return

  const ids = relationIds.join(',')

  return await got
    .get(`https://www.openstreetmap.org/api/0.6/relations?relations=${ids}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    .json()
}

function extractRelationToPair(relation, subareas) {
  return [
    relation.id,
    {
      id: relation.id,
      name: relation.tags.name,
      tags: relation.tags,
      subareas,
    },
  ]
}

function getSubareaIds(coll) {
  return coll
    .filter((d) => d.type === 'relation' && d.role === 'subarea')
    .map((d) => d.ref)
}

async function handleLevel6(level6) {
  const level8 = await fetchMultipleRelations(getSubareaIds(level6.members))

  const subareas =
    level8 !== undefined
      ? Object.fromEntries(
          level8.elements.map((el) => extractRelationToPair(el)),
        )
      : undefined

  return extractRelationToPair(level6, subareas)
}

async function constructProvinceMetaMap(province) {
  const level6 = await fetchMultipleRelations(getSubareaIds(province.members))

  const entries = []
  for (const relation of level6.elements) {
    const area = await handleLevel6(relation)
    entries.push(area)
  }

  return Object.fromEntries(entries)
}

async function collectRegion(region) {
  const res = {}

  for (const [id] of Object.entries(region)) {
    const province = await fetchRelation(id)
    const map = await constructProvinceMetaMap(province)
    res[id] = { name: province.tags.name, tags: province.tags, sub: map }
  }

  return res
}

for (const [name, region] of Object.entries(regions)) {
  console.log(`Fetching data for ${name}`)
  const content = await collectRegion(region)
  console.log(`Writing data…`)
  await writeFile(`./meta/${name}.json`, JSON.stringify(content))
}
