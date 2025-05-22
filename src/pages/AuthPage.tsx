
import { AuthForm } from "@/components/AuthForm";

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export default function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to TuneSuggestor</h1>
      <AuthForm onLogin={onLogin} onSignup={onSignup} />
    </div>
  );
}
