const getsubCategores = (req, res) => {
    try {
      res.send("get subcategores");
    } catch (error) {
      console.log(error);
    }
  };
  
  const postsubCategores = (req, res) => {
    try {
      res.send("post subcategory");
    } catch (error) {
      console.log(error);
    }
  };
  
  const putsubCategores = (req, res) => {
    try {
      res.send("put subcategory");
    } catch (error) {
      console.log(error);
    }
  };
  
  const deletesubCategores = (req, res) => {
    try {
      res.send("delete subcategory");
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {
    getsubCategores,
    postsubCategores,
    putsubCategores,
    deletesubCategores
  };