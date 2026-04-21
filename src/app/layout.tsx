import type { Metadata } from "next";
import Layout from "@/components/Layout";
import { site } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
	title: `${site.product.name} — Feedbakkr demo`,
	description: site.product.positioning,
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
