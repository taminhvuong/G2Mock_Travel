import async from "../components/Async";

import {
  Bell as Bellicon,
  Layout as LayoutIcon,
  List as ListIcon,
  Monitor as MonitorIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
} from "react-feather";


// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts

import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";

// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";

// Documentation

import NewPassword from "../pages/auth/NewPassword";
import withAuth from "../HOC/withAuth";


// groups
const Trip = async(() => import("../pages/trip/Trip"));

const TripUI = async(() => import("../pages/trip/TripUI"));
const Tour = async(() => import("../pages/tour/Tour"));
const DetailTrip = async(() => import("../pages/trip/DetailTrip"));
const Booking = async(() => import("../pages/booking/Booking.js"));
const BookingManagement = async(() => import("../pages/booking/BookingManagement.js"));

const CreateTrip = async(() => import("../pages/trip/CreateTrip.js"));


const TripRoutes = {
  path: "/",
  name: "Trip UI",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: SlidersIcon,
  containsHome: true,
  component: withAuth(TripUI),
  children: null

};



const tripRoutes = {
  path: "/trips",
  name: "Trip  Management ",
  icon: Bellicon,
  component: withAuth(Trip),
  children: null


};
const BookingUIRoutes = {
  path: "/bookings",
  name: "Booking  UI ",
  icon: Bellicon,
  component: withAuth(BookingManagement),
  children: null


};
const detailTripRoute = {
  path: "/detailTrip/:codeTrip?",
  name: "Detail Trip",
  component: withAuth(DetailTrip),
  children: null
};
const tourRoutes = {
  path: "/tours",
  name: "Tour Management",
  icon: ListIcon,
  component: withAuth(Tour),
  children: null
};

const bookingRoute = {
  path: "/booking/:codeTrip?",
  name: "Booking Management",
  icon: LayoutIcon,
  component: withAuth(Booking),
  children: null
};
const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,

  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings
    },
  ]
};


const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/new-password/:token",
      name: "New Password",
      component: NewPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [

    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};


// This route is not visisble in the sidebar
const ProfileRoutes = {
  path: "/profile",
  name: "Profile",
  component: withAuth(Profile),
  children: null
};

const CreateTripRoutes = {
  path: "/createTrip/:codeTripUpdate?",
  name: "Create Trip",
  component: withAuth(CreateTrip),
  children: null
};

// This route is not visisble in the sidebar
const SettingsRoutes = {
  path: "/settings",
  name: "Settings",
  component: withAuth(Settings),
  children: null
};

// Dashboard specific routes
export const dashboard = [
  detailTripRoute,
  bookingRoute,
  TripRoutes,
  tripRoutes,
  tourRoutes,
  pageRoutes,
  layoutRoutes,
  BookingUIRoutes,
  ProfileRoutes,
  SettingsRoutes,
  
  CreateTripRoutes
];


// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  tourRoutes,
  tripRoutes,
  BookingUIRoutes,
  authRoutes,
  TripRoutes,

];
