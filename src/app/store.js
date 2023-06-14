import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

const logger = createLogger()
const middleware = (getDefalutMiddleware) => getDefalutMiddleware().concat(logger)

const store = configureStore({
    reducer: {},
    middleware: middleware
})

export default store;