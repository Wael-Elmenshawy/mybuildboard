import { GitBranch, Loader2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import {
  useGitHubRepositories,
  useImportRepository,
} from "../hooks/useGitHub";

import { connectGitHub } from "../api/githubApi";

export default function GitHubPage() {
  const {
    data: repositories,
    isLoading,
    isError,
    refetch,
  } = useGitHubRepositories();

  const importRepo = useImportRepository();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-8 text-center">
        <h2 className="mb-3 text-xl font-semibold">
          Failed to load GitHub repositories
        </h2>

        <Button onClick={() => refetch()}>
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">GitHub Integration</h1>
          <p className="text-slate-500">
            Connected repositories
          </p>
        </div>

        <Button
          onClick={async () => {
            console.log("CONNECT GITHUB CLICKED");

            try {
              const result = await connectGitHub();

              console.log("GITHUB RESPONSE:", result);

              if (result.authorization_url) {
                window.location.href = result.authorization_url;
              }
            } catch (error) {
              console.error("GitHub connection failed:", error);
            }
          }}
        >
          <GitBranch className="mr-2 h-4 w-4" />
          Connect GitHub
        </Button>
      </div>

      <div className="grid gap-4">
        {repositories?.length ? (
          repositories.map((repo) => (
            <Card
              key={repo.id}
              className="flex items-center justify-between p-5"
            >
              <div>
                <h3 className="font-semibold">{repo.name}</h3>

                <p className="mt-1 text-sm text-slate-500">
                  {repo.description ?? "No description"}
                </p>
              </div>

              <Button
                disabled={importRepo.isPending}
                onClick={() => importRepo.mutate(repo.id)}
              >
                {importRepo.isPending ? "Importing..." : "Import"}
              </Button>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            No repositories found.
          </Card>
        )}
      </div>
    </div>
  );
}
