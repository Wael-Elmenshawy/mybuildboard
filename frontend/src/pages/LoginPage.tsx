import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8 shadow">
        <h1 className="text-center text-3xl font-bold">
          MyBuildBoard
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to continue
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
