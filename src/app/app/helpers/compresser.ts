export class Compresser {

  private static get LZUTF8(): any {
    return typeof window !== 'undefined' ? (window as any).LZUTF8 : null;
  }

  /**
   * compress string
   * @param string
   */
  public static compress(string: any) {
    if (!string || !this.LZUTF8) {
      return null;
    }
    return this.LZUTF8.compress(string, {
      outputEncoding: 'BinaryString'
    });
  }

  /**
   * decompress string
   * @param string
   */
  public static decompress(string: any) {
    if (!string || !this.LZUTF8) {
      return null;
    }
    return this.LZUTF8.decompress(string, {
      inputEncoding: 'BinaryString'
    });
  }

}
