import { ISection } from '@type/interface';
import React from 'react';

const Section = ({ children, alignItems = 'items-center' }: ISection) => {
  return <div className={`flex flex-col w-full max-w-3xl mx-auto ${alignItems}`}>{children}</div>;
};

export default Section;
