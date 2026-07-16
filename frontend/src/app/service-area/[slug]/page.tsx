import { COUNTIES_DATA } from "@/lib/counties-data";
import CountyPageClient from "./CountyPageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const county = COUNTIES_DATA.find((c) => c.slug === slug);
  
  if (!county) {
    return { title: "County Not Found" };
  }

  return {
    title: `Solar in ${county.name}, ${county.state}`,
    description: county.blurb,
  };
}

export async function generateStaticParams() {
  return COUNTIES_DATA.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CountyPage({ params }: Props) {
  const { slug } = await params;
  const county = COUNTIES_DATA.find((c) => c.slug === slug);

  if (!county) {
    notFound();
  }

  return <CountyPageClient initialData={county} />;
}
