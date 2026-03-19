interface Props {
  stacks: string[];
}

const TechStack = ({ stacks }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {stacks.map((stack) => (
        <span
          key={stack}
          className="rounded-md bg-zinc-600 px-1.5 pt-0.5 text-[13px] font-medium text-zinc-100"
        >
          {stack}
        </span>
      ))}
    </div>
  );
};

export default TechStack;
