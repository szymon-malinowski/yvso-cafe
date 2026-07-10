type SpinnerProps = {
  label?: string;
};

export const Spinner = ({ label = "Lädt..." }: SpinnerProps) => {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="loading loading-bars loading-lg text-primary" />
      <p className="text-sm font-medium text-base-content/70">{label}</p>
    </div>
  );
};
