import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Gift, Home, Info, LucideIcon } from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  current: boolean;
};

interface NavigationContextProps {
  navigation: NavigationItem[];
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();

  const pages = [
    { title: "Início", href: "/", icon: Home },
    { title: "Contribuir", href: "/contribuir", icon: Gift },
    { title: "Sobre", href: "/sobre", icon: Info },
  ];

  const [navigation, setNavigation] = useState<NavigationItem[]>(
    pages.map((page) => ({
      ...page,
      current: pathname === page.href,
    }))
  );

  useEffect(() => {
    setNavigation((prevNav) =>
      prevNav.map((item) => ({
        ...item,
        current: item.href === pathname,
      }))
    );
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ navigation }}>
      {children}
    </NavigationContext.Provider>
  );
}
