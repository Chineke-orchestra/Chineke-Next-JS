export const findBreadcrumbPaths = (path, headerMenu) => {
  const breadcrumbs = [];

  const findPath = (currentPath, headerMenu) => {
    const menuItem = headerMenu.find((item) => item.link.url === currentPath);
    if (menuItem) {
      breadcrumbs.unshift({
        url: menuItem.link.url,
        title: menuItem.link.title,
      });
      if (menuItem.parentId) {
        findPathById(menuItem.parentId, headerMenu);
      }
    }
  };

  const findPathById = (parentId, headerMenu) => {
    const parentItem = headerMenu.find((item) => item.id === parentId);
    if (parentItem) {
      breadcrumbs.unshift({
        url: parentItem.link.url,
        title: parentItem.link.title,
      });
      if (parentItem.parentId) {
        findPathById(parentItem.parentId, headerMenu);
      }
    }
  };

  findPath(path, headerMenu);

  breadcrumbs.unshift({ url: '/', title: 'Home' });

  return breadcrumbs;
};
