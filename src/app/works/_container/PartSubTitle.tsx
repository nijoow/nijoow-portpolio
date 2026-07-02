const PartSubTitle = ({ title }: { title: string }) => {
  return (
    <div className="mt-6 mb-1.5 flex items-center gap-1.5 text-base font-extrabold">
      <span className="text-purple-light">/</span>
      {title}
    </div>
  );
};

export default PartSubTitle;
