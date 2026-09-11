import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { services } from "@/lib/data/services";
import { ServiceDetail } from "@/components/sections/service-detail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Nexora Incodeon",
    };
  }

  return {
    title: `${service.title} | Nexora Incodeon`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}