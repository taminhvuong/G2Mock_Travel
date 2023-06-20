import async from "../components/Async";

import {
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
  Calendar as CalendarIcon,
  CheckSquare as CheckSquareIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MapPin as MapPinIcon,
  Monitor as MonitorIcon,

  PieChart as PieChartIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
  FaceBook as FaceBookIcon,
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

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

// Misc
import Blank from "../pages/misc/Blank";

// UI Elements
import Carousel from "../pages/ui-elements/Carousel";
import Tabs from "../pages/ui-elements/Tabs";


// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";

// Documentation

import NewPassword from "../pages/auth/NewPassword";
import withAuth from "../HOC/withAuth";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));




const Editors = async(() => import("../pages/forms/Editors"));
// const Validation = async(() => import("../pages/forms/Validation"));
const Wizard = async(() => import("../pages/forms/Wizard"));





// groups
const Group = async(() => import("../pages/group/Group"));
const Trip = async(() => import("../pages/trip/Trip"));

const TripUI = async(() => import("../pages/trip/TripUI"));
const Tour = async(() => import("../pages/tour/Tour"));
const DetailTrip = async(() => import("../pages/trip/DetailTrip"));
const Booking = async(() => import("../pages/booking/Booking.js"));
const TripWYSIWYG = async(() => import("../pages/trip/TripManagement.js"));

//Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: withAuth(Default)
    },

  ]
};

const groupRoutes = {
  path: "/groups",
  name: "Group Management",
  icon: ListIcon,
  component: withAuth(Group),
  children: null
};
const TripManagementRoute = {
  path: "/tripWY",
  name: "TripWY Management",
  icon: ListIcon,
  component: withAuth(TripWYSIWYG),
  children: null
};
const tripRoutes = {
  path: "/trips",
  name: "Trip  Management ",
  icon: Bellicon,
  component: withAuth(Trip),
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
const tripUi = {
  path: "/tripUi",
  name: "TripUi Management",
  icon: LayoutIcon,
  component: withAuth(TripUI),
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


const uiRoutes = {
  path: "/ui",
  name: "UI Elements",
  header: "Tools & Components",
  icon: GridIcon,
  children: [

    {
      path: "/ui/carousel",
      name: "Carousel",
      component: Carousel
    },



    {
      path: "/ui/tabs",
      name: "Tabs",
      component: Tabs
    },

  ]
};




const formPluginsRoutes = {
  path: "/form-plugins",
  name: "Form Plugins",
  icon: CheckSquareIcon,
  header: "Plugin & Addons",
  children: [

    {
      path: "/form-plugins/editors",
      name: "Editors",
      component: Editors
    },

    {
      path: "/form-plugins/wizard",
      name: "Wizard",
      component: Wizard
    }
  ]
};


const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
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
  tripUi,
  dashboardRoutes,
  groupRoutes,
  tripRoutes,
  tourRoutes,
  pageRoutes,
  layoutRoutes,
  uiRoutes,
  formPluginsRoutes,
  privateRoutes,
  ProfileRoutes,
  SettingsRoutes,
  TripManagementRoute
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  dashboardRoutes,
  // groupRoutes,
  tripUi,
  bookingRoute,
  tripRoutes,
  tourRoutes,
  pageRoutes,
  authRoutes,

  uiRoutes,
  formPluginsRoutes,

];
