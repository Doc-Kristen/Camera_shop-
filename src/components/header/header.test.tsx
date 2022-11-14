import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ProductDetailsType } from '../../helpers/const';
import HistoryRoute from '../history-route/history-route';
import Header from './header';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    SEARCH: {
    },
    DATA: {
      ProductDetails: ProductDetailsType.Description,
    }
  }
);

describe('Component: Header', () => {
  it('should render correctly', () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <Header />
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
