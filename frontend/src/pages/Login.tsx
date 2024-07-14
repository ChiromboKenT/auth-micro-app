import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();
  const form = useForm();

  const onSubmit = async (data : any) => {
    try {
      const result = await signin(data).unwrap();
      dispatch(setCredentials({token: result.token}));
      navigate("/home");
    } catch (err) {
      console.error("Failed to log in:", err);
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
