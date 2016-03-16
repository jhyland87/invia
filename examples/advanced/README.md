## Advanced Example

#### Example Dependencies

These are not included in the dependencies because I figured they should only be installed if you want to use the example

* [Glue](https://github.com/hapijs/glue)
* [Blipp](https://github.com/danielb2/blipp)
* [Actin](https://github.com/thegoleffect/actin)
* [Confidence](https://github.com/hapijs/confidence)
* [Good](https://github.com/hapijs/good)
* [Good-Console](https://github.com/hapijs/good-console)


#### File Structure

This is my preferred structure for projects utilizing HapiJS. Pretty much everything is automatically loaded,  *Invia* loads the routes, *Actin* loads the controllers, and *Confluence* loads the configuration (which loads the resources)

* **./app.js** - Example JS app
* **./confidence.json** - Configuration file
* **./confidence.js** - *Confidence* script to read/parse the *confidence.json* config file
* **./controllers.json** - Controller file aggregate, which uses *Actin* to auto-load the controllers from *./controllers*
* **./controllers** - Controllers (Basically just the HapiJS resource configs)
* **./routes** - Routes file, read by *Invia*

```
.
├── app.js
├── confidence.js
├── confidence.json
├── controllers
│   ├── Admin.js
│   ├── Foo.js
│   └── Root.js
├── controllers.js
└── routes
    ├── admin
    │   ├── group
    │   │   └── foo.js
    │   └── group.js
    └── root.js
```

You should see the following when executing the `app.js` file

![alt text](https://raw.githubusercontent.com/jhyland87/invia/master/examples/advanced/images/example-blipp.png "Example Blipp Output")