export const FETCH_TRANSACTION = "FETCH_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

export function transactionReducer(state, action) {
    switch (action.type) {
        case FETCH_TRANSACTION:
            // dispatch {type:FETCH_TRANSACTION, value: {transaction: [] } }
            return [...action.value.transactions];
        case DELETE_TRANSACTION:
            // dispatch ({type: DELETE_TRANSACTION, value: {id : 'asdfsdfdsafdsfsadf-asdfsadf-sadfasd-f-sdf-sad-fsdf'}})
            const idx = state.findIndex((ele) => ele.id === action.value.id);
            if (idx !== -1) {
                const cloneState = [...state];
                cloneState.splice(idx, 1);
                return cloneState;
            }
            return;
        default:
            return state;
    }
}
