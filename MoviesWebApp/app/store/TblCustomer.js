Ext.define('MoviesWebApp.store.TblCustomer', {
  extend: 'Ext.data.Store',

  storeId: 'tblcustomers',

  alias: 'store.tblcustomers',

  model: 'MoviesWebApp.model.TblCustomer',

  proxy: {
    type: 'rest',
    api: {
        create: 'https://localhost:7178/api/TblCustomers/CreateCustomer',
        read: 'https://localhost:7178/api/TblCustomers/GetAllCustomers',
        update: 'https://localhost:7178/api/TblCustomers/UpdateCustomer',
        destroy: 'https://localhost:7178/api/TblCustomers/DeleteCustomer'
    },
    writer: {
        type: 'json',
        writeAllFields: true,
        transform: {
            fn: function (data, request) {
                // Transform the data as needed before sending
                return Ext.JSON.encode(data);
            }
        },
        headers: {
            'Content-type': 'application/json'
        }
    },
    reader: {
        type: 'json',
        rootProperty: 'data'
    }
},
// Override the constructor to set idProperty and persist dynamically based on the customId

autoLoad: false,
autoSync: false

});


