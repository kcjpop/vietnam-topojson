import province from '@kcjpop/vietnam-topojson-data/can-tho.json' assert { type: 'json' }
import municipalities from '@kcjpop/vietnam-topojson-data/can-tho-mun.json' assert { type: 'json' }

process.stdout.write(JSON.stringify({ province, municipalities }))
