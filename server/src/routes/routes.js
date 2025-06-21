import express from "express";

// user security routes
import moduleRoute from "./moduleRoutes.js";
import roleRoutes from "./roleRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import userRoutes from "./userRoutes.js";

// management routes
import benefitRoutes from "./benefitRoutes.js";
import positionRoutes from "./positionRoutes.js";
import employeeTypeRoutes from "./employeeTypeRoutes.js";
import taskRoutes from "./taskRoutes.js";

const routes = express.Router();
// Define the routes for the application
routes.use("/security/modules", moduleRoute);
routes.use("/security/roles", roleRoutes);
routes.use("/security/permissions", permissionRoutes);
routes.use("/security/user", userRoutes);

routes.use("/management/employee-type", employeeTypeRoutes);
routes.use("/management/task", taskRoutes);
routes.use("/management/benefit", benefitRoutes);
routes.use("/management/position", positionRoutes);

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
