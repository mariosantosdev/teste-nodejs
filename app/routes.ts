import { Router } from "express";

import GetBusiness from "./controllers/getBusiness";
import UpdateBusiness from "./controllers/updateBusiness";
import DeleteBusiness from "./controllers/deleteBusiness";

const routes = Router();

routes.get('/empresa/:cnpj', GetBusiness);
routes.put('/empresa/:cnpj', UpdateBusiness);
routes.delete('/empresa/:cnpj', DeleteBusiness);

export default routes;