function validate(schema, body) {
  const { error } = schema.validate(body);
  if (error !== undefined) {
    throw new Error(`Check response! Schema is not valid. Error is ${error}`);
  }
}

export default validate;
