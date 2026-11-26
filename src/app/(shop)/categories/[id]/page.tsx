import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa6";

import {
  getAllSubcategories,
  getCategory,
} from "@/actions/shop.actions";
import { Container } from "@/components/layout/container";

type CategoryPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const category = await getCategory(id);
    return {
      title: `${category.name} Subcategories | FreshCart`,
      description: `Browse subcategories in ${category.name}.`,
    };
  } catch {
    return { title: "Category | FreshCart" };
  }
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { id } = await params;

  let category;
  try {
    category = await getCategory(id);
  } catch {
    notFound();
  }

  const subcategories = (await getAllSubcategories()).slice(0, 40);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <Container className="py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              <Image
                src={category.image ?? "/images/shared/freshcart-logo.svg"}
                alt={category.name}
                width={64}
                height={64}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.name}
              </h1>
              <p className="text-white/80 mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Back to Categories</span>
        </Link>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {subcategories.length} Subcategories in {category.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory._id}
              href={`/products?subcategory=${subcategory._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <FaFolderOpen className="text-2xl text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors mb-2">
                {subcategory.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Browse Products</span>
                <FaArrowRight className="text-xs" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
