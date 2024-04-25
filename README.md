# Asteroids Client

A React app created with [Create React App](https://github.com/facebook/create-react-app).

## Installation

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
