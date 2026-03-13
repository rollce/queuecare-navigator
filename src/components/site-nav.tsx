"use client";

import { LocalHospital, PsychologyAlt, Place, Quiz } from "@mui/icons-material";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Overview", icon: <LocalHospital fontSize="small" /> },
  { href: "/triage", label: "Triage", icon: <PsychologyAlt fontSize="small" /> },
  { href: "/clinics", label: "Clinics", icon: <Place fontSize="small" /> },
  { href: "/faq", label: "FAQ", icon: <Quiz fontSize="small" /> },
];

export function SiteNav() {
  const pathname = usePathname();
  const current = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? "/";

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: "1px solid rgba(19,23,37,0.12)" }}>
      <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", px: { xs: 2, md: 3 }, flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "start", md: "center" }, gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          QueueCare Navigator
        </Typography>
        <Box sx={{ width: "100%", flex: 1 }}>
          <Tabs value={current} variant="scrollable" allowScrollButtonsMobile>
            {items.map((item) => (
              <Tab
                key={item.href}
                value={item.href}
                label={item.label}
                icon={item.icon}
                iconPosition="start"
                component={Link}
                href={item.href}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
