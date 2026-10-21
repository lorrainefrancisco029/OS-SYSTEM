import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import AdminOverview from "./AdminOverview";
import ManagerequestadminPage from "./ManagerequestadminPage";
import ManageserviceadminPage from "./ManageserviceadminPage";
import RequestdetailadminPage from "./RequestdetailadminPage";

export default function AdmindashboardPage() {
  const [activePage, setActivePage] = useState("overview");

  const renderContent = () => {
    switch (activePage) {
      case "manage-requests":
        return (
          <ManagerequestadminPage
            onViewRequest={() => setActivePage("view-requests")}
            onBack={() => setActivePage("overview")}
          />
        );
      case "view-requests":
        return <RequestdetailadminPage onBack={() => setActivePage("manage-requests")} />;
      case "manage-services":
        return <ManageserviceadminPage onBack={() => setActivePage("overview")} />;
      case "overview":
      default:
        return <AdminOverview />;
    }
  };

  return (
    <DashboardLayout
      role="admin"
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
