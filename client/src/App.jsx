import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import { Programmes } from "./pages/programmes/Programmes";
import ProgramDetails from "./pages/programDetails/ProgramDetails";
import Workouts from "./pages/workouts/Workouts";
import Calculator from "./pages/calculator/Calculator";
import Nutrition from "./pages/nutrition/Nutrition";
import Progress from "./pages/progress/Progress";
import Blog from "./pages/blog/Blog";
import BMICalculator from "./pages/bmi/BMICalculator";
import BMIHistory from "./pages/bmi/BMIHistory";

import Community from "./pages/community/Community";
import MainLayout from "./layout/mainLayout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AdminDashboard from "./pages/admin_pages/AdminDashboard/AdminDashboard";

import AdminRoute from "./routes/AdminRoute";
import Users from "./pages/admin_pages/Users/Users";
import AdminBlog from "./pages/admin_pages/Blog/AdminBlog";
import AdminNutrition from "./pages/admin_pages/Nutrition/AdminNutrition";
import AdminPrograms from "./pages/admin_pages/Program/AdminPrograms";
import AdminGoals from "./pages/admin_pages/Goals/AdminGoals";
import AdminProgress from "./pages/admin_pages/Programs/AdminProgress";
import AdminTrainers from "./pages/admin_pages/Trainers/AdminTrainers";
import AdminExerciseBank from "./pages/admin_pages/ExerciseBank/AdminExerciseBank";
import AdminWorkouts from "./pages/admin_pages/Workouts/AdminWorkouts";
import AdminBMIHistory from "./pages/admin_pages/BMIHistory/AdminBMIHistory";
import AdminCommunity from "./pages/admin_pages/Community/AdminCommunity";
import Profile from "./pages/userProfile/Profile";
import Trainers from "./pages/trainers/Trainers";
import TrainerProfile from "./pages/trainers/TrainerProfile";
import FitnessLanding from "./pages/FitnessLanding/FitnessLanding";
import Checkout from "./pages/Checkout/Checkout";





export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programmes />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/exercises" element={<Workouts />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/bmi-history" element={<BMIHistory />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/trainer-info" element={<FitnessLanding />} />



          <Route path="/profile" element={<Profile />} />

        </Route>


          

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin/users" element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } />
          <Route path="/admin/blogs" element={
            <AdminRoute>
              <AdminBlog />
            </AdminRoute>
          } />

          <Route path="/admin/nutrition" element={
            <AdminRoute>
              <AdminNutrition />
            </AdminRoute>
          } />



          <Route
            path="/admin/programs"
            element={
              <AdminRoute>
                <AdminPrograms />
              </AdminRoute>
            }
          />


          <Route
            path="/admin/goals"
            element={
              <AdminRoute>
                <AdminGoals />
              </AdminRoute>
            }
          />


          <Route
            path="/admin/progress"
            element={
              <AdminRoute>
                <AdminProgress />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/trainers"
            element={
              <AdminRoute>
                <AdminTrainers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/exercise-bank"
            element={
              <AdminRoute>
                <AdminExerciseBank />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/workouts"
            element={
              <AdminRoute>
                <AdminWorkouts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/bmi-history"
            element={
              <AdminRoute>
                <AdminBMIHistory />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/community"
            element={
              <AdminRoute>
                <AdminCommunity />
              </AdminRoute>
            }
          />

          <Route path="/admin" element={

            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>
          } />







        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}