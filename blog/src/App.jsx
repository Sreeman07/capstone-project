import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ FIXED

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AuthorProfile from "./components/AuthorProfile";
import AuthorArticles from "./components/AuthorArticles";
import EditArticle from "./components/EditArticle";
import WriteArticles from "./components/WriteArticles";
import ArticleByID from "./components/ArticleByID";
import { Toaster } from "react-hot-toast";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },

        { path: "register", element: <Register /> },

        { path: "login", element: <Login /> },

        //  USER ROUTE
        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },

        //  AUTHOR ROUTES
        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorProfile />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <AuthorArticles /> },
            { path: "articles", element: <AuthorArticles /> },
            { path: "write-article", element: <WriteArticles /> },
          ],
        },

        //  PROTECTED ARTICLE VIEW (USER + AUTHOR)
        {
          path: "article/:id",
          element: (
            <ProtectedRoute allowedRoles={["USER", "AUTHOR"]}>
              <ArticleByID />
            </ProtectedRoute>
          ),
        },

        //  PROTECTED EDIT
        {
          path: "edit-article",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },

        { path: "unauthorized", element: <Unauthorized /> },
      ],
    },
  ]);

  return (
    <div>
      <Toaster position="top-center" />
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;