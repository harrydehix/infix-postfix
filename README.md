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
##### to a string
```javascript
console.log(infixToPostfix("(a+2b)^-2").toString());

/* Output:
    a 2 b * + 2 − ^
*/
```
##### to an array
```javascript
console.log(infixToPostfix("(a+2b)^-2").toArray());

/* Output:
    [
      'a', 2, 'b', '*',
      '+', 2, '−', '^'
    ]
*/
```

## Examples

`2+3*4` ▶ `2 3 4 * +`<br>
`a b(3+4)2` ▶ `a b * 3 4 + * 2 *`<br>
`-12-3` ▶ `12 − 3 -`<br>
`12^-2` ▶ `12 2 − ^`<br>
`((2cm+112)*12.2/3)^2` ▶ `2 cm * 112 + 12.2 * 3 / 2 ^`<br>

## Features

#### Operator parsing
`+`, `-`, `*`, `/`, `()`, `^` get parsed to `+` (addition), `-` (subtraction), `−` (negation), `*` (multiplication), `/` (division) and `^` (exponentiation). The difference between `-` and `−` is, that `−` (negation) is an unary operator (e.g. `-4` gets parsed to `4 −`) and `-` (subtraction) is
a binary operator (e.g. `2-6` gets parsed to `2 6 -`).
There is no unary `+` operator, because one can simply ignore such for mathematical reasons. 

#### Operator reduction
Unnecessary operators get removed automatically.
For example `---+4` gets parsed to `4 −`, `+(12)` gets parsed to `12`.

#### Number parsing support
Numbers get parsed. Obviously only works with the `toArray()` method.

#### Variable support
Any variable not containing operator characters (`+`, `-`, ...) is supported. For example `a-6` gets parsed to `a 6 -`.

#### Multiplication shortcut support
A common parser would parse `b/10b` to `b 10b /` - which is unfortunately wrong. This parser recognizes that `10` and `b` are different operands. It parses the string to `b 10 b * /`.
Added to that `a b` gets parsed to `a b *`. Furthermore `a(3)2` is translated to `a 3 * 2 *`.
