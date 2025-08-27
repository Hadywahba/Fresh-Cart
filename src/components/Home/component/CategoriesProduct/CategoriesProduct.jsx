import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./CategoriesProduct.module.css";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
export default function CategoriesProduct() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    return data;
  }

  const { data } = useQuery({
    queryKey: ["categoryProduct"],
    queryFn: getCategories,
    select: (data) => data?.data,
  });

  return (
    <div className="container px-5 py-8">
      <h1 className=" text-lg font-semibold sm:text-3xl sm:font-semibold  ">
        Shop Popular Categories
      </h1>
      <Slider {...settings} className="my-11">
        {data?.map((category) => (
          <div key={category.id}>
            <img
              className={`${styles.CategoriesProduct} w-full`}
              src={category.image}
              alt=""
            />
            <h2 className="  text-center my-3  ">{category.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
