import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
