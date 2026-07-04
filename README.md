# recorddb-app

This is my record db running in JavaScript and JSON.

## Processing

When I buy new CD's, DVD's or Blu-ray's and add them to my SQL Server RecordDB database I need to generate a new JSON file.

I have a program named **RecordDBToJSON** that generates a JSON file named ``artists-records.json`` from the updated RecordDB database.

This JSON file needs some manual changes to be able to work with **record-db-app-netlify**.

### artists-records.json header

```json
    [
     {
      "artistid": 528,
      "firstname": "Mick",
      "lastname": "Abrahams",
            ...
```

Needs to be changed to:

```JSON
'use strict';

const artistList = [
 {
    "artistid": 528,
    "firstname": "Mick",
    "lastname": "Abrahams",
    "name": "Mick Abrahams",
    ...
```

### artists-records.json footer

```bash
        ...
        "review": ""
       }
      ]
     }
    ]
```

Change to.

```bash
                    ...
        "review": ""
       }
      ]
     }
    ];
```

In this case just add the semi-colon.

Now, rename ``artists-records.json`` to ``record-data.js`` and drop the edited file in the root of the **record-db-app-netlify** JavaScript application.

Once you have completed the changes you can commit and push the changes to Github. Netlify will be alerted that the record-db-app project has been deployed and will publish the updated application.

Once the application has been published you need to go to the ``https://recordlist.netlify.app/about.html`` page and click the Update content button. This will clear the storage cache and upload the latest data.
