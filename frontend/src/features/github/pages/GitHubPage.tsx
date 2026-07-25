import { GitBranch, Loader2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGitHubConnection, useGitHubRepositories } from "../hooks/useGitHub";

export default function GitHubPage() {
  const {
    data: repositories,
    isLoading,
    isError,
    refetch,
  } = useGitHubRepositories();

  const githubConnection = useGitHubConnection();

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

        <Button onClick={async () => {
          const result = await githubConnection.refetch();
          if (result.data?.authorization_url) {
            window.location.href = result.data.authorization_url;
          }
        }}>
          <GitBranch className="mr-2 h-4 w-4" />
          Connect GitHub
        </Button>
      </div>

      <div className="grid gap-4">
        {repositories?.length ? (
          repositories.map((repo) => (
            <Card
              key={repo.id}
              className="p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {repo.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {repo.description ?? "No description"}
                  </p>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-600 hover:underline"
                >
                  Open
                </a>
              </div>
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
