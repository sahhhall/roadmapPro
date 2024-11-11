import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "@/layout/UserLayout";
import AdminProtected from "@/router/protected/AdminProtected";
import UserProtected from "@/router/protected/UserProtected";
import RedirectLoggedIn from "@/router/protected/RedirectLoggedIn";
import NotFound from "@/pages/NotFound";
import RoadMapMangment from "@/features/admin/pages/RoadMapMangment";
import WrappedDnDFlow from "@/features/roadmaps/pages/Flow";
import GeneralPage from "@/features/user/pages/GeneralPage";
import { ProfileLayout } from "@/features/user/layout/ProfileLayout";

const Home = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/pages/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("@/features/auth/pages/Forgotpassword")
);
const Resetpassword = lazy(() => import("@/features/auth/pages/Resetpassword"));
const AdminLoginPage = lazy(() => import("@/features/admin/pages/LoginPage"));
const AdminDashBoard = lazy(() => import("@/features/admin/pages/DashBoard"));
const AdminLayout = lazy(() => import("@/features/admin/layout/AdminLayout"));
const UserManagment = lazy(
  () => import("@/features/admin/pages/UserManagment")
);
const RoadmapUserView = lazy(
  () => import("@/features/roadmaps/pages/RoadmapUserView")
);
const AssessmentManagment = lazy(
  () => import("@/features/admin/pages/AssessmentManagment")
);
const QuestionList = lazy(
  () => import("@/features/admin/pages/QuestionListPage")
);
const AssessmentPage = lazy(
  () => import("@/features/user/pages/AssessmentPage")
);

const MentorListing = lazy(
  () => import("@/features/mentor/pages/MentorListing")
);
const MentorProfile = lazy(() => import("@/features/mentor/pages/MentorProfilePublicView"));
const RoadMapProfie = lazy(()=> import("@/features/user/pages/RoadmapsPage"))
const BookingsPage = lazy(() => import("@/features/user/pages/BookingsPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/roadmap/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RoadmapUserView />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <SignupPage />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <ForgotPasswordPage />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <Resetpassword />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserProtected>
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileLayout />
            </Suspense>
          </UserProtected>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <GeneralPage />
              </Suspense>
            ),
          },
          {
            path: "general",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <GeneralPage />
              </Suspense>
            ),
          },
          {
            path: "roadmaps",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <RoadMapProfie/>
              </Suspense>
            ),
          },
          {
            path: "bookings",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <BookingsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/assessment/:id",
        element: (
          <UserProtected>
            <Suspense fallback={<div>Loading...</div>}>
              <AssessmentPage />
            </Suspense>
          </UserProtected>
        ),
      },
      {
        path: "/explore-mentors",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MentorListing />
          </Suspense>
        ),
      },
      {
        path: "/mentor-profile/:mentorId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MentorProfile />
          </Suspense>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <Suspense fallback={<div>loading..</div>}>
            <>payment success</>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/",
    element: (
      <AdminProtected>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLayout />
        </Suspense>
      </AdminProtected>
    ),
    children: [
      {
        path: "/admin/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashBoard />
          </Suspense>
        ),
      },
      {
        path: "/admin/user-management",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserManagment />
          </Suspense>
        ),
      },
      {
        path: "/admin/roadmap-management",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RoadMapMangment />
          </Suspense>
        ),
      },
      {
        path: "/admin/assessment-managment",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AssessmentManagment />
          </Suspense>
        ),
      },
      {
        path: `/admin/assessment-managment/:id`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionList />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/draw-roadmap/:id",
    element: <WrappedDnDFlow />,
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
