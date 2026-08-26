function PartSubTitle({ title }: { title: string }) {
  return (
    <h3 className="mt-6 mb-1.5 flex items-center gap-1.5 text-base font-bold">
      <span aria-hidden="true" className="text-brand-lavender">
        /
      </span>
      {title}
    </h3>
  );
}

export default PartSubTitle;
