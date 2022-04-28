import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import Transaction from "./Transaction";

export default function TransactionList() {
    const { transactions } = useContext(TransactionContext);
    return (
        <ul className="list-group">
            {transactions.map((ele) => (
                <Transaction key={ele.id} transaction={ele} />
            ))}
        </ul>
    );
}
