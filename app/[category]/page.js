import { notFound } from "next/navigation";
import { CATEGORIES, BUILDS } from "../../lib/builds";
import { CategoryGrid } from "../../components/Shared";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ category: cat }));
}

export function generateMetadata({ params }) {
  const c = CATEGORIES[params.category];
  if (!c) return {};
  return { title: `${c.title} — Adam Reflects` };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  if (!CATEGORIES[category]) notFound();
  return <CategoryGrid cat={category} builds={BUILDS} />;
}
