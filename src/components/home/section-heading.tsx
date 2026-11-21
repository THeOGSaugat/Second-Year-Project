type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
  // true when the heading sits on a blue background (text becomes white)
  onBlue?: boolean;
};

// The centred heading used at the top of the About, Features and Contact sections.
export function SectionHeading({
  label,
  title,
  description,
  onBlue = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-semibold tracking-widest uppercase ${onBlue ? "text-white" : "text-slate-600"}`}
      >
        {label}
      </p>
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${onBlue ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {/* short accent line under the title */}
      <div
        className={`mx-auto mt-4 h-1 w-14 rounded-full ${onBlue ? "bg-white" : "bg-brand-red"}`}
      />
      <p className={`mt-4 text-lg ${onBlue ? "text-white" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
}
