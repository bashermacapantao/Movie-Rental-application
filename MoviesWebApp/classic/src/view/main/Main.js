/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MoviesWebApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        // 'MoviesWebApp.view.customer.TblCustomerGrid',
        // 'Ext.plugin.Viewport',
        // 'Ext.window.MessageBox',
        // 'MoviesWebApp.store.TblCustomers',

        'MoviesWebApp.view.main.MainController',
        'MoviesWebApp.view.main.MainModel',
        'MoviesWebApp.view.main.List',
        // 'MoviesWebApp.view.movie.TblMovieGrid',
        // 'MoviesWebApp.view.movie.TblMovieGridViewModel',
        // 'MoviesWebApp.view.movie.TblMovieGridController',
        // 'MoviesWebApp.view.movie.TblMovieForm'
        
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: ' Movie Records',
        iconCls: 'fa fa-video',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'moviegrid'
        }]
    }, {
        title: ' Customer Records',
        iconCls: 'fa-users',
        items: [{
            xtype: 'customergrid'
        }]
    }, {
        title: 'Actor Records',
        iconCls: 'fa-user',
        items: [{
            xtype: 'actorgrid'
        }]
    }, {
        title: 'Categories/Genre Records',
        iconCls: 'fa fa-tags',
        items: [{
            xtype: 'categorygrid'
        }]
    },{
        title: 'Rentals Records',
        iconCls: 'fa fa-calendar',
        items: [{
            xtype: 'rentalgrid'
        }]
    },
    // {
    //     title: 'Rentals Records',
    //     iconCls: 'fa fa-calendar',
    //     items: [{
    //         xtype: 'selectmoviegrid'
    //     }]
    // }
]
});
