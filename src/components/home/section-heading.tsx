type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

// The centred heading used at the top of the About, Features and Contact sections.
export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold tracking-widest text-white uppercase">{label}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {/* short Scarlet accent line under the title */}
      <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-brand-red" />
      <p className="mt-4 text-lg font-medium text-white">{description}</p>
    </div>
  );
}
