export function getAuthorFiltering(docs, name) {
  return docs.filter((doc) => doc.author === name);
}

export function getTagFiltering(docs, tag) {
  return docs.filter((doc) => doc.tags.some((inputTage) => inputTage === tag));
}

export function getCategoryFiltering(docs, category) {
  return docs.filter((doc) => doc.category === category);
}
