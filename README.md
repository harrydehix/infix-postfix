# infix-postfix

This package allows you to convert infix expressions to postfix expressions.
 
## Installation
```bash
npm install infix-postfix
```
## Usage

#### Importing
```typescript
import infixToPostfix from "infix-postfix";
```
or
```javascript
const infixToPostfix = require("infix-postfix");
```
#### Converting
```javascript
console.log(infixToPostfix("(a+2b)^-2"));
```

#### Features

##### Operator parsing
`+`, `-`, `*`, `/`, `()`, `^` get parsed to `add` (`+`), `sub` (`-`), `neg` (`-`), `mult` (`*`), `div` (`/`) and `pow` (`^`). The difference between `neg` and `sub` is, that `neg` is an unary operator (e.g. `-4` gets parsed to `4 neg`) and `sub` is
a binary operator (e.g. `2-6` gets parsed to `2 6 sub`).
There is no unary `plus` operator, because one can simply ignore such for mathematical reasons. 

##### Operator reduction
Unnecessary operators get removed automatically.
For example `---+4` gets parsed to `4 neg`, `+(12)` gets parsed to `12`.

##### Variable support
Any variable not containing operator characters (`+`, `-`, ...) is supported. For example `a-6` gets parsed to `a 6 sub`.

##### Variable multiplication shortcut support
A common parser would parse `b/10b` to `b 10b div` - which is unfortunately wrong. This parser recognizes that `10` and `b` are different operands. It parses the string to `b 10 b mult div`.

##### Behind the scenes
To understand how this converter works set the function's second argument to true: `infixToPostfix("2*2", true);`. This will print every step in detail to the console.

#### Examples

`2+3*4` ▶ `2 3 4 mult add`<br>
`-12+3` ▶ `12 neg 3 add`<br>
`12^-2` ▶ `12 2 neg pow`<br>
`((2cm+112)*12.2/3)^2` ▶ `2 cm mult 112 add 12.2 mult 3 div 2 pow`<br>
