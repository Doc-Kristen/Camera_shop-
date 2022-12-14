import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductDetailed from '../../components/product-detailed/product-detailed';
import ProductsSimilar from '../../components/products-similar/products-similar';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDataLoadedStatus, getSelectedProduct, getSelectedProductErrorStatus, getSimilarProductErrorStatus, getSimilarProducts } from '../../store/product-data/selectors';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSelectedProductAction } from '../../store/api-actions';
import Loading from '../../components/loading/loading';
import { getReviews, getReviewsErrorStatus } from '../../store/review-data/selectors';
import { getFormOpenedStatus, getReviewSuccessStatus } from '../../store/user-process/selectors';
import ReviewModal from '../../components/review-modal/review-modal';
import ReviewSuccess from '../../components/review-success/review-success';
import { getBasketModalOpenedStatus, getBasketSuccessStatus, getCurrentCatalogProduct } from '../../store/basket-process/selectors';
import BasketModal from '../../components/basket-modal/basket-modal';
import BasketSuccessModal from '../../components/basket-success-modal/basket-success-modal';
import { disableBackgroundScrolling } from '../../helpers/utils';

const ProductScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const ProductId = Number(id);

  const productDetailed = useAppSelector(getSelectedProduct);
  const currentCatalogProduct = useAppSelector(getCurrentCatalogProduct);
  const similarProducts = useAppSelector(getSimilarProducts);
  const productIsError = useAppSelector(getSelectedProductErrorStatus);
  const productIsLoaded = useAppSelector(getDataLoadedStatus);
  const isReviewError = useAppSelector(getReviewsErrorStatus);
  const isReviewSuccess = useAppSelector(getReviewSuccessStatus);
  const allReviews = useAppSelector(getReviews);
  const productsSimilarIsError = useAppSelector(getSimilarProductErrorStatus);
  const isFormOpened = useAppSelector(getFormOpenedStatus);
  const isBasketModalOpened = useAppSelector(getBasketModalOpenedStatus);
  const isBasketSuccess = useAppSelector(getBasketSuccessStatus);

  disableBackgroundScrolling(isFormOpened || isReviewSuccess || isBasketSuccess || isBasketModalOpened);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = () => {
        dispatch(fetchSelectedProductAction(ProductId));
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [ProductId, dispatch, productIsError]);

  if (productIsLoaded) {
    return (<Loading />);
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs
              productName={productDetailed?.name}
            />
            <div className="page-content__section">
              {
                productDetailed
                  ?
                  <ProductDetailed
                    productDetailed={productDetailed}
                  />
                  : null
              }
            </div>
            {
              !productsSimilarIsError && similarProducts.length === 0 ?
                null
                :
                <ProductsSimilar
                  productsSimilar={similarProducts}
                />
            }
            <div className="page-content__section">
              {
                <ReviewsList
                  noReviews={!isReviewError && allReviews.length === 0}
                />
              }
            </div>
          </div>
        </main>
        <button
          className="up-btn" type="button"
          onClick={
            () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }
          }
        >
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </button>
        <Footer />
      </div>
      {isFormOpened && <ReviewModal />}
      {isReviewSuccess && <ReviewSuccess />}
      {isBasketSuccess && <BasketSuccessModal />}
      {isBasketModalOpened && currentCatalogProduct && <BasketModal productCard={currentCatalogProduct} />}
    </>
  );
};

export default ProductScreen;
