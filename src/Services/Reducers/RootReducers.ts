import { combineReducers } from "redux";

import SignUpReducers from "./SignUp/SignUpReducers";
import SignInReducer from "./Login/SignInReducers";
import OTPReducers from "./OTP/OTPReducers";
import StockReducers from "./Stocks/StocksReducers";
import ConstantReducers from "./Constant/ConstantReducers";
import BusinessReducers from "./Business/BusinessReducers";
const RootReducer = combineReducers({
    SignUpReducers,
    SignInReducer,
    OTPReducers,
    StockReducers,
    ConstantReducers,
    BusinessReducers
});

export default RootReducer;