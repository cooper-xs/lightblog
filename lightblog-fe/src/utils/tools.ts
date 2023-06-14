import { SHA256 } from 'crypto-js';

export default class tools {
  // 将"年月日"格式的字符串转换为Date对象
  public static stringToDate(dateString: string): Date {
    const dateParts = dateString.split(/[年月日]/); // 将日期字符串按照年月日分隔成三个部分
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    const isoDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const date = new Date(isoDateString);
    return date;
  }

  public static generateKey(password: string, salt: string): string {
    return SHA256(password + salt).toString();
  }

  /** 检查邮箱格式是否正确 */
  public static checkEmail(email: string): boolean {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(email);
  }
}
