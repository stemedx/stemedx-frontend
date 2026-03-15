import Link from "next/link";
import { HeaderWrapper } from "@/components/server/header-wrapper";
import { Footer } from "@/components/layouts/footer";

export default function NotFound() {
  return (
    <>
      <HeaderWrapper />
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary-gradient text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
      <Footer />
    </>
  );
}
