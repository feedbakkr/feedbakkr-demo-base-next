"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content";
import DemoModal, { DEMO_MODAL_ACK_KEY } from "./DemoModal";
import styles from "./Layout.module.css";

const NAV_ITEMS: { label: string; to: string }[] = [
	{ label: "Home", to: "/" },
	{ label: "Features", to: "/features" },
	{ label: "Docs", to: "/docs" },
	{ label: "Contact", to: "/contact" },
	{ label: "About", to: "/about" },
];

const FEEDBAKKR_SITE_URL = "https://feedbakkr.com";

function isActivePath(pathname: string, to: string): boolean {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname() ?? "/";
	const [mobileOpen, setMobileOpen] = useState(false);
	// Start closed on both server and first client render to avoid hydration
	// mismatches. The useEffect below opens the modal on first run if the user
	// hasn't yet acknowledged it.
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		try {
			if (localStorage.getItem(DEMO_MODAL_ACK_KEY) !== "1") {
				setModalOpen(true);
			}
		} catch {
			setModalOpen(true);
		}
	}, []);

	return (
		<div className={styles.shell}>
			<div className={styles.topStack}>
				<div className={styles.infoBar} role="region" aria-label="Demo information">
					<div className={styles.infoBarInner}>
						<span className={styles.infoBarLabel}>
							<span className={styles.infoBarDot} aria-hidden="true" />
							Feedbakkr demo app
						</span>
						<div className={styles.infoBarActions}>
							<a
								className={styles.infoBarLink}
								href={FEEDBAKKR_SITE_URL}
								target="_blank"
								rel="noreferrer noopener"
							>
								Visit feedbakkr.com
							</a>
							<span className={styles.infoBarDivider} aria-hidden="true">
								·
							</span>
							<button
								type="button"
								className={styles.infoBarButton}
								onClick={() => setModalOpen(true)}
							>
								About this demo
							</button>
						</div>
					</div>
				</div>

				<header className={styles.header}>
					<div className={styles.headerInner}>
						<Link href="/" className={styles.brand} onClick={() => setMobileOpen(false)}>
							<span className={styles.brandMark} aria-hidden="true" />
							<span>{site.product.name}</span>
						</Link>

						<nav className={styles.nav} aria-label="Primary">
							{NAV_ITEMS.map((item) => {
								const active = isActivePath(pathname, item.to);
								return (
									<Link
										key={item.to}
										href={item.to}
										className={
											active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
										}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>

						<button
							type="button"
							className={styles.menuButton}
							onClick={() => setMobileOpen((v) => !v)}
							aria-expanded={mobileOpen}
							aria-controls="mobile-nav"
						>
							{mobileOpen ? "Close" : "Menu"}
						</button>
					</div>

					{mobileOpen && (
						<div id="mobile-nav" className={styles.mobileNav}>
							{NAV_ITEMS.map((item) => {
								const active = isActivePath(pathname, item.to);
								return (
									<Link
										key={item.to}
										href={item.to}
										onClick={() => setMobileOpen(false)}
										className={
											active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
										}
									>
										{item.label}
									</Link>
								);
							})}
						</div>
					)}
				</header>
			</div>

			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<div>
						<p className={styles.footerNote}>{site.navigation.footerNote}</p>
						<p className={styles.footerMicro}>{site.navigation.footerMicro}</p>
					</div>
					<div className={styles.footerLinks}>
						<Link href="/docs">Docs</Link>
						<Link href="/contact">Contact</Link>
						<Link href="/about">About</Link>
					</div>
				</div>
			</footer>

			<DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</div>
	);
}
