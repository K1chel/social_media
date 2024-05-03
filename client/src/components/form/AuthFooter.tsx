import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  href: string;
};

export const AuthFooter = ({ description, href, title }: Props) => {
  return (
    <div className="flex items-center justify-center md:justify-start">
      <span className="md:text-base text-sm">
        {title}
        <Link
          to={href}
          className="ml-1 text-muted-foreground hover:underline hover:opacity-80 transition"
        >
          {description}
        </Link>
      </span>
    </div>
  );
};
