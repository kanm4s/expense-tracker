import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
    return (
        <div>
            <Header />
            <TransactionForm />
            <TransactionList />
        </div>
    );
}

export default App;
