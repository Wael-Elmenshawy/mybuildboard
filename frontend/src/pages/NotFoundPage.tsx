import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
