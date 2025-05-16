import React from 'react';

const CustomList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-col gap-1">{children}</ul>
);

const MainListItem = ({ children }: { children: React.ReactNode }) => (
  <li>
    <span className="pr-2.5">▪︎</span>
    {children}
  </li>
);
const SubListItem = ({ children }: { children: React.ReactNode }) => (
  <li>
    <span className="pl-4 pr-2.5">▫︎</span>
    {children}
  </li>
);

export default Object.assign(CustomList, {
  MainListItem,
  SubListItem,
});
