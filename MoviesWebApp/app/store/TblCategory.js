Ext.define('MoviesWebApp.store.TblCategory', {
    extend: 'Ext.data.Store',
    
    storeId: 'tblcategories',  // Assigning a storeId to the store

    alias: 'store.tblcategories',
    
    model: 'MoviesWebApp.model.TblCategory',
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
    }
});

