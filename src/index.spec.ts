import {Halli} from './index'

describe('Halli', () => {
  describe('pickHex', () => {
    it('consistently returns the same value for a ratio in range', () => {
      const picker = new Halli()
      expect(picker.pickHex(0x000000, 0xffffff, 0.5)).toBe('#7f7f7f')
    })

    it('consistently returns the same value for a ratio in range [ratio > 1]', () => {
      const picker = new Halli()
      expect(picker.pickHex(0x000000, 0xffffff, 1.5)).toBe('#ffffff')
    })

    it('pick correct length color [edge case]', () => {
      const picker = new Halli()
      expect(picker.pickHex(0xffffff, 0xff0000, 0)).toBe('#ffffff')
      expect(picker.pickHex(0xffffff, 0xff0000, 1)).toBe('#ff0000')
      expect(picker.pickHex(0xffffff, 0xff0000, 0.5)).toBe('#ff7f7f')
      expect(picker.pickHex(0xffffff, 0xff0000, Math.random())).toHaveLength(7)
      expect(picker.pickHex(16777215, 16711680, 0.5)).toBe('#ff7f7f')
    })

    it('consistently returns the same value for a ratio in range [hex string]', () => {
      const picker = new Halli()
      expect(picker.pickHex('#000000', '#ffffff', 0.5)).toBe('#7f7f7f')
    })

    it('consistently returns the same value for a ratio in range [ratio > 1 hex string]', () => {
      const picker = new Halli()
      expect(picker.pickHex('#000000', '#ffffff', 1.5)).toBe('#ffffff')
    })

    it('pick correct length color [edge case hex string]', () => {
      const picker = new Halli()
      expect(picker.pickHex('#ffffff', '#ff0000', 0)).toBe('#ffffff')
      expect(picker.pickHex('#ffffff', '#ff0000', 1)).toBe('#ff0000')
      expect(picker.pickHex('#ffffff', '#ff0000', 0.5)).toBe('#ff7f7f')
      expect(picker.pickHex('#ffffff', '#ff0000', Math.random())).toHaveLength(
        7,
      )
      expect(picker.pickHex('16777215', '16711680', 0.5)).toBe('#ff7f7f')
    })
  })

  describe('genHexArray', () => {
    it('consistently returns the same value', () => {
      const picker = new Halli()
      const check = picker.genHexArray(0x00000, 0xffffff, 10)
      expect(check.length).toBe(12)
      expect(check).toEqual([
        '#000000',
        '#171717',
        '#2e2e2e',
        '#454545',
        '#5c5c5c',
        '#737373',
        '#8b8b8b',
        '#a2a2a2',
        '#b9b9b9',
        '#d0d0d0',
        '#e7e7e7',
        '#ffffff',
      ])
    })

    it('consistently returns the same value [hex string]', () => {
      const picker = new Halli()
      const check = picker.genHexArray('#000000', '#ffffff', 10)
      expect(check.length).toBe(12)
      expect(check).toEqual([
        '#000000',
        '#171717',
        '#2e2e2e',
        '#454545',
        '#5c5c5c',
        '#737373',
        '#8b8b8b',
        '#a2a2a2',
        '#b9b9b9',
        '#d0d0d0',
        '#e7e7e7',
        '#ffffff',
      ])
    })
  })

  describe('genMultiHexArray', () => {
    it('consistently returns the same value', () => {
      const picker = new Halli()
      const check = picker.genMultiHexArray([0x00ff00, 0xffff00, 0xff0000], 3)
      expect(check.length).toBe(7)
      expect(check).toEqual([
        '#00ff00',
        '#55ff00',
        '#aaff00',
        '#ffff00',
        '#ffaa00',
        '#ff5500',
        '#ff0000',
      ])
    })
  })

  describe('hexToRGBA', () => {
    it('consistently returns the same value', () => {
      let check = Halli.hexToRGBA('#ffffff')
      expect(check.r).toEqual(255)
      expect(check.g).toEqual(255)
      expect(check.b).toEqual(255)
      expect(check.a).toEqual(255)

      check = Halli.hexToRGBA('ffffff')
      expect(check.r).toEqual(255)
      expect(check.g).toEqual(255)
      expect(check.b).toEqual(255)
      expect(check.a).toEqual(255)
    })

    it('consistently returns the same value with alpha', () => {
      let check = Halli.hexToRGBA('#ffffff17')
      expect(check.r).toEqual(255)
      expect(check.g).toEqual(255)
      expect(check.b).toEqual(255)
      expect(check.a).toEqual(23)

      check = Halli.hexToRGBA('ffffff17')
      expect(check.r).toEqual(255)
      expect(check.g).toEqual(255)
      expect(check.b).toEqual(255)
      expect(check.a).toEqual(23)
    })
  })

  describe('hexToRGBAstr', () => {
    it('consistently returns the same value', () => {
      expect(Halli.hexToRGBAstr('#ffffff')).toBe('rgba(255, 255, 255, 255)')
      expect(Halli.hexToRGBAstr('#ae1f8c')).toBe('rgba(174, 31, 140, 255)')
    })

    it('consistently returns the same value with alpha', () => {
      expect(Halli.hexToRGBAstr('#ffffffff')).toBe('rgba(255, 255, 255, 255)')
      expect(Halli.hexToRGBAstr('#ae1f8cff')).toBe('rgba(174, 31, 140, 255)')
      expect(Halli.hexToRGBAstr('#ffffffa4')).toBe('rgba(255, 255, 255, 164)')
      expect(Halli.hexToRGBAstr('#ae1f8c3c')).toBe('rgba(174, 31, 140, 60)')
    })
  })

  describe('convertToColorString', () => {
    it('consistently returns the same value', () => {
      expect(Halli.convertToColorString(0xffffff)).toBe('#ffffff')
      expect(Halli.convertToColorString(0xab12f8)).toBe('#ab12f8')
    })
  })

  describe('convertToNumber', () => {
    class Tester extends Halli {
      static test_convertToNumber(input: string | number): number {
        return Tester.convertToNumber(input)
      }
    }

    it('consistently returns the same value', () => {
      expect(Tester.test_convertToNumber(0xffffff)).toEqual(16777215)
      expect(Tester.test_convertToNumber(0x000000)).toEqual(0)
      expect(Tester.test_convertToNumber(0)).toEqual(0)
      expect(Tester.test_convertToNumber(123456)).toEqual(123456)
      expect(Tester.test_convertToNumber(1234567)).toEqual(1234567)
      expect(Tester.test_convertToNumber(123)).toEqual(123)
      expect(Tester.test_convertToNumber('#ffffff')).toEqual(16777215)
      expect(Tester.test_convertToNumber('#000000')).toEqual(0)
      expect(Tester.test_convertToNumber('0')).toEqual(0)
      expect(Tester.test_convertToNumber('#123456')).toEqual(1193046)
      expect(Tester.test_convertToNumber('1234567')).toEqual(1234567)
      expect(Tester.test_convertToNumber('123')).toEqual(291)
      expect(Tester.test_convertToNumber('#ffffff')).toEqual(16777215)
      expect(Tester.test_convertToNumber('#000000')).toEqual(0)
      expect(Tester.test_convertToNumber('#0')).toEqual(0)
      expect(Tester.test_convertToNumber('#123456')).toEqual(1193046)
      expect(Tester.test_convertToNumber('#123')).toEqual(291)
      expect(Tester.test_convertToNumber('#000123')).toEqual(291)
    })
  })
})
