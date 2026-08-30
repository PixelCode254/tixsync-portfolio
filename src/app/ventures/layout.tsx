import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Bridge",
  description: "Secure redirect to TIXSYNC SOLUTIONS — enterprise digital solutions.",
};

export default function VenturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
