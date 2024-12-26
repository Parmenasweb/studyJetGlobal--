/**
 * Serializes MongoDB ObjectIds and Dates in a document
 * @param {Object} doc - The document to serialize
 * @returns {Object} - The serialized document
 */
export function serializeDocument(doc) {
  if (!doc) return null;

  // Handle arrays
  if (Array.isArray(doc)) {
    return doc.map(item => serializeDocument(item));
  }

  // Handle objects
  if (typeof doc === 'object' && doc !== null) {
    const serialized = {};
    for (const [key, value] of Object.entries(doc)) {
      if (key === '_id') {
        serialized[key] = value.toString();
      } else if (value instanceof Date) {
        serialized[key] = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        serialized[key] = serializeDocument(value);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  return doc;
}

/**
 * Serializes a Mongoose document or array of documents
 * @param {Object|Array} data - The data to serialize
 * @returns {Object|Array} - The serialized data
 */
export function serializeMongoose(data) {
  // First convert to plain object if it's a Mongoose document
  const plainData = data?.toObject ? data.toObject() : data;
  return serializeDocument(plainData);
} 