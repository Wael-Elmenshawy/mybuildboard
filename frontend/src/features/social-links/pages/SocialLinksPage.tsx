import { useSocialLinks } from "../hooks/useSocialLinks";

function SocialLinksPage() {
  const {
    data: socialLinks,
    isLoading,
    isError,
  } = useSocialLinks();

  if (isLoading) {
    return <div>Loading social links...</div>;
  }

  if (isError) {
    return <div>Failed to load social links.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Social Links
      </h1>

      <pre>
        {JSON.stringify(socialLinks, null, 2)}
      </pre>
    </div>
  );
}

export default SocialLinksPage;
