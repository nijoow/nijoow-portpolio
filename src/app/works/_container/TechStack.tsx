interface Props {
  stacks: readonly string[];
}

function TechStack({ stacks }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stacks.map((stack) => (
        <span
          key={stack}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/70"
        >
          {stack}
        </span>
      ))}
    </div>
  );
}

export default TechStack;
