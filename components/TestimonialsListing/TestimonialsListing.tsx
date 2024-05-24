import TestimonialCard, {
  I_Testimonial,
} from 'components/TestimonialCard/TestimonialCard';
import styles from './TestimonialsListing.module.scss';
import { useState } from 'react';
import { useViewport } from 'utils/viewport';

const TestimonialsListing = (props: {
  title: string;
  testimonials: I_Testimonial[];
}) => {
  const { isMobile } = useViewport();
  let numberOfTestimonials = isMobile ? 3 : 6;
  const [showButton, setShowButton] = useState(true);
  const [slicedTestimonials, setSlicedTestimonials] = useState(
    props.testimonials.slice(0, numberOfTestimonials),
  );

  const loadMoreHandler = () => {
    setSlicedTestimonials((prev) => [
      ...prev,
      ...props.testimonials.slice(
        numberOfTestimonials,
        props.testimonials.length,
      ),
    ]);
    setShowButton(false);
  };

  return (
    <div className={styles.testimonials_listing}>
      <div className="container">
        <h2>{props.title}</h2>
        <div className={styles.testimonials_container}>
          {slicedTestimonials?.map((item, index) => {
            return <TestimonialCard {...item} key={index} />;
          })}
        </div>
        {showButton && (
          <button className="btn large yellow" onClick={loadMoreHandler}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialsListing;
