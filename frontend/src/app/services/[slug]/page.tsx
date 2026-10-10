import { getServiceBySlug, getAllServiceSlugs, SERVICES_DATA } from "@/lib/services-data";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Accutek Solar",
      description: "Service details not found.",
    };
  }

  return {
    title: `${service.title} | Accutek Solar`,
    description: `${service.shortDesc} Expert design, installation, and repair across Indiana and Illinois by Accutek Solar.`,
    openGraph: {
      title: `${service.title} | Accutek Solar`,
      description: service.shortDesc,
      images: service.photos.length > 0 ? [{ url: service.photos[0].src }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} allServices={SERVICES_DATA} />;
}
