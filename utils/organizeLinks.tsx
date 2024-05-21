import { HeaderProps } from 'components/Header/Header';

interface HeaderPropsWithChildren extends HeaderProps {
  children: HeaderPropsWithChildren[];
}

export function organizeLinks(links: HeaderProps[]): HeaderPropsWithChildren[] {
  if (!links) {
    return [];
  }

  const linkMap: { [key: string]: HeaderPropsWithChildren } = {};

  links.forEach((link) => {
    linkMap[link.id] = { ...link, children: [] };
  });

  links.forEach((link) => {
    if (link.parentId && linkMap[link.parentId]) {
      linkMap[link.parentId].children.push(linkMap[link.id]);
    }
  });

  const topLevelLinks = Object.values(linkMap).filter(
    (link) => !link.parentId || !linkMap[link.parentId],
  );

  return topLevelLinks;
}
