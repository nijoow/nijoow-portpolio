export interface IChildren {
  children: React.ReactNode;
}

export interface ISection extends IChildren {
  alignItems?: 'items-start' | 'items-end' | 'items-center' | 'items-baseline' | 'items-stretch';
}

export interface IPartTitle {
  title: string;
}

export interface IMusic {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export interface IWorkImage {
  url: string;
  imgSrc: string | undefined | null;
}

export interface ISkill {
  fileName: string;
  name: string;
}
export interface ISkillGrid {
  skills: ISkill[];
}
