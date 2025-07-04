import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Drawer } from "./components/drawer/Drawer";
import { Icon } from "./components/icon/Icon";

import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

import { PageContext } from "./services/contexts/PageContext";
import { Module } from "./pages/security/module/Module";
import { DialogContext } from "./services/contexts/DialogContext";
import { Role } from "Pages/security/roles/Role";
import { Permission } from "Pages/security/permission/Permission";
import { Task } from "Pages/management/task/Task";
import { EmployeeType } from "Pages/management/employee-type/EmployeeType";
import { Position } from "Pages/management/position/Position";
import { Benefits } from "Pages/management/benefit/Benefits";
// import Login from "./pages/Login";

// const AppLayout = (children: any) => {
//   return children;
// };

function App() {
  const location = useLocation();
  const [currentModule, setCurrentModule] = useState("");
  const [dialog, setDialog] = useState({ open: false });

  useEffect(() => {
    const split = location.pathname.split("/");
    setCurrentModule(split[split.length - 1]);
  }, [location]);

  return (
    <PageContext.Provider value={currentModule}>
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/" element={<AppLayout />}></Route> */}

      <div className="drawer lg:drawer-open">
        <input id="cb-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-100 shadow-sm lg:hidden">
            <label htmlFor="cb-drawer" className="btn drawer-button btn-ghost">
              <Icon icon="menu" classNames="text-center" />
            </label>
          </div>
          <main className="p-10">
            <h1 className="uppercase text-3xl font-bold my-2">
              {currentModule}
            </h1>

            <DialogContext.Provider value={{ dialog, setDialog }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Management */}
                <Route
                  path="management/employee-type"
                  element={<EmployeeType />}
                />
                <Route path="management/task" element={<Task />} />
                <Route path="management/position" element={<Position />} />
                <Route path="management/benefit" element={<Benefits />} />

                {/* Security */}
                <Route path="/security/modules" element={<Module />} />
                <Route path="/security/permissions" element={<Permission />} />
                <Route path="/security/roles" element={<Role />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </DialogContext.Provider>
          </main>
        </div>

        <Drawer />
      </div>
    </PageContext.Provider>
  );
}

export default App;
