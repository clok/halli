/**
 * IRGB rgba representation of a color
 */
export type IRGB = {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly a: number
}

/**
 * IHexColorString is a standard CSS HTML color code. Example: '#AB12F8'
 */
export type IHexColorString = string

/**
 * IHexColorNumber is a hexadecimal number representation of a color. Example: 0xab12f8
 */
export type IHexColorNumber = number

export type IRGBACSSString = `rgba(${number}, ${number}, ${number}, ${number})`

const hexCheck = new RegExp('^#?[0123456789abcdefABCDEF]{1,6}$')

export class Halli {
  colors: IHexColorString[]
  triColors: IHexColorString[]

  /**
   * Initialize object with a default 10 color array fading from
   * White to Red and with a Tri-Color array from Green to Yellow
   * to Red gradient with 10 steps between each source color.
   */
  constructor() {
    // Generate default Colors Array with White to Red in 10 steps
    this.colors = this.genHexArray(0xffffff, 0xff0000, 10)

    // Generate default triColors Array with Green to Yellow to Red
    this.triColors = this.genMultiHexArray([0x00ff00, 0xffff00, 0xff0000], 50)
  }

  /**
   * Break down hex value into RGB components
   *
   * @param input - hexadecimal IHexColorNumber or IHexColorString representing color
   * @returns R, G, B codes
   */
  private static getRGBComponents(
    input: IHexColorNumber | IHexColorString,
  ): IRGB {
    const hex = Halli.convertToNumber(input)
    const r = hex >> 16
    const g = (hex >> 8) & 0xff
    const b = hex & 0xff

    return {r, g, b, a: 255}
  }

  /**
   * Convert IHexColorNumber or IHexColorString to IHexColorNumber
   *
   * @param input - convert a hex code string to a number
   * @returns Number
   */
  protected static convertToNumber(
    input: IHexColorNumber | IHexColorString,
  ): IHexColorNumber {
    if (typeof input === 'string') {
      if (hexCheck.test(input)) {
        return Number(`0x${Halli.frontPad(input.replace('#', ''))}`)
      }
      return Number(input)
    }
    return input
  }

  /**
   * Useful for checking front padding of a hex color code
   *
   * @param hexStr - string representation of hex color code
   * @returns 0 front padded hex color code
   */
  private static frontPad(hexStr: string): IHexColorString {
    while (hexStr.length < 6) {
      hexStr = '0' + hexStr
    }
    return hexStr
  }

  /**
   * Select a color between color 1 (hc1) and color 2 (hc2)
   * based on an input ratio that denotes the point in the
   * gradient color should be selected from.
   *
   * @param hc1 - hexadecimal number representing color
   * @param hc2 - hexadecimal number representing color
   * @param ratio - the point in the gradient color to be selected
   * @returns IHexColorString color code in string form
   */
  public pickHex(
    hc1: IHexColorNumber | IHexColorString,
    hc2: IHexColorNumber | IHexColorString,
    ratio: number,
  ): IHexColorString {
    if (ratio > 1) ratio = 1

    // Break hc1 into RGB components
    const {r, g, b} = Halli.getRGBComponents(hc1)

    // RGB Delta between hc1 and hc2
    const {r: r2, g: g2, b: b2} = Halli.getRGBComponents(hc2)
    const rd = r2 - r
    const gd = g2 - g
    const bd = b2 - b

    // Calculate new color
    return `#${Halli.frontPad(
      (
        ((r + rd * ratio) << 16) |
        ((g + gd * ratio) << 8) |
        (b + bd * ratio)
      ).toString(16),
    )}`
  }

