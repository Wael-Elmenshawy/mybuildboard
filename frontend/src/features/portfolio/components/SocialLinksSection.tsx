type SocialLinksSectionProps = {
  socialLinks: any[];
};

export default function SocialLinksSection({
  socialLinks,
}: SocialLinksSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Social Links
      </h2>

      {socialLinks.length === 0 ? (
        <p className="text-slate-500">
          No social links added yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {socialLinks.map((link: any) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border p-4 transition hover:bg-slate-50 hover:shadow-sm"
            >
              <div className="font-semibold">
                {link.platform}
              </div>

              <div className="mt-1 truncate text-sm text-slate-500">
                {link.url}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
