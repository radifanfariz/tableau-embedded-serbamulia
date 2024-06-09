import e from "express"
import { embedByInput, embedByParams, embedByParamsFinancialModel, embedByParamsLimitedV1, embedByParamsLimitedV2, embedByParamsLimitedV3 } from "../controllers";

const setRouter = (app:e.Express) => {

    const router = e.Router();

    router.get("/params",embedByParams)
    router.get("/params/limited/v1",embedByParamsLimitedV1)
    router.get("/params/limited/v2",embedByParamsLimitedV2)
    router.get("/params/limited/v3",embedByParamsLimitedV3)
    router.get("/input",embedByInput)
    router.get("/financialmodel/params",embedByParamsFinancialModel)

    app.use("/embed", router)
    
}

export default setRouter