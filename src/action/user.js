export const set_user = 'set_user'
export const remove_user = 'remove_user'



//actions
export const setUser = data => ({
    type: set_user,
    data
})

export const removeUser = () => ({
    type: remove_user
})