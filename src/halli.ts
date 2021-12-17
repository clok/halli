type IRGB = {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly a?: number
}

export class Halli {
  colors: string[]
  triColors: string[]

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
   * @param hex - hexadecimal number representing color
   * @returns R, G, B codes
   */
  private static getRGBComponents(hex: number): IRGB {
    const r = hex >> 16
    const g = (hex >> 8) & 0xff
    const b = hex & 0xff

    return {r, g, b}
  }

  /**
   * Useful for checking front padding of a hex color code
   *
   * @param hexStr - string representation of hex color code
   * @returns 0 front padded hex color code
   */
  private static frontPad(hexStr: string): string {
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
   * @returns color code in string form
   */
  public pickHex(hc1: number, hc2: number, ratio: number): string {
    if (ratio > 1) ratio = 1

    // Break hc1 into RGB components
    const {r, g, b} = Halli.getRGBComponents(hc1)

    // RGB Delta between hc1 and hc2
    const {r: rd, g: gd, b: bd} = Halli.getRGBComponents(hc2)

    // Calculate new color
    return Halli.frontPad(
      (
        ((r + rd * ratio) << 16) |
        ((g + gd * ratio) << 8) |
        (b + bd * ratio)
      ).toString(16),
    )
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
  public genHexArray(hc1: number, hc2: number, steps: number): string[] {
    const colorArray: string[] = []

    // Place source color in as first element
    colorArray[0] = Halli.frontPad(hc1.toString(16))

    // Break hc1 into RGB components
    const {r, g, b} = Halli.getRGBComponents(hc1)

    // RGB Delta between hc1 and hc2
    const {r: rd, g: gd, b: bd} = Halli.getRGBComponents(hc2)

    // smoother gradient
    steps++

    // Determine new colors
    for (let i = 1; i < steps; i++) {
      // Where are we on the gradient?
      const ratio = i / steps

      // Calculate new color and add it to the array
      colorArray[i] = Halli.frontPad(
        (
          ((r + rd * ratio) << 16) |
          ((g + gd * ratio) << 8) |
          (b + bd * ratio)
        ).toString(16),
      )
    }

    // Tack on the last color to complete the gradient
    colorArray.push(Halli.frontPad(hc2.toString(16)))

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
  public genMultiHexArray(input: number[], steps: number): string[] {
    const multiColor: string[] = []

    // Find each sequential pair to compare
    for (let i = 0; i < input.length - 1; i++) {
      // Set hex colors
      const hc1 = input[i]
      const hc2 = input[i + 1]

      // Save first color
      multiColor.push(Halli.frontPad(hc1.toString(16)))

      // Break hc1 into RGB components
      const {r, g, b} = Halli.getRGBComponents(hc1)

      // RGB Delta between hc1 and hc2
      const {r: rd, g: gd, b: bd} = Halli.getRGBComponents(hc2)

      // Determine new colors
      for (let j = 1; j < steps; j++) {
        // Where are we on the gradient?
        const ratio = j / steps
        // Calculate new color and add it to the array
        multiColor.push(
          Halli.frontPad(
            (
              ((r + rd * ratio) << 16) |
              ((g + gd * ratio) << 8) |
              (b + bd * ratio)
            ).toString(16),
          ),
        )
      }
    }

    // Add the last color to the end of the array.
    multiColor.push(Halli.frontPad(input[input.length - 1].toString(16)))

    // Return the new array of colors.
    return multiColor
  }

  /**
   * Function will return an object with \{r,g,b,a\} set to appropriate values.
   *
   * @param hex - string representation of a color
   * @returns R, G, B, A codes
   */
  public static hexToRGBA(hex: string): IRGB {
    // Break hc1 into RGB components
    return {
      // R
      r: parseInt(hex.substring(0, 2), 16),
      // G
      g: parseInt(hex.substring(2, 4), 16),
      // B
      b: parseInt(hex.substring(4, 6), 16),
      // Alpha
      a: 255,
    }
  }

  /**
   * Function will return a 'rgb( r,g,b )' string set to the appropriate values.
   *
   * @param hex - string representation of a color
   * @returns rgb(r, g, b)
   */
  public static hexToRGBstr(hex: string): string {
    // Break hc1 into RGB components
    const rgba = Halli.hexToRGBA(hex)
    return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`
  }
}
