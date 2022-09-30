import { Promo } from '../../types/promo';

type BannerProps = {
  promo: Promo;
}

const Banner = ({ promo }: BannerProps): JSX.Element => {
  const { name, previewImg, previewImgWebp, previewImgWebp2x } = promo;
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImg}, ${previewImgWebp}, ${previewImgWebp2x} 2x`} />
        <img src={previewImg} srcSet={previewImgWebp2x} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><a className="btn" href="/#">Подробнее</a></p>
    </div>
  );
};

export default Banner;
