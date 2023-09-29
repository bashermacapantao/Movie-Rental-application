Ext.define('MoviesWebApp.store.TblMovie', {
  extend: 'Ext.data.Store',

  storeId: 'tblmovies',

  alias: 'store.tblmovies',

  model: 'MoviesWebApp.model.TblMovie',

  proxy: {
    type: 'rest',
    api: {
      read: 'https://localhost:7178/api/TblMovies/GetAllMovies',
      create: 'https://localhost:7178/api/TblMovies/CreateMovie',
      update: 'https://localhost:7178/api/TblMovies/UpdateMovie',
      destroy: 'https://localhost:7178/api/TblMovies/DeleteMovie'
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
  autoSync: false// Automatically load data from the server when the store is created
});


