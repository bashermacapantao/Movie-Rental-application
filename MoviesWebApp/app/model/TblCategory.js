Ext.define('MoviesWebApp.model.TblCategory', {
    extend: 'MoviesWebApp.model.Base',

    store: 'MoviesWebApp.store.TblCategory',

    fields: [
        { name: 'categoryId', type: 'int', persist: true },
        { name: 'categoryName', type: 'string' },

    ],
    // idProperty: 'categoryId',
    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:7178/api/TblCategories/CreateCategory',
            read: 'https://localhost:7178/api/TblCategories/GetAllCategories',
            update: 'https://localhost:7178/api/TblCategories/UpdateCategory',
            destroy: 'https://localhost:7178/api/TblCategories/DeleteCategory'
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
    autoSync: false,

    belongsTo: 'MoviesWebApp.model.TblMovie'
});