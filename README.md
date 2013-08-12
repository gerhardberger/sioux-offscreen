# sioux offscreen

More info from sioux: [gerhardberger.github.io/sioux/](http://gerhardberger.github.io/sioux/)

``` bash
npm install sioux-offscreen
```

An off screen navigation item. Similar to the menu of the Facebook and Path app. __[demo](http://felix.lovassy.hu/projects/gellert/offscreen)__. It requires two part: an `offscreen` elem which is hidden behind the other `onscreen` element.

``` js
var Offscreen = require('sioux-offscreen');

var off = new Offscreen(offscreenElement, onscreenElement);

off.toggle(function () {
  console.log('Toggled!');
});
```

### properties
- __offscreen__: the off screen DOM element
- __onscreen__: the forward DOM element
- __hidden__: _Boolean_, whether the offscreen element is hidden or not

### methods
- __show(callback)__: shows the `offscreen` element, the `callback` gets called when the animation ended
- __hide(callback)__: hides the `offscreen` element, the `callback` gets called when the animation ended
- __toggle(callback)__: toggles the state, the `callback` gets called when the animation ended
