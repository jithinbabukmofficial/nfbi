export const update_balance = 'update_balance'
export const set_balance = 'set_balance'
export const remove_balance = 'remove_balance'


// redux function
export const updateBalance = data => ({ type: update_balance, data })
export const setBalance = data => ({ type: set_balance, data })
export const removeBalance = () => ({ type: remove_balance })