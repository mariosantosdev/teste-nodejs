import { Router } from "express";

import GetBusiness from "./controllers/getBusiness";

const routes = Router();

routes.get('/empresa/:cnpj', GetBusiness);

export default routes;