  /**
   * Select n=steps colors between color 1 (hc1) and color 2 (hc2)
   * and populate a return array.
   *
   * @param hc1 - hexadecimal number representing color
   * @param hc2 - hexadecimal number representing color
   * @param steps - the number of colors to generate between two colors
   * @returns array of string hex color codes
   */
  public genHexArray(
    hc1: IHexColorNumber | IHexColorString,
    hc2: IHexColorNumber | IHexColorString,
    steps: number,
  ): IHexColorString[] {
    const colorArray: IHexColorString[] = []

    // Place source color in as first element
    colorArray[0] = `#${Halli.frontPad(hc1.toString(16)).replace('#', '')}`

    // Break hc1 into RGB components
    const {r, g, b} = Halli.getRGBComponents(hc1)

    // RGB Delta between hc1 and hc2
    const {r: r2, g: g2, b: b2} = Halli.getRGBComponents(hc2)
    const rd = r2 - r
    const gd = g2 - g
    const bd = b2 - b

    // smoother gradient
    steps++

    // Determine new colors
    for (let i = 1; i < steps; i++) {
      // Where are we on the gradient?
      const ratio = i / steps

      // Calculate new color and add it to the array
      colorArray[i] = `#${Halli.frontPad(
        (
          ((r + rd * ratio) << 16) |
          ((g + gd * ratio) << 8) |
          (b + bd * ratio)
        ).toString(16),
      )}`
    }

    // Tack on the last color to complete the gradient
    colorArray.push(`#${Halli.frontPad(hc2.toString(16)).replace('#', '')}`)

    return colorArray
  }

  /**
   * genMultiHexArray will take an input array of any number of hex colors
   * and the number of steps to create a smooth gradient fade between the
   * colors in sequence.
   *
   * Example: input = [0x00FF00, 0xFFFF00, 0xFF0000] with steps = 10
   * will produce a Green to Yellow to Red gradient with 10 steps between
   * each source color. Total of 23 color codes.
   *
   * @param input - array of hexadecimal numbers representing colors
   * @param steps - the number of colors to generate between two colors
   * @returns array of string hex color codes
   */
  public genMultiHexArray(
    input: IHexColorNumber[] | IHexColorString[],
    steps: number,
  ): IHexColorString[] {
    const multiColor: IHexColorString[] = []

    // Find each sequential pair to compare
    for (let i = 0; i < input.length - 1; i++) {
      // Set hex colors
      const hc1 = input[i]
      const hc2 = input[i + 1]

      // Save first color
      multiColor.push(`#${Halli.frontPad(hc1.toString(16)).replace('#', '')}`)

      // Break hc1 into RGB components
      const {r, g, b} = Halli.getRGBComponents(hc1)

      // RGB Delta between hc1 and hc2
      const {r: r2, g: g2, b: b2} = Halli.getRGBComponents(hc2)
      const rd = r2 - r
      const gd = g2 - g
      const bd = b2 - b

      // Determine new colors
      for (let j = 1; j < steps; j++) {
        // Where are we on the gradient?
        const ratio = j / steps
        // Calculate new color and add it to the array
        multiColor.push(
          `#${Halli.frontPad(
            (
              ((r + rd * ratio) << 16) |
              ((g + gd * ratio) << 8) |
              (b + bd * ratio)
            ).toString(16),
          )}`,
        )
      }
    }

    // Add the last color to the end of the array.
    multiColor.push(`#${Halli.frontPad(input[input.length - 1].toString(16))}`)

    // Return the new array of colors.
    return multiColor
  }

  /**
   * Function will return an object with \{r,g,b,a\} set to appropriate values.
   *
   * @param hex - string representation of a color
   * @returns R, G, B, A codes
   */
  public static hexToRGBA(hex: IHexColorString): IRGB {
    // Break hc1 into RGB components
    const sanitized = hex.replace('#', '')
    return {
      // R
      r: parseInt(sanitized.substring(0, 2), 16),
      // G
      g: parseInt(sanitized.substring(2, 4), 16),
      // B
      b: parseInt(sanitized.substring(4, 6), 16),
      // Alpha
      a:
        sanitized.substring(6, 8) !== ''
          ? parseInt(sanitized.substring(6, 8), 16)
          : 255,
    }
  }

  /**
   * Function will return a 'rgba( r,g,b,a )' string set to the appropriate values.
   *
   * @param hex - string representation of a color
   * @returns rgba(r, g, b, a)
   */
  public static hexToRGBAstr(hex: string): IRGBACSSString {
    // Break hc1 into RGB components
    const rgba = Halli.hexToRGBA(hex)
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  }

  /**
   * Function will return a '#000000' string set to the appropriate values.
   *
   * @param hex - hexadecimal representation of a color
   * @returns `#000000`
   */
  public static convertToColorString(hex: number): string {
    // Break hc1 into RGB components
    return `#${hex.toString(16)}`
  }
}
