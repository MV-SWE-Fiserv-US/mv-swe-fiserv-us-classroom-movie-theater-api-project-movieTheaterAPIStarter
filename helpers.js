const findAllOrFail = async (Model, errorMsg, extra = undefined) => {
  const instance = await Model.findAll(extra);
  if (!instance) {
    const error = new Error(errorMsg);
    error.status = 404;
    throw error;
  }
  return instance;
};

const findModelOrFail = async (Model, id, errorMsg, extra = undefined) => {
  const instance = await Model.findByPk(id, extra);
  if (!instance) {
    const error = new Error(errorMsg);
    error.status = 404;
    throw error;
  }
  return instance;
};

module.exports = { findAllOrFail, findModelOrFail };
