export const MAX_OTP_LENGTH = 8;

export function isOtpValid(otp: Array<string> | string): boolean {
  if (Array.isArray(otp)) {
    const filteredOtp = otp.filter((val) => val.trim() !== '');
    return filteredOtp.join('').length === MAX_OTP_LENGTH;
  }
  return otp.length === MAX_OTP_LENGTH;
}
