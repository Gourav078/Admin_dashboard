const {DataModel} = require("../model/dataModel.js");

const getAlldata = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
};

module.exports ={ getAlldata };
