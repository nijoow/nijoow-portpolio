import { IChildren } from '@type/interface';
import React from 'react';

const Section = ({ children }: IChildren) => {
  return <div className="flex flex-col items-center w-full max-w-3xl mx-auto">{children}</div>;
};

export default Section;
