import { StoreSlice } from '../../const';
import type { State } from '../../types/state';
import type { SortName } from '../../types/types';

export const getSorting = ({
  [StoreSlice.SiteProcess]: SITE_PROCESS,
}: State): SortName => SITE_PROCESS.sorting;
