import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLogoutMutation, useGetProfileQuery} from "../services/api";
import {logout} from "../features/auth/authSlice";
import {Button} from "../components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const {data: profile, isLoading} = useGetProfileQuery();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.email}!</h1>
      <p>You are logged in and this is a protected route.</p>
      <Button onClick={handleLogout} className="mt-4">
        Log out
      </Button>
    </div>
  );
};

export default Home;
