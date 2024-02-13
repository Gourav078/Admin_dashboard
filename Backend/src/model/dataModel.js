const mong = require("mongoose")
const dataSchema = new mong.Schema({
    
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
  });
  
  
    const DataModel = mong.model('Data', dataSchema);
  module.exports={
    DataModel
  }