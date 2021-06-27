import {
    remove_user,
    set_user
} from "../action/user";

export const userReducer = (state = {}, action) => {
    let { type, data } = action
    switch (type) {
        case set_user:
            return data
        case remove_user:
            return {}
        default:
            return state
    }
}

export default userReducer