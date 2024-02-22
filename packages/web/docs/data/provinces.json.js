import Database from 'better-sqlite3'

const dbPath = new URL('./whosonfirst-data-admin-vn-latest.db', import.meta.url)
  .pathname
const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

const query = `select id, body
from geojson
where id in (select id from spr where parent_id = 85680735)
order by id asc;`

const stm = db.prepare(query)
const rows = stm.all()
const data = rows.map((row) => ({ id: row.id, geojson: JSON.parse(row.body) }))

process.stdout.write(JSON.stringify(data))
