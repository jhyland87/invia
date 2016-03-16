## Basic Example

#### Example Dependencies

These are not included in the dependencies because I figured they should only be installed if you want to use the example

* [Glue](https://github.com/hapijs/glue)
* [Blipp](https://github.com/danielb2/blipp)

#### File Structure

This example only utilizes *Invia* to automatically load the routes, everything else is done manually via static values in the configuration, which is loaded via *Glue*

* **./app.js** - Example JS app
* **./routes** - Routes file, read by *Invia*

```
.
├── app.js
└── routes
    ├── admin
    │   ├── group
    │   │   └── foo.js
    │   └── group.js
    └── root.js
```
You should see the following when executing the `app.js` file

![alt text](https://raw.githubusercontent.com/jhyland87/invia/master/examples/basic/images/example-blipp.png "Example Blipp Output")