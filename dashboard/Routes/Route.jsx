import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import HealthCoachesDashboard from "../pages/HealthCoaches/HealthCoachesDashboard/HealthCoachesDashboard";
import NotFound from "../pages/NotFound";
import Participant from "../pages/HealthCoaches/Participant/Participant";
import CreateNewParticipant from "../pages/HealthCoaches/Participant/CreateNewParticipant/CreateNewParticipant";
import RecordManagementAdmin from "../pages/HealthCoaches/RecordManagementAdmin/RecordManagementAdmin";
import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard/SuperAdminDashboard";
import CompanyConsentSetup from "../pages/superAdmin/Company/Company";
import AddNewConsents from "../pages/superAdmin/AddNewConsents/AddNewConsents";
import CreateNewCompany from "../pages/superAdmin/Company/CreateNewCompany/CreateNewCompany";
import UserManagementSetup from "../pages/superAdmin/UserManagementSetup/UserManagementSetup";
import CreateNewUser from "../pages/superAdmin/UserManagementSetup/CreateNewUser/CreateNewUser";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ConsentStatementInformation from "../pages/superAdmin/ConsentSetup/ConsentStatementInformation/ConsentStatementInformation";
import ConsentSetup from "../pages/superAdmin/ConsentSetup/ConsentSetup";
import NewsAndFeatures from "../pages/superAdmin/NewsAndFeatures/NewsAndFeatures";
import CreateNewsAndFeatures from "../pages/superAdmin/NewsAndFeatures/CreateNewsAndFeatures/CreateNewsAndFeatures";
import ReportSystem from "../pages/superAdmin/ReportSystem/ReportSystem";

// Encounters Page
import Encounters from "../pages/superAdmin/Encounters/Encounters";
import AddNewEncounter from '../components/Encounters/AddNewEncounter';
import SelectEncounter from "../components/Encounters/SelectEncounter";
import ModifyEncounter from "../components/Encounters/ModifyEncounter/ModifyEncounter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { 
        index: true, 
        element: <Login />
      },
      { path: "login", element: <Login /> }
    ],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={["healthcoaches"]} />,
        children: [
          {
            path: "health-coach-dashboard",
            element: <HealthCoachesDashboard />,
          },
          {
            path: "record-management-admin",
            element: <RecordManagementAdmin />,
          },
        ],
      },

      // Dashboards: only superadmin and admin can access respective dashboards
      {
        element: <ProtectedRoute allowedRoles={["superadmin", "admin"]} />,
        children: [
          { path: "super-admin-dashboard", element: <SuperAdminDashboard /> },
          { path: "admin-dashboard", element: <SuperAdminDashboard /> },
        ],
      },

      // Core management pages: allow superadmin, admin and healthcoaches
      {
        element: (
          <ProtectedRoute allowedRoles={["healthcoaches", "superadmin", "admin"]} />
        ),
        children: [
          { path: "company", element: <CompanyConsentSetup /> },
          { path: "add-new-consents", element: <AddNewConsents /> },
          { path: "create-new-company", element: <CreateNewCompany /> },
          { path: "consent", element: <ConsentStatementInformation /> },
          {
            path: "create_consent",
            element: <ConsentSetup />,
          },
          { path: "news-and-features", element: <NewsAndFeatures /> },
          { path: "create-news-feature", element: <CreateNewsAndFeatures /> },
          { path: "report-system", element: <ReportSystem /> },
          { path: "encounters", element: <Encounters /> },
          { path: "create-new-encounter", element: <AddNewEncounter /> },
          { path: "select-encounter", element: <SelectEncounter /> },
          { path: "modify-encounter", element: <ModifyEncounter /> },
        ],
      },

      // User management: only superadmin and admin
      {
        element: <ProtectedRoute allowedRoles={["superadmin", "admin"]} />,
        children: [
          { path: "user-management-setup", element: <UserManagementSetup /> },
          { path: "create-new-user", element: <CreateNewUser /> },
          { path: "manage-user/:id", element: <CreateNewUser /> },
        ],
      },

      {
        element: (
          <ProtectedRoute
            allowedRoles={["healthcoaches", "superadmin", "admin"]}
          />
        ),
        children: [
          { path: "participant", element: <Participant /> },
          { path: "create-new-participant", element: <CreateNewParticipant /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
