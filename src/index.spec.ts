import {Halli} from './index'

describe('Halli', () => {
  describe('pickHex', () => {
    it('consistently returns the same value for a ratio in range', () => {
      const picker = new Halli()
      expect(picker.pickHex(0x00000, 0xffffff, 0.5)).toBe('7f7f7f')
    })

    it('consistently returns the same value for a ratio in range [ratio > 1]', () => {
      const picker = new Halli()
      expect(picker.pickHex(0x00000, 0xffffff, 1.5)).toBe('ffffff')
    })
  })

  describe('genHexArray', () => {
    it('consistently returns the same value', () => {
      const picker = new Halli()
      const check = picker.genHexArray(0x00000, 0xffffff, 10)
      expect(check.length).toBe(12)
      expect(check).toEqual([
        '000000',
        '171717',
        '2e2e2e',
        '454545',
        '5c5c5c',
        '737373',
        '8b8b8b',
        'a2a2a2',
        'b9b9b9',
        'd0d0d0',
        'e7e7e7',
        'ffffff',
      ])
    })
  })

  describe('genMultiHexArray', () => {
    it('consistently returns the same value', () => {
      const picker = new Halli()
      const check = picker.genMultiHexArray([0x00ff00, 0xffff00, 0xff0000], 3)
      console.log(check)
      expect(check.length).toBe(7)
      expect(check).toEqual([
        '00ff00',
        '55ff00',
        'aaff00',
        'ffff00',
        'ffaa00',
        'ff5500',
        'ff0000',
      ])
    })
  })

  describe('hexToRGBA', () => {
    it('consistently returns the same value', () => {
      const check = Halli.hexToRGBA('ffffff')
      expect(check.r).toEqual(255)
      expect(check.g).toEqual(255)
      expect(check.b).toEqual(255)
      expect(check.a).toEqual(255)
    })
  })

  describe('hexToRGBstr', () => {
    it('consistently returns the same value', () => {
      expect(Halli.hexToRGBstr('ffffff')).toBe('rgb(255, 255, 255)')
    })
  })

  describe('convertToColorString', () => {
    it('consistently returns the same value', () => {
      expect(Halli.convertToColorString(0xffffff)).toBe('#ffffff')
      expect(Halli.convertToColorString(0xab12f8)).toBe('#ab12f8')
    })
  })
})
