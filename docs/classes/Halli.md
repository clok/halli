[halli - v1.0.0](../README.md) / [Exports](../modules.md) / Halli

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
- [convertToNumber](Halli.md#converttonumber)
- [frontPad](Halli.md#frontpad)
- [getRGBComponents](Halli.md#getrgbcomponents)
- [hexToRGBA](Halli.md#hextorgba)
- [hexToRGBAstr](Halli.md#hextorgbastr)

## Constructors

### constructor

• **new Halli**()

Initialize object with a default 10 color array fading from
White to Red and with a Tri-Color array from Green to Yellow
to Red gradient with 10 steps between each source color.

#### Defined in

[halli.ts:34](https://github.com/clok/halli/blob/82403de/src/halli.ts#L34)

## Properties

### colors

• **colors**: `string`[]

#### Defined in

[halli.ts:26](https://github.com/clok/halli/blob/82403de/src/halli.ts#L26)

___

### triColors

• **triColors**: `string`[]

#### Defined in

[halli.ts:27](https://github.com/clok/halli/blob/82403de/src/halli.ts#L27)

## Methods

### genHexArray

▸ **genHexArray**(`hc1`, `hc2`, `steps`): `string`[]

Select n=steps colors between color 1 (hc1) and color 2 (hc2)
and populate a return array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hc1` | `string` \| `number` | hexadecimal number representing color |
| `hc2` | `string` \| `number` | hexadecimal number representing color |
| `steps` | `number` | the number of colors to generate between two colors |

#### Returns

`string`[]

array of string hex color codes

#### Defined in

[halli.ts:135](https://github.com/clok/halli/blob/82403de/src/halli.ts#L135)

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
| `input` | `string`[] \| `number`[] | array of hexadecimal numbers representing colors |
| `steps` | `number` | the number of colors to generate between two colors |

#### Returns

`string`[]

array of string hex color codes

#### Defined in

[halli.ts:191](https://github.com/clok/halli/blob/82403de/src/halli.ts#L191)

___

### pickHex

▸ **pickHex**(`hc1`, `hc2`, `ratio`): `string`

Select a color between color 1 (hc1) and color 2 (hc2)
based on an input ratio that denotes the point in the
gradient color should be selected from.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hc1` | `string` \| `number` | hexadecimal number representing color |
| `hc2` | `string` \| `number` | hexadecimal number representing color |
| `ratio` | `number` | the point in the gradient color to be selected |

#### Returns

`string`

IHexColorString color code in string form

#### Defined in

[halli.ts:100](https://github.com/clok/halli/blob/82403de/src/halli.ts#L100)

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

`#000000`

#### Defined in

[halli.ts:281](https://github.com/clok/halli/blob/82403de/src/halli.ts#L281)

___

### convertToNumber

▸ `Static` `Protected` **convertToNumber**(`input`): `number`

Convert IHexColorNumber or IHexColorString to IHexColorNumber

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | convert a hex code string to a number |

#### Returns

`number`

Number

#### Defined in

[halli.ts:65](https://github.com/clok/halli/blob/82403de/src/halli.ts#L65)

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

[halli.ts:83](https://github.com/clok/halli/blob/82403de/src/halli.ts#L83)

___

### getRGBComponents

▸ `Static` `Private` **getRGBComponents**(`input`): [`IRGB`](../modules.md#irgb)

Break down hex value into RGB components

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | hexadecimal IHexColorNumber or IHexColorString representing color |

#### Returns

[`IRGB`](../modules.md#irgb)

R, G, B codes

#### Defined in

[halli.ts:48](https://github.com/clok/halli/blob/82403de/src/halli.ts#L48)

___

### hexToRGBA

▸ `Static` **hexToRGBA**(`hex`): [`IRGB`](../modules.md#irgb)

Function will return an object with \{r,g,b,a\} set to appropriate values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | string representation of a color |

#### Returns

[`IRGB`](../modules.md#irgb)

R, G, B, A codes

#### Defined in

[halli.ts:245](https://github.com/clok/halli/blob/82403de/src/halli.ts#L245)

___

### hexToRGBAstr

▸ `Static` **hexToRGBAstr**(`hex`): \`rgba(${number}, ${number}, ${number}, ${number})\`

Function will return a 'rgba( r,g,b,a )' string set to the appropriate values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | string representation of a color |

#### Returns

\`rgba(${number}, ${number}, ${number}, ${number})\`

rgba(r, g, b, a)

#### Defined in

[halli.ts:269](https://github.com/clok/halli/blob/82403de/src/halli.ts#L269)
