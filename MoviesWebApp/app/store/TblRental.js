Ext.define('MoviesWebApp.store.TblRental', {
    extend: 'Ext.data.Store',

    storeId: 'tblrentals',

    alias: 'store.tblrentals',

    model: 'MoviesWebApp.model.TblRental',

    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:7041/api/TblRentals/CreateRental',
            read: 'https://localhost:7041/api/TblRentals/GetAllRentals',
            update: 'https://localhost:7041/api/TblRentals/UpdateRental',
            destroy: 'https://localhost:7041/api/TblRentals/DeleteRental'
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
        },
        sorters: [{
            property: 'RentalId',
            direction: 'DESC'
          }]
    },
    // Override the constructor to set idProperty and persist dynamically based on the customId

    autoLoad: false,
    autoSync: false,

});
