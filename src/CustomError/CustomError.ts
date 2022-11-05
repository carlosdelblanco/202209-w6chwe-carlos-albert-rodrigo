class CustomError extends Error {
  constructor(
    messageError: string,
    public status: number,
    public message: string
  ) {
    super(messageError);
  }
}

export default CustomError;
