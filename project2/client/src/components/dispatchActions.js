const { updateUserId } = require('../reducers/employeeSlice');

exports.dispatchUserId = (dispatch, userId) => {
    dispatch(updateUserId(userId));
};
