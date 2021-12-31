[halli - v0.2.0](../README.md) / [Exports](../modules.md) / Halli

# Class: Halli

## Table of contents

### Constructors

- [constructor](Halli.md#constructor)

### Properties

- [colors](Halli.md#colors)
- [triColors](Halli.md#tricolors)

### Methods

- [genHexArray](Halli.md#genhexarray)
- [genMultiHexArray](Halli.md#genmultihexarray)
- [pickHex](Halli.md#pickhex)
- [convertToColorString](Halli.md#converttocolorstring)
- [frontPad](Halli.md#frontpad)
- [getRGBComponents](Halli.md#getrgbcomponents)
- [hexToRGBA](Halli.md#hextorgba)
- [hexToRGBstr](Halli.md#hextorgbstr)

## Constructors

### constructor

• **new Halli**()

Initialize object with a default 10 color array fading from
White to Red and with a Tri-Color array from Green to Yellow
to Red gradient with 10 steps between each source color.

#### Defined in

[halli.ts:17](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L17)

## Properties

### colors

• **colors**: `string`[]

#### Defined in

[halli.ts:9](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L9)

___

### triColors

• **triColors**: `string`[]

#### Defined in

[halli.ts:10](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L10)

## Methods

### genHexArray

▸ **genHexArray**(`hc1`, `hc2`, `steps`): `string`[]

Select n=steps colors between color 1 (hc1) and color 2 (hc2)
and populate a return array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hc1` | `number` | hexadecimal number representing color |
| `hc2` | `number` | hexadecimal number representing color |
| `steps` | `number` | the number of colors to generate between two colors |

#### Returns

`string`[]

array of string hex color codes

#### Defined in

[halli.ts:93](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L93)

___

### genMultiHexArray

▸ **genMultiHexArray**(`input`, `steps`): `string`[]

genMultiHexArray will take an input array of any number of hex colors
and the number of steps to create a smooth gradient fade between the
colors in sequence.

Example: input = [0x00FF00, 0xFFFF00, 0xFF0000] with steps = 10
will produce a Green to Yellow to Red gradient with 10 steps between
each source color. Total of 23 color codes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `number`[] | array of hexadecimal numbers representing colors |
| `steps` | `number` | the number of colors to generate between two colors |

#### Returns

`string`[]

array of string hex color codes

#### Defined in

[halli.ts:145](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L145)

___

### pickHex

▸ **pickHex**(`hc1`, `hc2`, `ratio`): `string`

Select a color between color 1 (hc1) and color 2 (hc2)
based on an input ratio that denotes the point in the
gradient color should be selected from.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hc1` | `number` | hexadecimal number representing color |
| `hc2` | `number` | hexadecimal number representing color |
| `ratio` | `number` | the point in the gradient color to be selected |

#### Returns

`string`

color code in string form

#### Defined in

[halli.ts:62](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L62)

___

### convertToColorString

▸ `Static` **convertToColorString**(`hex`): `string`

Function will return a '#000000' string set to the appropriate values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `number` | hexadecimal representation of a color |

#### Returns

`string`

#000000

#### Defined in

[halli.ts:228](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L228)

___

### frontPad

▸ `Static` `Private` **frontPad**(`hexStr`): `string`

Useful for checking front padding of a hex color code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexStr` | `string` | string representation of hex color code |

#### Returns

`string`

0 front padded hex color code

#### Defined in

[halli.ts:45](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L45)

___

### getRGBComponents

▸ `Static` `Private` **getRGBComponents**(`hex`): [`IRGB`](../modules/internal_.md#irgb)

Break down hex value into RGB components

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `number` | hexadecimal number representing color |

#### Returns

[`IRGB`](../modules/internal_.md#irgb)

R, G, B codes

#### Defined in

[halli.ts:31](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L31)

___

### hexToRGBA

▸ `Static` **hexToRGBA**(`hex`): [`IRGB`](../modules/internal_.md#irgb)

Function will return an object with \{r,g,b,a\} set to appropriate values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | string representation of a color |

#### Returns

[`IRGB`](../modules/internal_.md#irgb)

R, G, B, A codes

#### Defined in

[halli.ts:196](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L196)

___

### hexToRGBstr

▸ `Static` **hexToRGBstr**(`hex`): `string`

Function will return a 'rgb( r,g,b )' string set to the appropriate values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | string representation of a color |

#### Returns

`string`

rgb(r, g, b)

#### Defined in

[halli.ts:216](https://github.com/clok/halli/blob/35a5ef7/src/halli.ts#L216)
