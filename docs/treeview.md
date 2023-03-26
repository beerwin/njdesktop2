# Tree views

Tree views are special list views. They support most of the features listviews support (except sorting and multi-select).

- sticky header
- custom cell rendering

## Creating a tree view

The constructor has 2 parameters, a nullable `parentElement` and a `config` object. The config object is important as it contains the configuration for the headers. The headers can be omitted.

```javascript

const config = {
    headers: {
        columns: [
            {
                columnId: 'name',
                value: 'Name'
            },
        ]
    }
};

const lv = new NjDesktop.NjTreeview(parentElement, config);
```
The config object has a `headers` key which contains the settings and columns in the header. 

The `headers` key has the following options

| option | default | function |
| --- | --- | --- |
sort |
| `columns` | `[]` | the list of column options
| `icon`    | `string` | optional, path to icon, accepts CSS definitions

Each column has the following options: 

| option | default | function |
| --- | --- | --- |
| `columnId` | `string` | an arbitrary id (cannot be repeated in the same list view), must be specified |
| `value` | `string` | The displayed column name |

## Adding items

There are two ways of adding items to a listview: `addItem()` and `fillItems()`.

### addItem()

Appends a new list item to the end of the list.

```javascript
const config = {
    columns: [
        {
            columnId: 'name',
            value: 'List item ' + i,
        },
        {
            columnId: 'type',
            value: 'Application ' + i,
        },
        {
            columnId: 'size',
            value: Math.floor((Math.random() * (40000000000000 - 512 + 1))) + 512,
            customRender: (column, value, item) => {
                const levels = ['B', 'kiB', 'MiB', 'GiB', 'TiB'];
                let unit = 'B';
                let order = value;
                let text = order + ' ' + unit
                for (let level in levels) {
                    const v = order / 1024;
                    if (v > 1) {
                        order = v;
                        unit = levels[level];
                        text = order.toFixed(2) + ' ' + unit;
                    } 
                }

                column.columnElement.innerText = text;
            }
        },
        {
            columnId: 'date',
            value: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            customRender: (column, value, item) => {
                column.columnElement.innerText = value.toLocaleTimeString("en-CA", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: false,
                }).replace(',','');
            }
        },
    ]
}
lv.addItem(parentItem, config);
```

The `parentItem` parameter tells, under which item the new item will be added. passing `null` or `undefined` will insert the element at the end of the root. New elements are always added at the last spot in the child list.

The `config` is similar to the headers. The columns must be in the same order as in the header. Each column has the following options:

| option | default | function |
| --- | --- | --- |
| `columnId` | `string` | an arbitrary id (cannot be repeated in the same list view), must be specified |
| `value` | `string` | The displayed value |
| `customRender` | callable, empty | a custom rendering function | 

Alongside the `columns` key, the configuration support icons:

| option | default | function |
| `icon`    | `string` | optional, path to icon, accepts CSS definitions
| `iconColumn`    | `string` | the column id where the icon will be shown

Both properties are required to show the icons

If you add a customRender function, it's the function's responsibility to render the value on the cell. The `customRender` function can accept 3 parameters:

|Parameter | value |
| --- | --- |
| `column` | reference to the column
| `value` | value only
| `item` | reference to the whole list item

### fillItems()

Replaces the content of the treeview with the specified list of items. The parameter is an array of list item configurations (see at [addItem](#additem)). The array can be empty. 

With `fillItems()` an item config can contain two additional fields:, 

|Field|default|meaning|
|-----|-------|-------|
|`expanded`|`false`|specifies whether the item's children are visible or not at start
|`children`|`[]`| a list of child item configs. 

## Removing a tree view item

The removeItem method expects a `NjTreeviewItem` instance.
The method removes the item *and* its children.

```javascript
lv.removeItem(listItem)
```

## Clearing a tree view

```javascript
lv.clear();
```

# Other methods

The tree view has a `setParent(domElement)` method.

# Selection

Only one item can be selected at the same time.

```javascript
const selected  = lv.findSelected();
```

An item can be selected/deselected: 

```javascript
li.setSelected(true|false)
```

An item can be programmatically selected with using the following method:

```javascript
lv.selectWith((i) => i.item.columns[0].value === 'something');
```

# Retrieving/changing values in a list item

Retrieving values:

```javascript
const value = li.column('columnId');
```

Setting column value:

```javascript
li.setColumn('columnId', value);
```

# Events:

The listView triggers the following events after sorting:

## `input`

Triggered when double clicking an event
`source` is a reference to the listview,
`data` is the double clicked item

## `onselect`

Triggered when selecting multiple items
`source` is a reference to the listview,
`data` is the list of selected items


---
[<-- List views](./listviews.md) |
[Index](./index.md) 
[Window Footer (status bar) -->](./window_footer.md)