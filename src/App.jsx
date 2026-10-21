import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AdmindashboardPage from "./pages/AdmindashboardPage";
import UserdashboardPage from "./pages/UserdashboardPage";
import RequestservicePage from "./pages/RequestservicePage";
import ServiceformPage from "./pages/ServiceformPage";
import MyrequestPage from "./pages/MyrequestPage";
import ManagerequestadminPage from "./pages/ManagerequestadminPage";
import ManageserviceadminPage from "./pages/ManageserviceadminPage";
import RequestdetailadminPage from "./pages/RequestdetailadminPage";
import OfflinePage from "./pages/OfflinePage";
import GetData from "./pages/GetData";

function RouteBodyClass() {
  const location = useLocation();

  useEffect(() => {
    document.body.className = `route-${location.pathname
      .replace(/^\//, "")
      .replace(/[^a-z0-9]+/gi, "-") || "home"}`;

    return () => {
      document.body.className = "";
    };
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Starting Firebase authentication listener...");

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Firebase auth state:", currentUser);

      try {
        if (currentUser) {
          setUser(currentUser);

          console.log("Checking Firestore role...");

          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            console.log("Firestore user data:", userData);

            setRole(userData.role || "user");
          } else {
            console.log("No user document found. Creating user document...");

            await setDoc(userRef, {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              role: "user",
              createdAt: serverTimestamp()
            });

            setRole("user");
          }
        } else {
          console.log("No Firebase user is currently logged in.");

          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Firebase/Firestore error:", error);

        setUser(null);
        setRole(null);
      } finally {
        console.log("Finished Firebase authentication check.");

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading Application State...</h2>;
  }

  return (
    <BrowserRouter>
      <RouteBodyClass />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              role === "admin" ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/user-dashboard" replace />
              )
            ) : (
              <IndexPage />
            )
          }
        />

        
        <Route
          path="/login"
          element={
            user ? (
              role === "admin" ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/user-dashboard" replace />
              )
            ) : (
              <LoginPage />
            )
          }
        />

       
        <Route
          path="/admin-dashboard"
          element={
            user && role === "admin" ? (
              <AdmindashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

       
        <Route
          path="/user-dashboard"
          element={
            user && role === "user" ? (
              <UserdashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

       
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/request-service" element={<RequestservicePage />} />
        <Route path="/service-form" element={<ServiceformPage />} />
        <Route path="/my-request" element={<MyrequestPage />} />
        <Route
          path="/manage-request-admin"
          element={<ManagerequestadminPage />}
        />
        <Route
          path="/manage-service-admin"
          element={<ManageserviceadminPage />}
        />
        <Route
          path="/request-detail-admin"
          element={<RequestdetailadminPage />}
        />
        <Route path="/offline" element={<OfflinePage />} />
        <Route path="/get-data" element={<GetData />} />

        
        <Route path="*" element={<IndexPage />} />

      </Routes>
    </BrowserRouter>
  );
}

