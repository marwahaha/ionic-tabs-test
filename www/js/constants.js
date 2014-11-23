'use strict';

myApp.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'accounts',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'name', type: 'text'}
            ]
        }
    ]
});