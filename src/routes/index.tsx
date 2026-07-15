import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { FeatureRow, StrokeAccent } from "@/components/site/FeatureRow";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { FooterCTA } from "@/components/site/FooterCTA";
import { HighlightPill } from "@/components/site/HighlightPill";
import { Preloader } from "@/components/site/Preloader";
import { Cursor } from "@/components/site/Cursor";

import feature1 from "@/assets/figma/da7717ef2f3a21b6e13dc4d9c4b346bc9b5a7682.jpg";
import feature2 from "@/assets/figma/3ddf828267cb844171aaad94b1f6da3e7949acbd.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elementum — Thinkers and doers changing the status quo" },
      {
        name: "description",
        content:
          "Elementum is a studio of strategists, designers, and researchers helping change-makers accelerate progress across brand, digital and social.",
      },
      { property: "og:title", content: "Elementum — Thinkers and doers changing the status quo" },
      {
        property: "og:description",
        content:
          "A studio of strategists, designers, and researchers helping change-makers accelerate progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div id="top" className="relative bg-background text-foreground overflow-x-clip">
      <Nav />

      <main>
        <Hero />

        <section id="studio">
          <FeatureRow
            imagePosition="right"
            imageSrc={feature1}
            imageAlt="Team collaborating in a modern boardroom"
            heading={
              <>
                <StrokeAccent>Tomorrow</StrokeAccent> should
                <br />
                be better than{" "}
                <HighlightPill color="mint" delay={0.4}>
                  today
                </HighlightPill>
              </>
            }
            body="We are a team of strategists, designers, communicators and researchers. Together, we believe progress only happens when you refuse to play things safe."
          />
          <FeatureRow
            imagePosition="left"
            imageSrc={feature2}
            imageAlt="Designers working at a laptop"
            heading={
              <>
                <HighlightPill color="mint" delay={0.3}>
                  See
                </HighlightPill>{" "}
                how we can
                <br />
                help you <StrokeAccent>progress</StrokeAccent>
              </>
            }
            body="We add a layer of fearless insight and action that helps change-makers accelerate their progress across brand, design, digital, comms and social research."
          />
        </section>

        <Services />
        <Testimonials />
      </main>

      <FooterCTA />
    </div>
  );
}
