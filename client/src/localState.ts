import { makeVar } from '@apollo/client';

type Sort = {
  by: string;
  direction: string;
};

type Filter = {
  author: string | undefined;
  tag: string | undefined;
  journal: string | undefined;
  yearStart: number | undefined;
  yearEnd: number | undefined;
};

type Loading = {
  filterBoard: boolean;
  articleList: boolean;
};

export const filterInitial = {
  author: undefined,
  tag: undefined,
  journal: undefined,
  yearStart: 2000,
  yearEnd: 2021,
};

export const sortInitial = {
  by: 'date',
  direction: 'desc',
};

export const loadingInitial = {
  filterBoard: false,
  articleList: false,
};

export const currentPageInitial = 1;

export const isResettingInitial = false;

export const filterVar = makeVar<Filter>(filterInitial);
export const sortVar = makeVar<Sort>(sortInitial);
export const loadingVar = makeVar<Loading>(loadingInitial);
export const currentPageVar = makeVar<number>(currentPageInitial);
export const isResettingVar = makeVar<boolean>(isResettingInitial);
