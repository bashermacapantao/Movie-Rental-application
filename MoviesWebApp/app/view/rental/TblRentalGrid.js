Ext.define('MoviesWebApp.view.rental.TblRentalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'rentalgrid',
    
    store: {type: 'tblrentals'},

    viewModel: 'rental',

    controller: 'rental',

    title: 'Rental/Transaction Records',

    columns: [
        { text: 'Rental Id', dataIndex: 'rentalId', readonly: true, hidden: true},
        { text: 'RentalCustomer Id', dataIndex: 'rentalCustomerId', readonly: true, hidden: true },
        { text: 'Customer Name', dataIndex: 'customerName', flex: 1 },
        { text: 'Start Date',
         dataIndex: 'rentalRentDate',
        renderer: function(value) {
            if (value) {
                var formattedDate = Ext.util.Format.date(value, 'D, m-d-Y');
                return formattedDate;
            }
            return rentalRentDate;
        },
         flex: 1
        },
        { text: 'End Date',
         dataIndex: 'rentalPlanReturnDate',
         renderer: function(value) {
            if (value) {
                var formattedDate = Ext.util.Format.date(value, 'D, m-d-Y');
                return formattedDate;
            }
            return rentalPlanReturnDate;
        },
        flex: 1 },
        { text: 'RentalTotalPrice', dataIndex: 'rentalTotalPrice', flex: 1 },
        { text: 'RentalStatus', dataIndex: 'rentalStatus', flex: 1 },
        // { text: 'RentalMovieName', dataIndex: 'rentalMovieName', flex: 1 },
        { text: 'RentalMovie Id', dataIndex: 'rentalMovieId', hidden: true }
    ],
    tbar: [
        {
            xtype: 'textfield',
            // fieldLabel: 'Search',
            reference: 'searchField', 
            name: 'searchText',
            emptyText: 'Enter a search term...'
        },
        {
            xtype: 'button',
            text: 'Search',
            handler: 'onSearchButtonClick' // Specify the handler for the button click event
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Refresh',
            handler: 'onRefreshClick'
        }, {
            text: 'Create',
            handler: 'onCreateClick'
        },
        //  {
        //     text: 'Edit',
        //     handler: 'onEditClick'
        // },
        {
            text: 'Open Movies Record',
            handler: 'openMoviesCollection'
        }
    ]
    }]
});
