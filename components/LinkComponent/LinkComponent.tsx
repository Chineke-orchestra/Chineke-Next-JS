import Link from 'next/link';
import { I_Link } from 'types/index';
import { ReactElement } from 'react';

const LinkComponent = (props: {
  link: I_Link;
  children: ReactElement | string;
  className?: string;
}) => {
  return (
    <Link
      className={props.className}
      href={props?.link?.url || '/'}
      target={props.link.target}
      rel={props.link.rel}
    >
      {props.children}
    </Link>
  );
};

export default LinkComponent;
