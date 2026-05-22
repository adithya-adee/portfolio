import experienceData from "@/asset/experience.json";
import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";
import { Reveal, SectionTitle } from "@/components/motion";
import { ArchiveTimeline } from "./_components/ArchiveTimeline";

const experienceCount = (experienceData as unknown[]).length;

export default function ArchivePage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto mt-10 max-w-5xl px-4 py-6 sm:mt-16 sm:px-6 sm:py-8">
        {/* Back link */}
        <Reveal y={8} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-label font-medium tracking-wide text-tertiary transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" size={14} />
            Back to home
          </Link>
        </Reveal>

        <SectionTitle meta={`${experienceCount} roles`}>Work Experience</SectionTitle>

        <Reveal y={10} delay={0.05}>
          <p className="mb-12 text-body-2 leading-relaxed tracking-wide text-secondary">
            My professional journey — current work at Umbra Privacy, plus prior backend
            and Web3 engagements.
          </p>
        </Reveal>

        <ArchiveTimeline />
      </section>
    </div>
  );
}
