import { IPartTitle } from '@type/interface';
import React from 'react';

const PartTitle = ({ title }: IPartTitle) => {
  return <div className={'text-base font-semibold'}>[{title}]</div>;
};

export default PartTitle;
