export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/components/layout/psyTests/:path*",
    "/components/layout/journal/:path*",
    "/components/layout/moodTracker",
    "/components/layout/articles",
    "/components/layout/about-us"
  ]
};
