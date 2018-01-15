module.exports = {
    sign_in: require('./../handlers/users/SignIn'),
    user_list: require('./../handlers/users/List'),
    reset_admin: require('./../handlers/users/ResetAdmin'),
    user_add: require('./../handlers/users/Add'),
    user_delete: require('./../handlers/users/Delete'),
    user_update: require('./../handlers/users/Update')
};