import AboutSection from "@/features/portfolio/components/AboutSection";
import CertificatesSection from "@/features/portfolio/components/CertificatesSection";
import ContactCard from "@/features/portfolio/components/ContactCard";
import EducationSection from "@/features/portfolio/components/EducationSection";
import ExperienceSection from "@/features/portfolio/components/ExperienceSection";
import PortfolioHero from "@/features/portfolio/components/PortfolioHero";
import ProjectsSection from "@/features/portfolio/components/ProjectsSection";
import SkillsSection from "@/features/portfolio/components/SkillsSection";
import SocialLinksSection from "@/features/portfolio/components/SocialLinksSection";
import StatsSection from "@/features/portfolio/components/StatsSection";
import { usePortfolio } from "@/features/portfolio/hooks/usePortfolio";

export default function PortfolioPage() {
  const { data, isLoading, isError } = usePortfolio("demo");

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Failed to load portfolio.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <PortfolioHero profile={data.profile} />

        <div className="mt-8">
          <StatsSection
            projects={data.projects}
            skills={data.skills}
            experiences={data.experiences}
            certificates={data.certificates}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <aside className="space-y-8">
            <ContactCard profile={data.profile} />

            <SkillsSection skills={data.skills} />

            <EducationSection educations={data.educations} />

            <CertificatesSection certificates={data.certificates} />

            <SocialLinksSection socialLinks={data.social_links} />
          </aside>

          <section className="space-y-8 lg:col-span-2">
            <AboutSection profile={data.profile} />

            <ExperienceSection experiences={data.experiences} />

            <ProjectsSection projects={data.projects} />
          </section>
        </div>
      </div>
    </main>
  );
}
