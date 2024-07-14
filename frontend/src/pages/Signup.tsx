import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useSignupMutation} from "../services/api";
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

const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const form = useForm();

  const onSubmit = async (data : any) => {
    try {
      await signup(data).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Failed to sign up:", err);
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
          <Button type="submit">Sign up</Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
