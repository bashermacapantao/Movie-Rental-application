Ext.define('MoviesWebApp.store.TblActor', {
  extend: 'Ext.data.Store',

  storeId: 'tblactors',  // Assigning a storeId to the store

  alias: 'store.tblactors',

  model: 'MoviesWebApp.model.TblActor',

  proxy: {
    type: 'rest',
    api: {
      create: 'https://localhost:7178/api/TblActors/CreateActor',
      read: 'https://localhost:7178/api/TblActors/GetAllActors',
      update: 'https://localhost:7178/api/TblActors/UpdateActor',
      destroy: 'https://localhost:7178/api/TblActors/DeleteActor'
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
    writer: {
      writeRecordId: false,
      writeAllFields: true
    },
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  },
  autoLoad: false,
  autoSync: false

});
