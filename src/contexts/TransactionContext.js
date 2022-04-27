import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import {
    transactionReducer,
    FETCH_TRANSACTION,
} from "../reducers/transactionReducer";

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
    const [state, dispatch] = useReducer(transactionReducer, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/transactions")
            .then((res) => {
                dispatch({
                    type: FETCH_TRANSACTION,
                    value: { transactions: res.data.transactions },
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions: state }}>
            {children}
        </TransactionContext.Provider>
    );
}

export { TransactionContext, TransactionContextProvider };
