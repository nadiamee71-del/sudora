const KEY='sudora_db_v1'

export function read(){ try{ return JSON.parse(localStorage.getItem(KEY))||{} }catch{ return {} } }

export function write(db){ localStorage.setItem(KEY, JSON.stringify(db)) }

export function ensure(seed){
  const db = read()
  if(!db.activities){ db.activities = seed.activities; write(db) }
  return read()
}

