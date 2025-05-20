# nazerb# nazerb

### Process in creating a module

### Server side first.

1. Make sure that your module is already implemented in `server/prisma/schema.prisma` and is present in our postgreSQL
   If not, do `npx prisma generate` on your terminal
2. Create a controller under `server/controllers/` [moduleName]controller.js. (Rely on modulesController.js)
3. Create a new route under `server/routes/` and name it [module_name]Route.js (Rely on modulesRoutes.js)
4. Add the created line in `routes.js`
5. You can also create .rest file to test your server file if working.
   Go to server/app-request and create a new file named `[module_name].rest`, (Rely on module.rest for implementation)

### Client side

1. Check your module in the menu for its parent. If under management, create folder under management `client/pages/management` and create a tsx under that folder naming, `[module_name].tsx` (take note that we're naming it in a singular and the first letter to uppercase pattern)
2. Under the created folder, create also the needed files.
   - Interface
   - Action
   - Schema
3. If you'll create a management module, most likely, you just need a CRUD method. Rely on `client/security/module` files for fast implementation.
4. Add the module in `app.tsx` route. check below for sample.
   `<Route path="/management/module" element={<Module />} />`
5. Test your module!

### TAKE NOTE: server and client must be running.

# Server (Don't close this terminal)

1.  Open terminal
2.  From root folder, input `cd server`, enter.
3.  type `npm run dev`
4.  Server is now running. You should see.
    `Server has started and listening to PORT: 3000`

# Client (Don't close this terminal)

1. Add new tab or open another terminal
2. From root folder, input `cd client`, enter.
3. type `npm run dev`
4. Client is now running. You should see.

VITE v6.3.2 ready in 526 ms

➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
/_! 🌼 daisyUI 5.0.27 _/
