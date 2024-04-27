# Asteroids Client

A React app created with [Create React App](https://github.com/facebook/create-react-app).

## Task list

- [x] GET request to the backend
- [x] adding a history page accessible through a click on a miner in the miner list on the result of the GET /history?minerId=
- [x] display a list according to the design
- [x] connection to the websocket and live updating of the list
- [x] adding a menu to switch between pages
- [x] adding an asteroid page list based on the result of the GET /asteroids
- [x] adding a button "Create a miner" to be displayed on a miner whenever it got sufficient ressources
- [ ] adding a form to create a miner and send the result as a PUSH /miner + Implementation of a form validation
- [ ] add a live rendering of the planets, miners and asteroids

## Installation

make sure you have [pnpm](https://pnpm.io/) installed, and node.js v18.16.0 or higher on

```bash
pnpm install
```

The `prepare` script will automatically run after installation, it uses `husky` to add git hooks, the hook scripts are under `.husky` directory.

- pre-commit: run lintstaged scripts
- commit-msg: add commit lint

## Develop

### Environment Configuration

TODO

### Scripts

#### Starting a dev server

```bash
pnpm run start
```

#### Local Build

```bash
pnpm run build
```

#### Unit Test

```bash
pnpm run test
```

### Github Actions

TODO

## Code Conventions

### Javascript

- Generally follows the Airbnb JavaScript Style Guide. See: https://juejin.cn/post/6844903620648026120
- Naming conventions prefer camelCase (propertyName).
- Type names use PascalCase (MediaObjectType).
- Prefer using ES6 syntax.
- Use let and const instead of var.
- Avoid using export default.
- Use literal syntax for object creation.
- For exported functions, use function declarations export function fnName() {}, not function expressions export const fnName = () => {}.
- For naming static constants (strings, numbers, RegExp, object literals, etc.), use UPPER_CASED_NAMING.

### SCSS

- Style naming follows the BEM convention:

  1.  (-) Hyphen: Used only as a hyphen to connect multi-word blocks or elements.
  2.  (\_\_) Double underscore: Used to connect a block and its child elements.
  3.  (\_) Single underscore: Used to describe a state of a block or an element within a block.

- Example:

```css
.block {
}

.block__element {
}

.block--modifier {
}
```

- Suggested order of properties: Flex properties --> Layout and positioning properties --> Self properties --> Text properties --> Other properties.
- The outermost tag of a component should not have margins by default; margins should be defined by the page/component that includes it.
