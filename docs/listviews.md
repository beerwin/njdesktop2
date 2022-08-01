# List views

List views are basically tables with added features:

- sticky header
- sort by one column (with customizable comparison)
- custom cell rendering

## Creating a list view

The constructor has 2 parameters, a nullable `parentElement` and a `config` object. The config object is important as it contains the configuration for the headers.

```javascript

const config = {
    headers: {
        sortedBy: 'name',
        sortDirection: 'asc',
        columns: [
            {
                columnId: 'name',
                value: 'Name'
            },
            {
                columnId: 'type',
                value: 'Type (custom comparer)',
                customSortCompare: (a, b) => {
                    const valueA = parseInt(a);
                    const valueB = parseInt(b);

                    if (valueA === valueB) {
                        return 0;
                    }

                    return valueA > valueB ? 1 : -1;
                }
            },
            {
                columnId: 'size',
                value: 'Size'
            },
            {
                columnId: 'date',
                value: 'Date'
            },
        ]
    }
};

const lv = new NjDesktop.NjListView(parentElement, config);
```
The config object has a `headers` key which contains the settings and columns in the header. 

The `headers` key has the following options

| option | default | function |
| --- | --- | --- |
| `sortedBy` | empty | a column of which the table will be sorted by initially |
| `sortDirection` | `asc` | the direction of the initial sort |
| `columns` | `[]` | the list of column options

Each column has the following options: 

| option | default | function |
| --- | --- | --- |
| `columnId` | `string` | an arbitrary id (cannot be repeated in the same list view), must be specified |
| `value` | `string` | The displayed column name |
| `customSortCompare` | callable, empty | a custom comparison function | 

## Adding list items

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
lv.addItem(config);
```

The configuration is similar to the headers. The columns must be in the same order as in the header. Each column has the following options:

| option | default | function |
| --- | --- | --- |
| `columnId` | `string` | an arbitrary id (cannot be repeated in the same list view), must be specified |
| `value` | `string` | The displayed value |
| `customRender` | callable, empty | a custom rendering function | 

If you add a customRender function, it's the function's responsibility to render the value on the cell. The `customRender` function can accept 3 parameters:

|Parameter | value |
| --- | --- |
| `column` | reference to the column
| `value` | value only
| `item` | reference to the whole list item

### fillItems()

Replaces the content of the list with the specified list of items. The parameter is an array of list item configurations (see at [addItem](#additem)). The array can be empty.

## Removing a list item

The removeItem method expects a `NjListItem` instance.

```javascript
lv.removeItem(listItem)
```

## Clearing a list view

```javascript
lv.clear();
```

# Other methods

The list view has a `setParent(domElement)` method.

# Selection

Selected items can be extracted by filtering the `items` property:

```javascript
const selected  = lv.items.filter(i => i.isSelected());
```

An item can be selected/deselected: 

```javascript
li.setSelected(true|false)
```

The selection can be cleared with the `clearSelection()` method.

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

The listView triggers one event after sorting:

```javascript
lv.on('sort', (source, data) => {
    console.log(source);
    console.log(data);
})
```
`source` is a reference to the list view.
`data` contains sorting information (`columnId` and `direction`).


---
[<-- Icon lists](./icon_lists.md) |
[Index](./index.md) |
[Events -->](./events.md)