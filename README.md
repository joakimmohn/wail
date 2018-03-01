# wail

Browser notifications

Zero dependency - No stylesheet required

## Usage

```
wail("Notification text here");

wail("Some other text here", {
    clickable: true,
    duration: false,
    style: {
        fontSize: '20'px
    }
});
```