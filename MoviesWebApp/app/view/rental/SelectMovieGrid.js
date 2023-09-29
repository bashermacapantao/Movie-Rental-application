Ext.define('MoviesWebApp.view.rental.SelectMovieGrid', {
    extend: 'Ext.grid.Panel',
    // extend: 'Ext.window.Window',
    xtype: 'selectmoviegrid',
    
    store: {type: 'tblrentals'},

    viewModel: 'rental',

    controller: 'rental',

    // title: 'Rental/Transaction Records',

    columns: [
        { text: 'Rental ID', dataIndex: 'rentalId', hidden: true },
        { text: 'Movie ID', dataIndex: 'movieId', hidden: true },
        { text: 'Movie Name', dataIndex: 'movieName', flex: 1 },
        { text: 'Movie Description', dataIndex: 'movieDescription', flex: 1 },
        { text: 'Status', dataIndex: 'rentalStatus', flex: 1 },

    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Return Movie',
            handler: 'returnMovieClick'
        }
    ]
    }]
});
