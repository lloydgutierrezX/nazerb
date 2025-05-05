import express from "express";
import moduleRoute from "./moduleRoutes.js";
import roleRoutes from "./roleRoutes.js";
import permissionRoutes from "./permissionRoutes.js";

const routes = express.Router();
// Define the routes for the application
routes.use("/modules", moduleRoute);
routes.use("/roles", roleRoutes);
routes.use("/permissions", permissionRoutes);

export default routes;

// @error    400 - Bad Request
// @error    500 - Internal Server Error
// @error    409 - Conflict
// @error    401 - Unauthorized
// @error    403 - Forbidden
// @error    404 - Not Found
// @error    422 - Unprocessable Entity
// @error    429 - Too Many Requests
// @error    501 - Not Implemented
// @error    503 - Service Unavailable
// @error    504 - Gateway Timeout
// @error    511 - Network Authentication Required
