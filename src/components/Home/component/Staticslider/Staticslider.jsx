import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider2 from '../../../../assets/images/cannon.jpg'
import Slider3 from '../../../../assets/CategoriesProductImages/slider-image-3.jpeg'
import Slider5 from '../../../../assets/images/nike-1.jpg'
import Slider6 from '../../../../assets/images/shyam-mishra-zuo1zb6mEcY-unsplash.jpg'
import Slider7 from '../../../../assets/images/julian-o-hayon-Bs-zngH79Ds-unsplash.jpg'


export default function Staticslider() {
   const slides = [Slider7 ,Slider5,Slider6,Slider2,Slider3];

  return (
    <div className="w-full h-[200px] sm:h-[350px] md:h-[500px] lg:h-[600px]  my-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
        
        className="w-full h-full rounded-2xl shadow-lg"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}
