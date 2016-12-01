# ngInliner - Inline CSS using AngularJS

An AngularJS directive that inlines an element and its children's css styles.


## Dependencies
* angular.js

## Installing

1. Include `css-inliner.js` in your main file (`index.html`).
2. Set `ngInliner` as a dependency in your app.

```
var app = angular.module('MyApp', ['ngInliner']);
```

3. Add `ng-inline` directive as an attribute or class to any element.
```
<div ng-inline>...</div>
```

## Attributes

* whitelist: only adds listed properties when inlining; accepts an array or string. *Defaults to CSS Level 2.1 properties.*

```
<div ng-inline whitelist="['height', 'width']">...</div>
```

* blacklist: ignores listed properties from inlining; accepts an array or string. *Based on CSS Level 2.1 properties.*

```
<div ng-inline blacklist="['font-family', 'font-style']">...</div>
```
