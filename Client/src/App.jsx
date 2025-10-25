import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/userLayout";
import User from "./Pages/User/User";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./Pages/Admin/Admin";
import RegisterForm from "./Pages/Register/Register";


import ProfileView from "./Pages/Profile/ProfileView";
import ProfileEdit from "./Pages/Profile/ProfileEdit";
import ProfileCreate from "./Pages/Profile/ProfileCreate";
import ProfileForm from "./Pages/Profile/ProfileForm";

import CoursesList from "./Pages/Courses/CoursesList";
import CoursesForm from "./Pages/Courses/CoursesForm";
import CoursesCreate from "./Pages/Courses/CoursesCreate";
import CoursesEdit from "./Pages/Courses/CoursesEdite";

import FacilitiesCreate from "./Pages/Facilities/FacilitiesCreate";
import FacilitiesEdit from "./Pages/Facilities/FacilitiesEdit";
import FacilityForm from "./Pages/Facilities/FacilitiesForm";
import FacilitiesList from "./Pages/Facilities/FacilitiesList";

import Requests from "./Pages/Requests/Requests"

import InstituteDetails from "./Pages/User/InstituteDetails";


const STORAGE_KEY = "institute_data_v1";
const defaultData = {
  profile: {
    id: "1",
    name: "Example Institute",
    tagline: "Learn. Grow. Succeed.",
    description: "A short description about the institute.",
    email: "info@example.edu",
    phone: "+91-9876543210",
    website: "https://example.edu",
    address: "123 Campus Road",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    pincode: "560001",
    year: 2001,
    accreditation: "NAAC A",
    head: "Dr. A. Director",
    contactPerson: "Mr. Admission Officer",
    logo: "",
    banner: "",
    gallery: [],
    social: { facebook: "", twitter: "", linkedin: "" },
  },
  courses: [
    {
      id: "c1",
      name: "B.Tech - Computer Science",
      code: "BTECH-CSE",
      category: "Undergraduate",
      duration: "4 years",
      mode: "Full-time",
      eligibility: "10+2 with PCM",
      description: "Core engineering programme.",
      fees: 120000,
      intake: 120,
      image: "",
      startDate: "",
      endDate: "",
    },
  ],
  facilities: [
    {
      id: "f1",
      name: "Library",
      category: "Academic",
      description: "Large library with digital access.",
      photo: "",
      available: true,
      capacity: 250,
      location: "Main Block",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
  ]
};

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <RegisterForm />
  },



  {
    element: <MainLayout />,
    children: [{
      path: "/Dashboard",
      element: <Dashboard />,
    },
    {
      path: "/Profile/ProfileView",
      element: <ProfileView />
    },
    {
      path: "/Profile/ProfileEdit/:id",
      element: <ProfileEdit />
    },
    {
      path: "/Profile/ProfileCreate",
      element: <ProfileCreate />
    },
    {
      path: "/Profile/ProfileForm",
      element: < ProfileForm />
    },
    {
      path: "/Courses/CoursesList",
      element: <CoursesList />
    },
    {
      path: "/Courses/CoursesForm",
      element: <CoursesForm />

    },
    {
      path: "/Courses/CoursesEdit/:id",
      element: <CoursesEdit />
    },
    {
      path: "/Courses/CoursesCreate",
      element: <CoursesCreate />

    },
    {
      path: "/Facilities/FacilitiesCreate",
      element: < FacilitiesCreate />
    },
    {
      path: "/Facilities/FacilitiesEdit/:id",
      element: <FacilitiesEdit />
    },
    {
      path: "/Facilities/FacilitiesForm",
      element: <FacilityForm />
    },
    {
      path: "/Facilities/FacilitiesList",
      element: <FacilitiesList />
    }

    ]

  },
  {
    element: <AdminLayout />,
    children: [{
      path: "/Admin",
      element: <Admin />
    },
    {
      path: "/Requests",
      element: <Requests />
    }
    ]
  },
  {
    element: <UserLayout />,
    children: [{
      path: "/",
      element: <User />
    },
    {
      path:"/InstituteDetails/:id",
      element:<InstituteDetails />
    }
    ]
  },

]);

export default function App() {
  useEffect(() => {
    loadData()
  }, [])
  return <RouterProvider router={router} />;
}


