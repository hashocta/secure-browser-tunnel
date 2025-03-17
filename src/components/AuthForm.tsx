
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  usernameSchema, 
  emailSchema, 
  passwordSchema, 
  AuthFormData,
  UsernameFormData,
  EmailFormData,
  PasswordFormData
} from "@/lib/validation";
import { authenticateUser } from "@/lib/auth";
import { Card } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui-custom/Input";
import { Button } from "@/components/ui-custom/Button";
import { ProgressBar } from "@/components/ui-custom/ProgressBar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  AtSign, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Shield
} from "lucide-react";

const TOTAL_STEPS = 3;

export function AuthForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<AuthFormData>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Username form
  const usernameForm = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: formData.username || "",
    },
  });

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: formData.email || "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Handle username submission
  const onUsernameSubmit = (data: UsernameFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Handle email submission
  const onEmailSubmit = (data: EmailFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  // Handle password submission
  const onPasswordSubmit = async (data: PasswordFormData) => {
    setLoading(true);
    
    try {
      const completeFormData = { ...formData, ...data } as AuthFormData;
      
      const result = await authenticateUser(completeFormData);
      
      if (result.success) {
        toast({
          title: "Authentication successful",
          description: "Welcome to the secure browser tunnel.",
        });
        
        // Navigate to dashboard with animation delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        toast({
          title: "Authentication failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Go to previous step
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 text-center">
        <div className="mb-2 flex justify-center">
          <Shield className="h-12 w-12 text-primary animate-pulse-subtle" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">
          Secure Browser Tunnel
        </h1>
        <p className="text-muted-foreground">
          Enter your credentials to access the local network
        </p>
      </div>

      <Card 
        variant="elevated" 
        className="w-full transition-all duration-500 animate-scale-in"
      >
        <div className="mb-6">
          <ProgressBar steps={TOTAL_STEPS} currentStep={step} />
        </div>

        <div className="space-y-4">
          {/* Step 1: Username */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">Enter Username</h2>
                <p className="text-sm text-muted-foreground">
                  Step 1 of {TOTAL_STEPS}: Please enter your username
                </p>
              </div>

              <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="space-y-4">
                <Input
                  placeholder="username"
                  icon={<User className="h-4 w-4" />}
                  error={usernameForm.formState.errors.username?.message}
                  {...usernameForm.register("username")}
                />

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full"
                  icon={<ChevronRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">Enter Email</h2>
                <p className="text-sm text-muted-foreground">
                  Step 2 of {TOTAL_STEPS}: Please enter your email address
                </p>
              </div>

              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  icon={<AtSign className="h-4 w-4" />}
                  error={emailForm.formState.errors.email?.message}
                  {...emailForm.register("email")}
                />

                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={goBack}
                    icon={<ChevronLeft className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="flex-1"
                    icon={<ChevronRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-1">Enter Password</h2>
                <p className="text-sm text-muted-foreground">
                  Step 3 of {TOTAL_STEPS}: Please enter your password
                </p>
              </div>

              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <Input
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  error={passwordForm.formState.errors.password?.message}
                  {...passwordForm.register("password")}
                />

                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={goBack}
                    icon={<ChevronLeft className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="flex-1"
                    isLoading={loading}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Demo credentials notice */}
          <div className="pt-4 mt-4 border-t text-center text-xs text-muted-foreground">
            <p>For demo purposes use these credentials:</p>
            <p className="mt-1 font-medium">
              Username: admin | Email: admin@local.net | Password: Admin@123
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
