# Dialog footer (status bar)

The dialog footer is a footer control for windows. It's role is to function as the window's action bar in dialogs.

The dialog footer is automatically added to a dialog window created with `NjDesktop.createDialog()`.

The `getFooter` getter from the `NjWindow` instance will return the instance of the `NjDialogfooter` class in case of dialog windows.

## Adding actions (buttons) to a dialog footer

A dialog footer supports multiple actions. Call the `addAction` method of the `NjDialogFooter` instance:

```javascript
dialog.getFooter()
      .addAction(new NjDialogAction(null, {
                    title: "Ok",
                    click: () => {
                        alert("OK clicked");
                        dialog.close();
                    }
                }));
```

[<-- Tree views](./treeview.md) |
[Index](./index.md) |
[Window footer -->](./window_footer.md)