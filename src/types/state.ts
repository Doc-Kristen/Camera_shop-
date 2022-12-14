import { store } from '../store/index';
import { BasketProducts } from './basket';
import { Product, Products } from './product';
import { Promo } from './promo';
import { Reviews } from './review';

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type UserProcess = {
    isFormOpened: boolean;
    isFormBlocked: boolean;
    isReviewPosted: boolean;
    isErrorSendingReview: boolean;
    isReviewSuccess: boolean;
};

type ReviewData = {
    reviews: Reviews;
    isReviewsError: boolean;
    isReviewsLoaded: boolean;
}

type ProductData = {
    promo?: Promo;
    isPromoError: boolean;
    isDataLoaded: boolean;
    isProductsError: boolean;
    isRangeByPriceError: boolean;
    isSimilarProductError: boolean;
    isSelectedProductError: boolean;
    products: Products;
    pagesCount: number;
    selectedProduct: Product;
    similarProducts: Products;
    productDetails: string;
    minProductPrice: string | number;
    maxProductPrice: string | number;
}

type SearchData = {
    searchedProducts?: Products | null;
    isSearchedProductsError: boolean;
}

type SortingProcess = {
    sortingType: string;
    orderType: string;
}

type BasketProcess = {
    isBasketModalOpened: boolean;
    isBasketRemoveProductModalOpened: boolean;
    isBasketSuccess: boolean;
    isCouponValid?: boolean;
    isCouponPosted: boolean;
    isOrderSuccess: boolean;
    isOrderError: boolean;
    isOrderPosted: boolean;
    currentCatalogProduct: Product;
    basketProducts: BasketProducts;
    discountPercent: null | number;
    coupon?: string;
}

export type {
  State,
  AppDispatch,
  UserProcess,
  ReviewData,
  ProductData,
  SearchData,
  SortingProcess,
  BasketProcess
};
