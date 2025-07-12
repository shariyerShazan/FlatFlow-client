import {
    createBrowserRouter,
  } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePageForDashboard from "../pages/HomePageForDashboard";
import CreateListForApertment from "../pages/pageForAdmin/CreateListForApertment";
import ApartmentList from "../pages/ApartmentList";
import ApartmentDetails from "../pages/ApartmentDetails";
// import ActiveList from "../pages/pageForAdmin/Agreemented";
import Agreemented from "../pages/pageForAdmin/Agreemented";
import MyBooking from "../pages/pageForUser/MyBooking";
import MemberDashboardLayout from "../layouts/MemberDashboardLayout";
import HomePageForMember from "../pages/pageForMembers/MyApartment";
import MyApartment from "../pages/pageForMembers/MyApartment";
import MakeAnnouncement from "../pages/pageForAdmin/MakeAnnouncement";
import AllAnnouncements from "../pages/pageForAdmin/AllAnnouncements";
import AllAnnouncementMem from "../pages/pageForMembers/AllAnnouncementMem";
  
export const Router = createBrowserRouter([
    {
        path: "/login" ,
        element: <Login />
    },
    {
        path: "/register" ,
        element: <Register />
    },
    {
        path: "/" ,
        element : <MainLayout /> ,
        errorElement : <ErrorPage /> ,
        children: [
            {
                index : true ,
                element: <HomePage />
            },
            {
                path: "apartments" ,
                element: <ApartmentList />
            },
            {
                path: "apartments/:id" ,
                element: <ApartmentDetails />
            },
            {
                path: "my-booking" ,
                element: <MyBooking />
            }
        ]
    },
    {
        path: "/dashboard" ,
        element : <DashboardLayout /> ,
        errorElement : <ErrorPage /> ,
        children: [
            {
                index: true ,
                element: <HomePageForDashboard />
            } ,
            {
                path: "list-apartment" ,
                element: <CreateListForApertment />
            },
            {
                path: "agreemented" ,
                element: <Agreemented />
            } ,
            {
                path : "make-announcement" ,
                element : <MakeAnnouncement />
            },
            {
                path : "announcements" ,
                element : <AllAnnouncements />
            }
        ]
    },
    {
        path: "/dashboard-member",
        element: <MemberDashboardLayout /> ,
        errorElement: <ErrorPage /> ,
        children: [
            {
                path: "my-apartment" ,
                element: <MyApartment />
            },
            {
                path: "all-announcement" ,
                element: <AllAnnouncementMem />
            }
        ]
    }
])