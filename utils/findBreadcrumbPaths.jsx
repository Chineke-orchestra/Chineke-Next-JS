export const findBreadcrumbPaths = (path, headerMenu) => {
  const breadcrumbs = [];

  const findPath = (currentPath, headerMenu) => {
    const menuItem = headerMenu.find((item) => item.link.url === currentPath);
    if (menuItem) {
      breadcrumbs.unshift(menuItem.link.url);
      if (menuItem.parentId) {
        findPathById(menuItem.parentId, headerMenu);
      }
    }
  };

  const findPathById = (parentId, headerMenu) => {
    const parentItem = headerMenu.find((item) => item.id === parentId);
    if (parentItem) {
      breadcrumbs.unshift(parentItem.link.url);
      if (parentItem.parentId) {
        findPathById(parentItem.parentId, headerMenu);
      }
    }
  };

  findPath(path, headerMenu);

  return breadcrumbs;
};
