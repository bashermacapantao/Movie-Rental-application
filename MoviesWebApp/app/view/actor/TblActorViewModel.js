Ext.define('MoviesWebApp.view.actor.TblActorViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.actor',

    stores: {
        myStore: {
            type: 'tblactors',
            autoLoad: false
        }
    },

    data: {
        formTitle: 'Create new Actor',
        buttonTitle: 'Save',
        actor: {
            actorFullName: '',
            actorPicture: ''
        },
        selectedUser : null
    },
    
    formulas: {
        isActorValid: function (get) {
            var actor = get('actor');
            return actor.actorFullName.trim().length > 0 && actor.actorPicture.trim().length > 0;
        }
        // isStoreLoaded: function (get) {
        //     return get('tblactors.isLoaded'); // Replace 'tblcustomers' with the name of your actor store
        //   },
        //   loadStore: function (get) {
        //     if (!get('storesLoaded')) {
        //       get('tblactors').load(); // Replace 'tblcustomers' with the name of your actor store
        //       this.set('storesLoaded', true);
        //     }
        //   },
    }
});