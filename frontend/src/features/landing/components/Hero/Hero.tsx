import Page from "@/components/layout/Page";
import CTA from "../CTA/CTA";
import SmartHub from "../SmartHub/SmartHub";

function Hero() {
  return (
    <Page>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="grid min-h-[90vh] items-center gap-20 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              🚀 Developer Identity Platform
            </span>

            <h1 className="text-6xl font-black leading-tight lg:text-7xl">
              Everything
              <br />
              you've built.
              <br />
              <span className="text-primary">
                One Beautiful Board.
              </span>
            </h1>

            <p className="max-w-xl text-xl leading-9 text-muted-foreground">
              Connect GitHub, LinkedIn, Resume, Certificates, Projects,
              Timeline and everything you've built into one beautiful
              developer identity.
            </p>

            <CTA />

            <div className="pt-6">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Powered by
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  "GitHub",
                  "LinkedIn",
                  "AWS",
                  "Azure",
                  "Docker",
                  "Terraform",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
	            <div className="grid max-w-md grid-cols-3 gap-8 pt-8">
              {[
                { value: "25K+", label: "Developers" },
                { value: "120K+", label: "Projects" },
                { value: "50+", label: "Integrations" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-primary">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <SmartHub />
          </div>
        </div>
      </section>
    </Page>
  );
}

export default Hero;
