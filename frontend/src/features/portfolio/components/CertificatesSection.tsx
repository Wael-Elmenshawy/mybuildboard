type CertificatesSectionProps = {
  certificates: any[];
};

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Certificates
      </h2>

      {certificates.length === 0 ? (
        <p className="text-slate-500">
          No certificates added yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((certificate: any) => (
            <article
              key={certificate.id}
              className="rounded-xl border p-6"
            >
              <h3 className="text-xl font-semibold">
                {certificate.name}
              </h3>

              <p className="mt-2 text-blue-600">
                {certificate.issuer}
              </p>

              {certificate.issue_date && (
                <p className="mt-2 text-sm text-slate-500">
                  Issued: {certificate.issue_date}
                </p>
              )}

              {certificate.credential_url && (
                <a
                  href={certificate.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  View Credential →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
