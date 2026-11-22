import { CtaBand } from './home/CtaBand';
import { FaqSection } from './home/FaqSection';
import { FeaturesBento } from './home/FeaturesBento';
import { FeedbackSection } from './home/FeedbackSection';
import { GallerySection } from './home/GallerySection';
import { HeroSection } from './home/HeroSection';
import { HowItWorks } from './home/HowItWorks';
import { SiteFooter } from './home/SiteFooter';
import { StatsStrip } from './home/StatsStrip';
import { UseCases } from './home/UseCases';
import './home/home.css';

export function Home() {
  return (
    <div className="lp">
      <HeroSection />
      <StatsStrip />
      <GallerySection />
      <FeaturesBento />
      <HowItWorks />
      <UseCases />
      <FaqSection />
      <FeedbackSection />
      <CtaBand />
      <SiteFooter />
    </div>
  );
}
