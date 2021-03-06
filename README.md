# halli
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/clok/halli/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/clok/halli/badge.svg)](https://coveralls.io/github/clok/halli)

Color gradient generator and picker

[<img src="https://clok.sh/assets/img/color-select-sample.png">](https://clok.sh/demos/halli)

## Why?

Many moons ago I had a need to efficiently generate colors for [particle effects in a game engine](https://clokwork.net/articles/particle-generation-in-impactjs/).
It was a fun problem to work on and resulted in writing [some fun code](https://clokwork.net/articles/simplifying-color-selection/) to
dynamically generate color gradients that can be used. I published an [ImpactJS plugin](https://github.com/clok/impactjs-color-picker) as well. 

Recently, I have found the need for generating colors. So, here we are.

## Installation

As a module
```text
$ npm install --save halli
```

As a script tag
```html
<script type="text/javascript" src="https://clok.sh/assets/js/halli.v0.3.1.min.js" />
<script type="text/javascript">
  // Initialize Halli object
  var picker = new Halli;

  // Generate and draw fade between White and Black with 400 steps
  var fade = picker.genHexArray(0xFFFFFF, 0x000000, 400);

  // Generate the Matlab Jet colormap with 80 steps between each color
  var jet = picker.genMultiHexArray([0x0000FF, 0x00FFFF, 0x00FF00, 0xFFFF00, 0xFF0000, 0x000000], 80);

  // Generate the Matlab HSV colormap with 70 steps between each color
  var hsv = picker.genMultiHexArray([0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0x000000], 70);
</script>
```

## Demo

See [demo](https://clok.sh/demos/halli)


## Usage

> See [`Halli` class documentation](./docs/classes/Halli.md)

```typescript
import { Halli } from 'halli'

// Initialize ColorPicker object
const picker = new Halli()

// Generate and draw fade between White and Black with 400 steps
const fade = picker.genHexArray(0xffffff, 0x000000, 400)

/**
 * Generate the Matlab Jet colormap with 80 steps between each color
 * then render
 */
const jet = picker.genMultiHexArray(
  [0x0000ff, 0x00ffff, 0x00ff00, 0xffff00, 0xff0000, 0x000000],
  80,
)

/**
 * Generate the Matlab HSV colormap with 70 steps between each color
 * then render
 */
const hsv = picker.genMultiHexArray(
  [0xff0000, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff, 0xff00ff, 0x000000],
  70,
)

/**
 * Regenerate the Matlab HSV colormap in a higher resolution with
 * 27,000 steps between each color.
 * Use the createImageData method to quickly render the colormap
 * with each entry in the array represented by a single pixel.
 */
const pix = picker.genMultiHexArray(
  [0xff0000, 0xffff00, 0x00ff00, 0x00ffff, 0x0000ff, 0xff00ff, 0x000000],
  27000,
)
```

## Development

1. Fork the [clok/halli](https://github.com/clok/halli) repo
2. Branch & Code
3. Run linters :broom: `npm run lint`
4. Commit with a [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
5. Open a PR

### Local Demo

1. Clone the repo
2. `npm install`
3. `npm build`
4. `open ./demo.html`

#### Why is it named `halli`?

According to [Google translate](https://www.google.com/search?q=gradient+in+icelandic) "gradient" in English translated to Icelandic results in "halli".
