export const expandedProperty = (context: Object, property: String) => {
  const suffix = property.split(':').pop();

  return `${context}:${suffix}`;
}

