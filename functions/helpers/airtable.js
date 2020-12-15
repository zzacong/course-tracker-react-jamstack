const path = require('path')
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

const Airtable = require('airtable')

// * create Airtable configuration
const config = {
  apiKey: process.env.AIRTABLE_APIKEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  table: process.env.AIRTABLE_TABLE,
}

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId)
const table = base(config.table)

module.exports = { table }
