import React, { ReactNode } from "react";
import routes from "@/routes/routes";
import i18n from "@/i18n/i18n-es.json";
import Link from "next/link";

const links = [
  { route: routes.createGame, label: i18n.labelCreateGame },
  { route: routes.createCampus, label: i18n.labelCreateCampus },
];

interface BackofficeLayoutProps {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: BackofficeLayoutProps) => {
  return (
    <>
      <nav style={{ backgroundColor: "blue", zIndex: "2" }}>
        <ul>
          {links.map(({ route, label }) => {
            return (
              <li key={route}>
                <Link href={route}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {children}
    </>
  );
};

export default BackofficeLayout;
