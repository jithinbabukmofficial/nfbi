export const set_token = 'set_token'
export const remove_token = 'remove_token'






//actions
export const setToken = data => ({
    type: set_token,
    data
})

export const removeToken = () => ({
    type: remove_token
})