import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    publicRoutes: ["/"],
    apiRoutes: ["/api"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};