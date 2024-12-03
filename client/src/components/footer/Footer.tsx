import { Youtube, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { href: "https://www.youtube.com/@sahalkk2210", Icon: Youtube, label: "YouTube" },
    { href: "https://www.linkedin.com/in/muhammedsahalkk", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/sahhhall", Icon: Twitter, label: "Twitter" },
  ];

  return (
    <footer className=" mx-auto py-11 flex flex-col   justify-center max-w-[80%] text-gray-400 ">
      <hr className="text-blue-400" />

      <div className=" flex py-2 pt-10 flex-row  items-center space-x-4 mx-auto">
        {socialLinks.map(({ href, Icon, label }, index) => (
          <a
            key={index}
            href={href}
            className="hover:text-gray-200 focus:text-gray-200 focus:outline-none"
            aria-label={label}
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>
      <div className=" items-center flex flex-col mx-auto">
        <span className="text-xs">
          Copyright © 2024 roadmappro.site All rights reserved.
        </span>
        <span className="text-xs">contact: support@roadmappro.site</span>
      </div>
    </footer>
  );
};

export default Footer;
