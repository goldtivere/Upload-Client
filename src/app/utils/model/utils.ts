import {Serializable} from '../serializable';
export class Utils extends Serializable {
  start = 0;
  limit = 10;

  createPageRange(beginIndex: number, endIndex: number): number[] {
    const range: number[] = [];
    for (let i = beginIndex; i <= endIndex; i++) {
      range.push(i);
    }
    return range;
  }

  dateToString(date: Date) {
    console.log(date)
    const year = date.getFullYear();
    const month = date.getMonth() + 1  < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const dateString = year + '-' + month  + '-' + day + 'T' + hour + ':' + minutes + ':00';
    console.log(dateString)
    return dateString;
  }
}
