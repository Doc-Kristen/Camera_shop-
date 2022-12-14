import { MonthsDictionary, Pagination, ratingLevels } from '../../helpers/const';
import { getRussifiedDate, sortReviewsDayDown } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import usePagination from '../../hooks/use-pagination';
import { setModalOpeningStatus } from '../../store/action';
import { getReviews, getReviewsErrorStatus } from '../../store/review-data/selectors';
import RatingStars from '../rating-stars/rating-stars';

type ReviewsListProps = {
  noReviews: boolean;
}

const ReviewsList = ({ noReviews }: ReviewsListProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const allReviews = useAppSelector(getReviews);
  const lastReviews = allReviews && allReviews.slice().sort(sortReviewsDayDown);
  const isReviewError = useAppSelector(getReviewsErrorStatus);

  const handleButtonClick = () => {
    dispatch(setModalOpeningStatus(true));
  };

  const {
    firstContentIndex,
    lastReviewIndex,
    setLastReviewIndex
  } = usePagination({
    contentPerPage: Pagination.ReviewsCount,
    count: allReviews.length,
  });

  const lastReviewsPerPage = lastReviews.slice(firstContentIndex, lastReviewIndex);

  if (isReviewError) {
    return (
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn"
              type="button"
              onClick={handleButtonClick}
            >Оставить свой отзыв
            </button>
          </div>
          <p>Ошибка при загрузке отзывов. Пожалуйста, попробуйте позже</p>
        </div>
      </section>
    );
  }

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            data-testid='review-button'
            className="btn"
            type="button"
            onClick={handleButtonClick}
          >Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          <map name=""></map>
          {
            noReviews ?
              <p>Пользователи пока не оценивали этот товар</p>
              :
              lastReviewsPerPage
                .map((review, index) => (
                  <li
                    key={review.id}
                    className="review-card"
                  >
                    <div className="review-card__head">
                      <p className="title title--h4">{review.userName}</p>
                      <time className="review-card__data" dateTime={review.createAt}>{getRussifiedDate(review.createAt, MonthsDictionary)}</time>
                    </div>
                    <div className="rate review-card__rate">
                      {
                        ratingLevels.map((level) => (
                          <RatingStars
                            productCard={review}
                            ratingLevel={level}
                            key={level}
                          />
                        ))
                      }
                      <p className="visually-hidden">Оценка: {review.rating}</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">{review.advantage}</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">{review.disadvantage}</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">{review.review}</p>
                      </li>
                    </ul>
                  </li>
                )
                )
          }
        </ul>
        <div className="review-block__buttons">
          {
            lastReviewIndex >= lastReviews.length
              ? null
              :
              <button className="btn btn--purple btn--review" type="button" onClick={
                () => {
                  setLastReviewIndex(lastReviewIndex + Pagination.ReviewsCount);
                }
              }
              >
                Показать больше отзывов
              </button>
          }

        </div>
      </div>
    </section>
  );
};

export default ReviewsList;
