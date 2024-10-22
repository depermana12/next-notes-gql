"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useMutation } from "urql";
import { SigninMut } from "@/graphql/mutations/signin";
import { setToken } from "@/app/utils/token";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInPage = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signinResult, signin] = useMutation(SigninMut);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const result = await signin({ input: value });

    if (result.error) {
      console.error("signup error:", result.error);
      return;
    }

    if (result.data?.login) {
      console.log("user created successfully");
      setToken(result.data.login.token);
      router.push("/notes");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Welcome! Please fill all the details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between ">
                    <FormLabel htmlFor="email">Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="shadcn@email.com"
                      {...field}
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
                  <div className="flex justify-between ">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      className="ml-auto inline-block text-sm underline"
                      href="/forgot-password-todo"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <Button asChild variant="outline">
              <Link href="/login">Login with Google</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <small>not have an account?</small>{" "}
        <Button asChild variant="link">
          <Link href="/signup">Signup</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default SignInPage;
