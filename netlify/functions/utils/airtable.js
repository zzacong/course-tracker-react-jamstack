const Airtable = require('airtable')

// * create Airtable configuration
const config = {
  apiKey: process.env.AIRTABLE_APIKEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  table: process.env.AIRTABLE_TABLE,
}

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId)
export const table = base(config.table)
