import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { DELETE_TRANSACTION } from "../reducers/transactionReducer";

const INCOME = "INCOME";
const EXPENSE = "EXPENSE";

function TransactionForm() {
    const [transaction, setTransaction] = useState({});
    const [notFoundError, setNotFoundError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryType, setCategoryType] = useState(EXPENSE);
    const [payeeInput, setPayeeInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    const [dateInput, setDateInput] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const { dispatch } = useContext(TransactionContext);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.transactionId) {
            axios
                .get(
                    "http://localhost:8080/transactions/" + params.transactionId
                )
                .then((res) => {
                    if (res.data.transaction === null) {
                        setNotFoundError(true);
                    } else {
                        setTransaction(res.data.transaction);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setNotFoundError(true);
                });
        }
    }, [params.transactionId]);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get("http://localhost:8080/categories/");
            setCategories(res.data.categories);
            setCategoryId(res.data.categories[0].id);
        };
        fetchCategory();
    }, []);

    const location = useLocation();

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        // create transaction completed
        await axios.post("http://localhost:8080/transactions", {
            payee: payeeInput,
            amount: Number(amountInput),
            date: dateInput,
            categoryId: categoryId,
        });

        navigate("/home");
    };

    const handleClickDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                "http://localhost:8080/transactions/" + params.transactionId
            );
            dispatch({
                type: DELETE_TRANSACTION,
                value: { id: params.transactionId },
            });
            setLoading(false);
            navigate("/home");
        } catch (err) {}
    };

    const filteredCategories = categories.filter(
        (ele) => ele.type === categoryType
    );

    if (notFoundError)
        return <h1 className="text-white">Transaction is not found</h1>;

    return (
        <>
            <div className="border bg-white rounded-2 p-3">
                <form className="row g-3" onSubmit={handleSubmitForm}>
                    <div className="col-6">
                        <input
                            type="radio"
                            className="btn-check"
                            id="cbx-expense"
                            name="type"
                            defaultChecked
                            onChange={() => {
                                setCategoryType(EXPENSE);
                            }}
                        />
                        <label
                            className="btn btn-outline-danger rounded-0 rounded-start"
                            htmlFor="cbx-expense"
                        >
                            Expense
                        </label>
                        <input
                            type="radio"
                            className="btn-check"
                            id="cbx-income"
                            name="type"
                            onChange={() => setCategoryType(INCOME)}
                        />
                        <label
                            className="btn btn-outline-success rounded-0 rounded-end"
                            htmlFor="cbx-income"
                        >
                            Income
                        </label>
                    </div>

                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <i className="fa-solid fa-xmark" role="button" />
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">Payee</label>
                        <input
                            className="form-control"
                            type="text"
                            value={payeeInput}
                            onChange={(e) => setPayeeInput(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {filteredCategories.map((ele) => (
                                <option key={ele.id} value={ele.id}>
                                    {ele.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">Amount</label>
                        <input
                            className="form-control"
                            type="text"
                            value={amountInput}
                            onChange={(e) => setAmountInput(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <div className="d-grid mt-3">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            {params.transactionId && (
                <div className="d-grid mt-5">
                    <button
                        className="btn btn-danger"
                        onClick={handleClickDelete}
                        disabled={loading}
                    >
                        Delete Transaction
                    </button>
                </div>
            )}
        </>
    );
}

export default TransactionForm;
