Ext.define('MoviesWebApp.model.TblActor', {
  extend: 'MoviesWebApp.model.Base',

  store: 'MoviesWebApp.store.TblActor',

  // idProperty: 'id',

  fields: [
    // { name: 'clientId', type: 'int', persist: false },
    { name: 'actorId', type: 'int', persist: true },
    { name: 'actorFullName', type: 'string' },
    { name: 'actorPicture', type: 'string' }
  ],
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