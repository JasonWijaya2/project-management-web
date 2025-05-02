import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ name }) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar name={name} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
