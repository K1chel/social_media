import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { AuthFooter } from "@/components/form/AuthFooter";
import { AuthHeader } from "@/components/form/AuthHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShowPassword } from "@/components/form/ShowPassword";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/AuthProvider";

import { loginSchema } from "@/lib/validation";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setToken, setUser } = useContext(AuthContext);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 w-full h-full">
      <AuthHeader
        title="Welcome back!"
        description="Login to your account using your username and password."
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                      disabled={isLoading}
                    />
                    <ShowPassword
                      disabled={isLoading}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2Icon className="w-5 h-5 animate-spin text-muted-foreground" />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <AuthFooter
        title="Don't have an account?"
        description="Create one here."
        href="/register"
      />
    </div>
  );
};
