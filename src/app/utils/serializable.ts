export class Serializable {
  serialize(): string {
    const str = [];
    for (const p in this) {
      if (this.hasOwnProperty(p) && this[p] != null) {
        if (Object.prototype.toString.call(this[p]) === '[object Date]') {
          const date = new Date(this[p].toString());
          const year = date.getFullYear();
          const month = date.getMonth() + 1  < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
          const day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate();
          const dateString = year + '-' + month  + '-' + day + 'T00:00:00';
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(dateString));
        } else if ((this[p])  && (this[p].toString()) !== '') {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(this[p].toString()));
        }
      }
    }
    return str.join('&');
  }
}
