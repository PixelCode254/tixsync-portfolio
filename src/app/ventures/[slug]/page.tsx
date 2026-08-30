"use client";

import VentureBridge from "@/components/sections/venture-bridge";

export default function VenturePage({ params }: { params: { slug: string } }) {
  return <VentureBridge slug={params.slug} />;
}
