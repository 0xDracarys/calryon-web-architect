import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const { login, user, isLoading: authLoading, session } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const from = location.state?.from?.pathname || "/admin/dashboard";

  // Effect to redirect if user is already logged in
  useEffect(() => {
    if (user && session) {
      console.log("User already logged in, redirecting from login page to:", from);
      navigate(from, { replace: true });
    }
  }, [user, session, navigate, from]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoginError(null);
    setIsSubmitting(true);
    try {
      await login({ email: data.email, password: data.password });
      // Successful login will trigger onAuthStateChange, which updates user/session.
      // The useEffect above will then handle redirection.
      // Explicit navigation can also be done here if preferred, but might race with context update.
      // navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login page submission error:", error);
      setLoginError(error.message || "An unknown error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If auth is still loading, or if user/session becomes available (triggering redirect by useEffect),
  // show loading to prevent brief flash of login form.
  if (authLoading || (user && session)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-claryon-teal" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <img
            src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png"
            alt="Claryon Group Logo"
            className="w-32 mx-auto mb-4" // Adjust size as needed
          />
          <CardTitle className="text-2xl font-bold">Admin Portal Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                disabled={isSubmitting}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                disabled={isSubmitting}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-claryon-teal hover:bg-claryon-dark-teal text-white" disabled={isSubmitting || authLoading}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Claryon Group. Admin Access.
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
