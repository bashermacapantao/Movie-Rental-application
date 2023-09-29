Ext.define('MoviesWebApp.view.movie.TblMovieViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movie',

    stores: {
        myStore: {
            type: 'tblmovies',
            autoLoad: false, // Make sure autoLoad is set to false
        },
        actors: {
            model: 'MoviesWebApp.model.TblActor',
            autoLoad: true,
            // Other store configurations
        },
        categories: {
            model: 'MoviesWebApp.model.TblCategory',
            autoLoad: true,
            // Other store configurations
        }
    },

    data: {
        formTitle: 'Create new Movie',
        buttonTitle: 'Save',
        movie: {
            movieName: '',
            movieDescription: '',
            movieReleaseDate: '',
            moviePrice: '',
            moviePicture: ''
        },
        selectedUser : null
    },
    formulas: {
        isActorValid: function (get) {
            var movie = get('movie');
            return movie.movieName.trim().length > 0;
        }
    },
});
    // init: function () {
    //     var actorsStore = this.getViewModel().getStore('actors');
    //     var categoriesStore = this.getViewModel().getStore('categories');
    
    //     // Load the stores and show the form when both stores are loaded
    //     Ext.Promise.all([actorsStore.load(), categoriesStore.load()]).then(function () {
    //       var form = this.getView();
    //       form.show();
    //     }, this);
    //   },
    

    // stores: {
    //     tblcustomers: {
    //         type: 'tblcustomers',
    //         autoSync: false
    //     }
    // },
    // data: {
    //     selectedUser: null
    // },
    // // Manually load the store when the view is activated
    // formulas: {
    //     isStoreLoaded: function (get) {
    //         return get('tblcustomers.isLoaded');
    //     }
    // },
    // storesLoaded: false,
    // formulas: {
    //     loadStore: function (get) {
    //         if (!get('storesLoaded')) {
    //             get('tblcustomers').load();
    //             this.set('storesLoaded', true);
    //         }
    //     }
    // },
    // listeners: {
    //     activate: '{loadStore}'
    // }

