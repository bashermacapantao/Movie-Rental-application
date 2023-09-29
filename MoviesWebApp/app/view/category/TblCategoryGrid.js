Ext.define('MoviesWebApp.view.category.TblCategoryGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'categorygrid',

    store: {type: 'tblcategories'},

    viewModel: 'category',

    controller: 'category',


    title: 'Categories/Genre Records',

    viewConfig: {
        height: 400,
        scrollable: true
    },

    columns: [
        { text: 'Category Id', dataIndex: 'categoryId', hidden: true },
        { text: 'Name', dataIndex: 'categoryName', flex: 1 }
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
        }, {
            text: 'Edit',
            handler: 'onEditClick'
        }, {
            text: 'Delete',
            handler: 'onDeleteClick'
        }
    ]
    }]
});
