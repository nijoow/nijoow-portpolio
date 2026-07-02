import React from 'react';

const CustomList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex w-full flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5">
    {children}
  </ul>
);

const MainListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mt-1.5 flex gap-2.5 text-[15px] break-keep first:mt-0">
    <span className="bg-purple-light/80 mt-2 size-1.5 shrink-0 rounded-full" />
    <div className="min-w-0">{children}</div>
  </li>
);
const SubListItem = ({
  children,
  showBullet = true,
}: {
  children: React.ReactNode;
  showBullet?: boolean;
}) => (
  <li className="flex gap-2.5 pl-4 text-sm leading-relaxed break-keep text-white/60">
    {showBullet && (
      <span className="mt-2 size-1 shrink-0 rounded-full bg-white/40" />
    )}
    <div className="min-w-0">{children}</div>
  </li>
);

export default Object.assign(CustomList, {
  MainListItem,
  SubListItem,
});
