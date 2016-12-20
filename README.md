# Testr

Testr is a javascript mini library that helps you running some test. It is hugely inspired by the unitest in python.

How to use:

```html
<script type="text/javascript" src="js/testr.js"></script>
<script type="text/javascript" src="js/app.js"></script>
```

```js
// app.js

class MyClassTestr extends Testr {

    checkAttr() {
        this.assertDefined(this.hello)
        this.assertDefined(this.world)

        this.assertEqual(typeof this.hello, 'string')
        this.assertEqual(typeof this.world, 'number')
    }

}
Testr.run(MyClassTestr)
```


For now, here are the function there is:

- `assertEqual`
- `assertNotEqual`
- `assertDefined` (a shortcut for `assertNotEqual(typeof myVar, 'undefined')`)

More to come...
