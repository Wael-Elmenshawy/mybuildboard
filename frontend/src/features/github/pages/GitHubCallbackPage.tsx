import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GitHubCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/github", { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
