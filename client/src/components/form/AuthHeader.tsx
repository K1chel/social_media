type Props = {
  title: string;
  description: string;
};

export const AuthHeader = ({ description, title }: Props) => {
  return (
    <div className="flex items-center md:items-start flex-col">
      <h5 className="md:text-2xl text-xl font-semibold">{title}</h5>
      <p className="text-sm md:text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
