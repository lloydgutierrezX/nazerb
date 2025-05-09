import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Drawer } from "./components/drawer/Drawer";
import { Icon } from "./components/icon/Icon";

import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

import { PageContext } from "./services/context/page/PageContext";
import { Module } from "./pages/security/Module";
// import Login from "./pages/Login";

// const AppLayout = (children: any) => {
//   return children;
// };

function App() {
  const location = useLocation();
  const [currentModule, setCurrentModule] = useState("");

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
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/security/modules" element={<Module />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <Drawer />
      </div>
    </PageContext.Provider>
  );
}

export default App;
