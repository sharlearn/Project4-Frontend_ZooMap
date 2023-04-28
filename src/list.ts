export interface AnimalDescription {
  title: string;
  content: string;
}

export interface IucnDescription {
  title: string;
  description: string;
}

export interface Animal {
  id: number;
  name: string;
  bannerUrl: string;
  iconUrl: string;
  description: AnimalDescription[];
  lifespan: string;
  diet: string;
  habitat: string;
  iucnStatus: string;
  range: string;
  iucnDescription: IucnDescription[];
}
