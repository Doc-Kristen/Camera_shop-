import { NameSpace } from '../../helpers/const';
import { Products } from '../../types/product';
import { State } from '../../types/state';

export const getsearchedProducts = (state: State): Products | undefined => state[NameSpace.Search].searchedProducts;