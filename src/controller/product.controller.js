const getproducts = (req, res) => {
    try {
      res.send("get product");
    } catch (error) {
      console.log(error);
    }
  };
  const postproduct = (req, res) => {
    try {
      res.send("post product");
    } catch (error) {
      console.log(error);
    }
  };
  const putproduct = (req, res) => {
    try {
      res.send("put product");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteproduct = (req, res) => {
    try {
      res.send("delete product");
    } catch (error) {
      console.log(error);
    }
  };


  module.exports = {
    getproducts,
    postproduct,
    putproduct,
    deleteproduct
  }