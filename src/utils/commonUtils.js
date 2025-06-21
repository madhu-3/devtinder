export const sendSuccess = (
  res,
  data,
  statusCode = 200,
  message = "Success"
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res,
  statusCode = 400,
  message = "Error",
  errorDetails = null
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};
