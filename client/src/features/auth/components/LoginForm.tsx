import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import z from "zod";
import axios from "axios";
import { useState } from "react";
import { IUser } from "@/types/UserType";

type FormInputData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  updateLoggedInUser: (user: IUser) => void;
}

const LoginForm = ({ updateLoggedInUser }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormInputData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormInputData) => {
    try {
      const response = await axios.post(`http://localhost:8000/auth/login`, {
        email: values.email,
        password: values.password,
      });

      console.log("response", response.data.user);
      updateLoggedInUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-[70vh] w-full justify-center items-center mt-6">
      <div className="w-2/3 md:w-1/3 border-2 border-gray-200 p-8 rounded-xl">
        <p className="text-sm font-medium text-gray-400 text-center">
          Login here
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field with Toggle */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="*****"
                        type={showPassword ? "text" : "password"}
                        className="pr-10 caret-black"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    >
                      {showPassword ? (
                        <Eye width={20} />
                      ) : (
                        <EyeOff width={20} />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              )}
              Login
            </Button>
          </form>
        </Form>

        {/* Footer Link */}
        <p className="text-sm text-center mt-6 font-medium">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="underline font-bold">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
