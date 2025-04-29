interface MenuItem {
  title?: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    alt: "SHUACAP STUDIO logo",
    title: "SHUACAPSTUDIO",
    url: "https://instagram.com/shuacapstudio",
  },
  menuItems = [
    {
      links: [
        { text: "Instagram", url: "https://instagram.com/shuacapstudio" },
        { text: "YouTube", url: "https://www.youtube.com/@shuacapstudio" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} shuacapstudio.com. All rights reserved.`,
}: FooterProps) => {
  return (
    <section className="py-28  bg-black text-white">
      <div className="container align-element">
        <footer>
          <div className="flex flex-col">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <p className="text-xl font-semibold">{logo.title}</p>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul>
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-gray-400"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium  md:flex-row md:items-center">
            <p>{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
