const pool = require('../DB/mysql2DB')

const listCustomer = async (req,  res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `customer`");

    console.log("Data", rows);
    
    if (!rows) {
        return res.status(400)
          .json({
            success: false,
            data: null,
            message: "Error"
          })
      }
  
      return res.status(200)
        .json({
          success: true,
          data: rows,
          message: "All Product List Succesfully"
        })

  } catch (error) {
    console.log(error);
    
  }
};

const addCustomer = async (req, res) => {
    try {

        const {cname, city, rating, snum} = req.body
      const Data = await pool.query("INSERT INTO customer (cname, city, rating, snum) VALUES (?, ?, ?, ?)" [cname, city, rating, snum]) ;
  
      console.log("Data", Data);
      
     
    
        return res.status(201)
          .json({
            success: true,
            data: Data,
            message: "All Product Add Succesfully"
          })
  
    } catch (error) {
      console.log(error);
      
    }
  };

module.exports = {
    listCustomer,
    addCustomer
}