//main
import Dashboard from "../MainPage/Main/Dashboard";
//UI Interface
import UIinterface from "../MainPage/UIinterface";
//Pages
import ProfilePage from "../MainPage/Pages/Profile";
import Subscription from "../MainPage/Pages/Subscription";
import Pages from "../MainPage/Pages/Pages";

//Employees
import Employees from "../MainPage/Employees";
import Projects from "../MainPage/Employees/Projects";
import Employee from "../MainPage/Employees/Employees";
import ProjectList from "../MainPage/Employees/Projects/projectlist";

export default [
  {
    path: "main",
    component: Dashboard,
  },

  {
    path: "employee",
    component: Employee,
  },
  {
    path: "employees",
    component: Employees,
  },
  {
    path: "projects",
    component: Projects,
  },
  {
    path: "ui-interface",
    component: UIinterface,
  },
  {
    path: "profile",
    component: ProfilePage,
  },
  {
    path: "subscription",
    component: Subscription,
  },
  {
    path: "pages",
    component: Pages,
  },

  {
    path: "projectlist",
    component: ProjectList,
  },
];
