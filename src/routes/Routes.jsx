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
// import HomePageForMember from "../pages/pageForMembers/MyApartment";
import MyApartment from "../pages/pageForMembers/MyApartment";
import MakeAnnouncement from "../pages/pageForAdmin/MakeAnnouncement";
import AllAnnouncements from "../pages/pageForAdmin/AllAnnouncements";
import AllAnnouncementMem from "../pages/pageForMembers/AllAnnouncementMem";
import PaymentHistory from "../pages/pageForMembers/PaymentHistory";
import DashboardPageForMember from "../pages/pageForMembers/DashboardPageForMember";
import AllPaymentHistory from "../pages/pageForAdmin/AllPaymentHistory";
import MakeCupons from "../pages/pageForAdmin/MakeCupons";
import ManageMember from "../pages/pageForAdmin/ManageMember";
import AboutPage from "../pages/AboutPage";
import UserDashboard from "../pages/pageForUser/UserDashboard";
import AllAnnouncementForUser from "../pages/pageForUser/AllAnnouncementForUser";
import UserPrivateRoute from "./UserPrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import MemberPrivateRoute from "./ MemberPrivateRoute";
  
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
                path: "dashboard-user" ,
                element: <UserPrivateRoute >
   <UserDashboard /> 
                </UserPrivateRoute>,
                children: [
                    {
                        path: "all-announcement" ,
                        element:
                        <UserPrivateRoute >
 <AllAnnouncementForUser />
                </UserPrivateRoute>
                        
                    }
                ]
            },
            {
                path: "apartments/:id" ,
                element: 
                <UserPrivateRoute >
                <ApartmentDetails />
                               </UserPrivateRoute>
                 
            },
            {
                path: "my-booking" ,
                element:
                <UserPrivateRoute >
                <MyBooking />
                               </UserPrivateRoute>
                 
            },
            {
                path: "about" ,
                element: <AboutPage />
            }
        ]
    },
    {
        path: "/dashboard" ,
        element :
        <UserPrivateRoute >
         <AdminPrivateRoute >
                 <DashboardLayout />
        </AdminPrivateRoute>
         </UserPrivateRoute>
          ,
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
            },
            {
                path : "payment-history" ,
                element : <AllPaymentHistory />
            },
            {
                path : "make-cupons" ,
                element : <MakeCupons />
            },
            {
                path: "manage-members" ,
                element : <ManageMember />
            }
            
        ]
    },
    {
        path: "/dashboard-member",
        element:
        <UserPrivateRoute >
         <MemberPrivateRoute >
              <MemberDashboardLayout />
        </MemberPrivateRoute>
         </UserPrivateRoute>
          ,
        errorElement: <ErrorPage /> ,
        children: [
            {
                index: true ,
                element: <DashboardPageForMember/>
            },
            {
                path: "my-apartment" ,
                element: <MyApartment />
            },
            {
                path: "all-announcement" ,
                element: <AllAnnouncementMem />
            },
            {
                
                path: "payment-history" ,
                element: <PaymentHistory />
            }
        ]
    }
])