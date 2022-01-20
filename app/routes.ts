import { Router } from "express";

import GetBusiness from "./controllers/getBusiness";
import UpdateBusiness from "./controllers/updateBusiness";

const routes = Router();

routes.get('/empresa/:cnpj', GetBusiness);
routes.put('/empresa/:cnpj', UpdateBusiness);

export default routes;