const FETCH_TRANSACTION = "FETCH_TRANSACTION";

function transactionReducer(state, action) {
    switch (action.type) {
        case FETCH_TRANSACTION:
            // dispatch {type:FETCH_TRANSACTION, value: {transaction: [] } }
            return [...action.value.transactions];
        default:
            return state;
    }
}

export { transactionReducer, FETCH_TRANSACTION };
