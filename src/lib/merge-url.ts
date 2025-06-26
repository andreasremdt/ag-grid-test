const mergeUrl = (base: string, path: string): string => {
  if (base.endsWith('/') && path.startsWith('/')) {
    return `${base}${path.slice(1)}`;
  }

  if (!base.endsWith('/') && !path.startsWith('/')) {
    return `${base}/${path}`;
  }

  return `${base}${path}`;
};

export default mergeUrl;
