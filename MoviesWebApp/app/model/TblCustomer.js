Ext.define('MoviesWebApp.model.TblCustomer', {
    extend: 'MoviesWebApp.model.Base',

    store: 'MoviesWebApp.store.TblCustomer',
    fields: [
        { name: 'customerId', type: 'int', persist: true },
        { name: 'customerPicture', type: 'string' },
        { name: 'customerFirstName', type: 'string' },
        { name: 'customerMiddleName', type: 'string' },
        { name: 'customerLastName', type: 'string' },
        { name: 'customerDateBirth', type: 'date',  dateFormat: 'Y-m-d' },
        { name: 'customerAge', type: 'int' },
        { name: 'customerStreet', type: 'string' },
        { name: 'customerCity', type: 'string' },
        { name: 'customerCellphone', type: 'string' },
        { name: 'customerTelephone', type: 'string' }
    ],
    // idProperty: 'customerId',

    belongsTo: 'MoviesWebApp.model.TblRental',
    
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
