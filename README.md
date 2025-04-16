# 🖱️ jQuery Custom Cursor Plugin

A lightweight and customizable jQuery plugin that replaces the default mouse cursor with a custom image. Great for adding unique interactivity to your website.

## 🚀 Features

- Custom image as a mouse cursor
- Easy setup with configurable options
- Supports hiding cursor over specific elements
- Automatically skips touch devices
- Fallback for older browsers

## 📦 Installation

### 1. Include jQuery (if not already added)

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

### 2. Include the plugin script

```html
<script src="custom-cursor.js"></script>
```

### 3. Add your custom cursor image
Place your cursor image (e.g., cursor.png) in a directory like images/.

## 🧪 Usage

```html
<script>
$(document).ready(function () {
  $('body').customCursor({
    imageUrl: 'images/cursor.png',
    width: 64,
    height: 64,
    offsetX: 'auto',
    offsetY: 'auto',
    zIndex: 999999,
    cursorId: 'my-custom-cursor',
    excludeSelector: 'a, button, .no-cursor'
  });
});
</script>
```

## ⚙️ Options

| Option           | Type              | Default           | Description                                                                 |
|------------------|-------------------|-------------------|-----------------------------------------------------------------------------|
| `imageUrl`       | `string`          | `""`              | Path to the custom cursor image.                                            |
| `width`          | `number`          | `50`              | Width of the cursor image in pixels.                                       |
| `height`         | `number`          | `50`              | Height of the cursor image in pixels.                                      |
| `offsetX`        | `number` / `"auto"` | `"auto"`        | Horizontal offset, or `"auto"` to center horizontally.                      |
| `offsetY`        | `number` / `"auto"` | `"auto"`        | Vertical offset, or `"auto"` to center vertically.                          |
| `zIndex`         | `number`          | `999999`          | CSS z-index of the cursor element.                                          |
| `cursorId`       | `string`          | `"custom-cursor"` | ID to assign to the cursor element.                                         |
| `excludeSelector`| `string` / `jQuery`| `""`              | Selector for elements where the cursor should be hidden temporarily.        |


## 📵 Touch Device Support

The plugin disables itself automatically on devices with touch support (navigator.maxTouchPoints > 0).

## 🧠 Browser Support

✅ Chrome
✅ Firefox
✅ Safari
✅ Edge
⚠️ IE 9+ (limited support)

## Example HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Custom Cursor Example</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="custom-cursor.js"></script>
</head>
<body>
  <h1>Hover around to see the custom cursor!</h1>
  <a href="#">This link will hide the cursor</a>

  <script>
    $(function () {
      $('body').customCursor({
        imageUrl: 'images/cursor.png',
        width: 64,
        height: 64,
        excludeSelector: 'a'
      });
    });
  </script>
</body>
</html>
```
## 📝 License
MIT License

## 🙌 Credits

Crafted with 💡 and 🖱️ using jQuery.
Feel free to contribute or report issues!

