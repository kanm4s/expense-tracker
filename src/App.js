import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { TransactionContextProvider } from "./contexts/TransactionContext";
import Home from "./pages/Home";
import TransactionAction from "./pages/TransactionAction";

function App() {
    return (
        <TransactionContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="new" element={<TransactionAction />} />
                    <Route
                        path="transaction/:transactionId"
                        element={<TransactionAction />}
                    />
                    <Route index element={<Navigate to="/home" />} />
                </Route>
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </TransactionContextProvider>
    );
}

export default App;
