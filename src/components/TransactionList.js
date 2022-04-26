import React from "react";
import Transaction from "./Transaction";

export default function TransactionList() {
    return (
        <ul className="list-group">
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
        </ul>
    );
}
