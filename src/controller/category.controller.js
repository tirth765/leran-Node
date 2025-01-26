const getCategores = (req, res) => {
  try {
    res.send("get categores");
  } catch (error) {
    console.log(error);
  }
};

const postCategores = (req, res) => {
  try {
    res.send("post category");
  } catch (error) {
    console.log(error);
  }
};

const putCategores = (req, res) => {
  try {
    res.send("put category");
  } catch (error) {
    console.log(error);
  }
};

const deleteCategores = (req, res) => {
  try {
    res.send("delete category");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategores,
  postCategores,
  putCategores,
  deleteCategores
};
