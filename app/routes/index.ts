import e from "express"
import { embedByInput, embedByParams } from "../controllers";

const setRouter = (app:e.Express) => {

    const router = e.Router();

    router.get("/params",embedByParams)
    router.get("/input",embedByInput)

    app.use("/embed", router)
    
}

export default setRouter