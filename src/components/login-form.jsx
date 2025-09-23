import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from "../providers/AuthContext"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Toaster } from "sonner"
import { useState } from "react"

export default function LoginForm({
  className,
  ...props
}) {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    toast.promise(
      login(email, password),
      {
        loading: "Logging in...",
        success: () => {
          navigate("/");
          return "Login successful!";
        },
        error: (error) => {
          console.error(error)
          return "Login failed!";
        },
      }
    )
    setLoading(false);
  };


  return (
    (<form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="m@example.com" required />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} required />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <Toaster richColors />
    </form>)
  );
}
