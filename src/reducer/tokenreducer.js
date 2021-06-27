import { remove_token, set_token } from "../action/token";

const tokenReducer = (state = {}, action) => {
    let { type, data } = action
    switch (type) {
        case set_token:
            return data
        case remove_token:
            return {}
        default:
            return state;
    }
}

export default tokenReducer