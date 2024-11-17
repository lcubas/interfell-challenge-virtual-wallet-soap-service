export class Responder {
  static success(data?: object | object[]) {
    return {
      success: true,
      cod_error: 200,
      message_error: '',
      data: data ? JSON.stringify(data) : JSON.stringify({}),
    };
  }

  static error(message: string, errorCode: number = 500) {
    return {
      success: false,
      cod_error: errorCode,
      message_error: message,
      data: JSON.stringify({}),
    };
  }
}
