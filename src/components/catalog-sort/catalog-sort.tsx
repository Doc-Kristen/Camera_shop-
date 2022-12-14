import { ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderType, QueryParameterType, SortingType } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';
import { getDataLoadedStatus, getProducts } from '../../store/product-data/selectors';

const CatalogSort = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { search } = useAppSelector(getCurrentCatalogPath);
  const isProductsLoaded = useAppSelector(getDataLoadedStatus);
  const products = useAppSelector(getProducts);

  useEffect(() => {
    if (searchParams.has(QueryParameterType.Sort) && !searchParams.has(QueryParameterType.Order)) {
      searchParams.set(QueryParameterType.Order, OrderType.Asc);
      setSearchParams(searchParams);
    }

    if (!searchParams.has(QueryParameterType.Sort) && searchParams.has(QueryParameterType.Order)) {
      searchParams.set(QueryParameterType.Sort, SortingType.Price);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name } = target;
    const value = target.getAttribute('data-value');

    switch (name) {
      case QueryParameterType.Sort:
        searchParams.set(QueryParameterType.Sort, String(value));
        break;
      case QueryParameterType.Order:
        searchParams.set(QueryParameterType.Order, String(value));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                data-testid="sort-price-input"
                type="radio"
                id="sortPrice"
                name="_sort"
                data-value="price"
                onChange={handleInputChange}
                checked={search?.includes('_sort=price') || false}
                disabled={isProductsLoaded || products.length === 0}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                data-testid="sort-popular-input"
                data-value="rating"
                name="_sort"
                checked={search?.includes('_sort=rating') || false}
                onChange={handleInputChange}
                disabled={isProductsLoaded || products.length === 0}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="_order"
                data-testid="order-up"
                data-value="asc"
                checked={search?.includes(OrderType.Asc) || false}
                onChange={handleInputChange}
                disabled={isProductsLoaded || products.length === 0}
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                data-testid="order-down"
                data-value="desc"
                name="_order"
                aria-label="По убыванию"
                checked={search?.includes(OrderType.Desc) || false}
                disabled={isProductsLoaded || products.length === 0}
                onChange={handleInputChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatalogSort;
