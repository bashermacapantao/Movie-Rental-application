Ext.define('MoviesWebApp.model.TblMovie', {
    extend: 'MoviesWebApp.model.Base',
    store: 'MoviesWebApp.store.TblMovie',
        fields: [
            { name: 'movieId', type: 'int',  persist: true  },
            { name: 'movieName', type: 'string' },
            { name: 'movieDescription', type: 'string' },
            { name: 'movieReleaseDate', type: 'date', dateFormat: 'Y-m-d'  },
            { name: 'moviePrice', type: 'float' },
            { name: 'moviePicture', type: 'string' },
            { name: 'actors', type: 'auto' },
            { name: 'categories', type: 'auto' },
            { name: 'actorIds', reference:'MoviesWebApp.model.TblActor', unique: true  },
            { name: 'categoryIds',reference:'MoviesWebApp.model.TbCategory', unique: true }
        ],
        // idProperty: 'movieId',

        belongsTo: 'MoviesWebApp.model.TblRental',
        associations: [
          {
            type: 'hasMany',
            model: 'MoviesWebApp.model.TblActor',
            name: 'tblactors',
            associationKey: 'tblactors',
            // foreignKey: 'actorIds',
            getterName: 'getTblActors',
            setterName: 'setTblActors',
            instanceName: 'tblactors',
            // autoLoad: true
          },
          {
            type: 'hasMany',
            model: 'MoviesWebApp.model.TblCategory',
            name: 'tblcategories',
            associationKey: 'tblcategories',
            // foreignKey: 'categoryIds',
            getterName: 'getTblCategories',
            setterName: 'setTblCategories',
            instanceName: 'tblcategories',
            // autoLoad: true
          }
        ],
      //   associations: [
      //     {
      //         type: 'hasMany',
      //         model: 'MoviesWebApp.model.TblActor',
      //         name: 'Actors',
      //         associationKey: 'Actors',
      //         role: 'actors',
      //         getterName: 'getActors',
      //         setterName: 'setActors',
      //         autoLoad: true // Ensure that associated actors are loaded
      //     },
      //     {
      //         type: 'hasMany',
      //         model: 'MoviesWebApp.model.TblCategory',
      //         name: 'Categories',
      //         associationKey: 'Categories',
      //         role: 'categories',
      //         getterName: 'getCategories',
      //         setterName: 'setCategories',
      //         autoLoad: true // Ensure that associated categories are loaded
      //     },
      // ],
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
            autoSync: false
          });
        
