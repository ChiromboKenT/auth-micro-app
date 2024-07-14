import  {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate, Link} from "react-router-dom";
import {useSigninMutation} from "../services/api";
import {useDispatch} from "react-redux";
import {setCredentials} from "../features/auth/authSlice";
import {Button} from "../components/ui/button";
import {Input} from "../components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import {AuthRequest} from "../types/auth";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Use the validation schema with react-hook-form
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthRequest) => {
    try {
      setLoading(true); // Set loading state to true
      const result = await signin(data).unwrap();
      dispatch(setCredentials({token: result.token}));
      navigate("/home");
      toast.success("Logged in successfully");
    } catch (err) {
      console.error("Failed to log in:", err);
      toast.error(
        `Failed to sign up: ${
          (err as any)?.data?.error ||
          (err as any)?.data?.message ||
          (err as any)?.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up instead
            </Link>
          </div>
        </form>
      </Form>
      <ToastContainer position="bottom-right" />{" "}
    </div>
  );
};

export default Login;
