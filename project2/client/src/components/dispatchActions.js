const { updateUserId } = await import('../../client/src/components/dispatchActions.js');

exports.dispatchUserId = (dispatch, userId) => {
    dispatch(updateUserId(userId));
};
