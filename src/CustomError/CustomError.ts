class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public privateMesage: string,
  ) {
    super(message);
  }
}

export default CustomError;
