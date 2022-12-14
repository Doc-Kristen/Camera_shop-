import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import BasketPromo from '../../components/basket-promo/basket-promo';
import BasketRemoveProductModal from '../../components/basket-remove-product-modal/basket-remove-product-modal';
import BasketSuccessOrderModal from '../../components/basket-success-order-modal/basket-succes-order-modal';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { disableBackgroundScrolling } from '../../helpers/utils';
import { useAppSelector } from '../../hooks';
import { getBasketModalRemoveOpenedStatus, getBasketProducts, getErrorOrderStatus, getOrderSuccessStatus } from '../../store/basket-process/selectors';
import { BasketProduct } from '../../types/basket';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const BasketScreen = (): JSX.Element => {

  const isModalOpened = useAppSelector(getBasketModalRemoveOpenedStatus);
  const isOrderSuccess = useAppSelector(getOrderSuccessStatus);
  const isOrderError = useAppSelector(getErrorOrderStatus);
  const counter = 1;

  const basketProductsList = useAppSelector(getBasketProducts).slice();

  disableBackgroundScrolling(isModalOpened || isOrderSuccess);

  if (isOrderError) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {basketProductsList ? basketProductsList.map((product : BasketProduct) =>
                    (
                      <BasketProductCard
                        key={product.productCard.id + counter}
                        productCard={product}
                      />)
                  ) : null}
                </ul>
                <div className="basket__summary">
                  <BasketPromo />
                  <BasketSummary />
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
      {isModalOpened && <BasketRemoveProductModal />}
      {isOrderSuccess && <BasketSuccessOrderModal />}
    </>
  );
};

export default BasketScreen;
