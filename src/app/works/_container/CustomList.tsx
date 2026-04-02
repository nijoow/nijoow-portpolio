import React from 'react';

const CustomList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-col gap-1">{children}</ul>
);

const MainListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mt-1.5">
    <span className="pr-2.5">▪︎</span>
    {children}
  </li>
);
const SubListItem = ({
  children,
  showBullet = true,
}: {
  children: React.ReactNode;
  showBullet?: boolean;
}) => (
  <li className="pl-4">
    {showBullet && <span className="pr-2.5">▫︎</span>}
    {children}
  </li>
);

export default Object.assign(CustomList, {
  MainListItem,
  SubListItem,
});
