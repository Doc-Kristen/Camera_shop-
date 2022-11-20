import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute, Pagination, QueryParameterType } from '../helpers/const';
import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';
import { Review, Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { redirectToRoute, setReviewErrorStatus } from './action';
import { FetchProductPayloadType, FetchProductsType } from '../types/query-parameters';

export const fetchPromoAction = createAsyncThunk<Promo, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchProductsAction = createAsyncThunk<FetchProductsType, FetchProductPayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async ({ currentPage, params }, { extra: api }) => {

    const {
      sortType,
      orderType,
      categoryType,
      productType,
      levelType,
    } = params;

    const { data, headers } = await api.get<Products>(APIRoute.Products, {
      params: {
        [QueryParameterType.Limit]: Pagination.CountCards,
        [QueryParameterType.Page]: currentPage,
        [QueryParameterType.Sort]: sortType,
        [QueryParameterType.Order]: orderType,
        [QueryParameterType.Category]: categoryType,
        [QueryParameterType.Type]: productType,
        [QueryParameterType.Level]: levelType
      }
    });
    return {
      data,
      productsTotalCount: Number(headers['x-total-count'])
    };
  },
);

export const fetchSelectedProductAction = createAsyncThunk<Product, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSelectedProduct',
  async (productId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Product>(`${APIRoute.Products}/${productId}`);
      dispatch(fetchSimilarProductsAction(productId));
      dispatch(fetchReviewsAction(productId));
      return data;
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw e;
    }
  });

export const fetchSimilarProductsAction = createAsyncThunk<Products, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarProducts',
  async (productId: number, { extra: api }) => {

    const { data } = await api.get<Products>(`${APIRoute.Products}/${productId}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (productId: number, { extra: api }) => {

    const { data } = await api.get<Reviews>(`${APIRoute.Products}/${productId}/reviews`);
    return data;
  },
);

type reviewType = {
  id: number;
  review: ReviewPost;
};

export const sendReview = createAsyncThunk<Review, reviewType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/postReview',
  async ({ id, review }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review>(APIRoute.Reviews, review);
      dispatch(fetchSelectedProductAction(id));
      return data;
    } catch (e) {
      dispatch(setReviewErrorStatus(true));
      throw e;
    }
  });

export const fetchSearchQueryAction = createAsyncThunk<Products, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchQueryAction',
  async (searchQuery, { extra: api }) => {
    const { data } = await api.get<Products>(`${APIRoute.Products}/?name_like=${searchQuery}`);
    return data;
  });
