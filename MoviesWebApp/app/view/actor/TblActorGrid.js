Ext.define('MoviesWebApp.view.actor.TblActorGrid', {
    extend: 'Ext.grid.Panel',
    store: {type: 'tblactors'},
    xtype: 'actorgrid',
    
    bind: {
        store: 'tblactors'
    },
    
    viewModel: {
        type: 'actor'
    },

    title: 'Actor Records',

    controller: 'actor', // connect to controller

    columns: [
        // { text: 'ID', dataIndex: 'id', },
        { text: 'Actor Id', dataIndex: 'actorId', hidden: true },
        { text: 'Image', dataIndex: 'actorPicture', flex: 1, hidden:true },
        { text: 'Full Name', dataIndex: 'actorFullName', flex: 1 }
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
