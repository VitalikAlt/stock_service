module.exports = {
    sign_in: require('../handlers/SignIn'),
    reset_admin: require('../handlers/ResetAdmin'),

    add_users: require('./../handlers/users/Add'),
    update_users: require('./../handlers/users/Update'),
    delete_users: require('./../handlers/users/Delete'),
    lookup_users: require('../handlers/users/Lookup'),

    add_items: require('./../handlers/items/Add'),
    update_items: require('./../handlers/items/Update'),
    delete_items: require('./../handlers/items/Delete'),
    lookup_items: require('./../handlers/items/Lookup'),

    add_reserves: require('./../handlers/reserves/Add'),
    update_reserves: require('./../handlers/reserves/Update'),
    delete_reserves: require('./../handlers/reserves/Delete'),
    lookup_reserves: require('./../handlers/reserves/Lookup'),
    lookup_paid_reserves: require('./../handlers/reserves/LookupPaid'),

    add_workshop_reserves: require('./../handlers/workshop_reserves/Add'),
    update_workshop_reserves: require('./../handlers/workshop_reserves/Update'),
    delete_workshop_reserves: require('./../handlers/workshop_reserves/Delete'),
    lookup_workshop_reserves: require('./../handlers/workshop_reserves/Lookup'),
};