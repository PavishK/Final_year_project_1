import React from "react";
import { Outlet, Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="home">Dashboard</Link></li>
          <li><Link to="manageuser">Manage Users</Link></li>
          <li><Link to="managecourses">Manage Courses</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* Renders the matched child route */}
    </div>
  );
};

export default Admin;
