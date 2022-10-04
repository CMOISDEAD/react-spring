type Props = {
  title: string;
  subtitle: string;
};

export const SectionHeader = ({ title, subtitle }: Props): any => {
  return (
    <div className="flex flex-row justify-between py-5">
      <p className="text-xl font-bold">{title}</p>
      <a className="text-sm text-gray-500 underline" href="#">
        {subtitle}
      </a>
    </div>
  );
};
