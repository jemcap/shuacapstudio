import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavigationProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: MenuItem[];
}

const defaultLogo = {
  url: "/",
  src: "/shuacapstudio-logo.png",
  alt: "Shuacap Studio Logo",
};

const defaultMenu: MenuItem[] = [
  { title: "PROJECTS", url: "/work" },
  { title: "PRODUCTS", url: "/products" },
  { title: "SERVICES", url: "/services" },
  { title: "CONTACT", url: "/contact" },
];

const Navigation = ({
  logo = defaultLogo,
  menu = defaultMenu,
}: NavigationProps) => {

  return (
    <section className="py-2 w-full">
      <div className="align-elements mx-auto flex items-center justify-between">

        <nav className="hidden lg:flex w-full">
          <div className="flex items-center w-full">

            <div className="flex-shrink-0">
              <Logo logo={logo} />
            </div>
            
            <div className="flex-1 flex justify-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => (
                    <DesktopMenuItem key={item.title} item={item} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex-shrink-0 w-32"></div>
          </div>
        </nav>

        <div className="block lg:hidden w-full">
          <div className="flex items-center justify-between w-full">
            <Logo logo={logo} />
            <MobileMenu menu={menu} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Logo = ({ logo }: { logo: NavigationProps['logo'] }) => (
  <Link href={logo!.url} className="flex items-center gap-2">
    <img 
      src={logo!.src} 
      className="max-h-8" 
      alt={logo!.alt} 
      loading="eager" 
    />
  </Link>
);

// Desktop Menu Item Component
const DesktopMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-white"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// Mobile Menu Component
const MobileMenu = ({ menu }: { menu: MenuItem[] }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button size="icon">
        <Menu className="size-5" />
      </Button>
    </SheetTrigger>
    <SheetContent className="overflow-y-auto bg-black/90 backdrop-blur-sm text-white w-[80vw]">
      <div className="flex flex-col gap-6 p-4 mt-28">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-5 text-end text-4xl uppercase"
        >
          {menu.map((item) => (
            <MobileMenuItem key={item.title} item={item} />
          ))}
        </Accordion>
      </div>
    </SheetContent>
  </Sheet>
);

// Mobile Menu Item Component
const MobileMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <AccordionItem value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

// Submenu Link Component
const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <a
    className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
    href={item.url}
  >
    {item.icon && (
      <div className="text-foreground">{item.icon}</div>
    )}
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </a>
);

export default Navigation;
