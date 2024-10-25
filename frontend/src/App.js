import "./App.css";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='/login' />}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/signup' Component={SignUp}></Route>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard></Dashboard>
                        </ProtectedRoute>
                    }
                ></Route>
            </Routes>
        </Router>
    );
};

export default App;
