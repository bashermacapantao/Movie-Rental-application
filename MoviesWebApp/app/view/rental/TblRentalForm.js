var form = Ext.define('MoviesWebApp.view.rental.TblRentalForm', {
    extend: 'Ext.window.Window',
    xtype: 'rental',

    controller: 'rental',

    layout: {
        type: 'vbox' // or 'fit' or any other layout type
    },

    //related on view model
    viewModel: {
        type: 'rental'
    },

    // title: 'Create new actor',
    bind: {
        title: '{formTitle}'
    },
    items: [{
        xtype: 'form',

        // reference: 'userForm',
        // width: 750,
        // height: 350,
        width: 450,
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            labelWidth: 100
        },
        items: [
            {
                xtype: 'combobox',
                fieldLabel: 'Customer',
                itemId: 'customerCombo', // Add itemId for reference
                name: 'customerId',
                bind: {
                    store: '{customers}', // Bind to the 'customers' store in the view model
                    value: '{rental.customerId}'
                },
                displayField: 'customerFirstName',
                valueField: 'customerId',
                queryMode: 'local',
                forceSelection: true,
                editable: false,
                allowBlank: false,
                //     renderer: function (value, metaData, record) {
                //         var fullName = record.get('customerFirstName') + ' ' + record.get('customerMiddleName') + ' ' + record.get('customerLastName');
                //         return fullName;}
            }, 
            {
                xtype: 'numberfield',
                fieldLabel: 'Rental Duration (in days)',
                name: 'rentalDurationInDays',
                allowBlank: false,
                bind: '{rental.rentalDurationInDays}'
            },
            {
                xtype: 'tagfield',
                fieldLabel: 'Movies',
                name: 'movieIds',
                bind: {
                    store: '{movies}',
                    value: '{movieIds}'
                },
                displayField: 'movieName',
                valueField: 'movieId',
                queryMode: 'local',
                forceSelection: true,
                editable: true,
                createNewOnEnter: true,
                createNewOnBlur: true,
                listeners: {
                    beforequery: function (queryPlan, eOpts) {
                        queryPlan.query = new RegExp(queryPlan.query, 'i');
                        queryPlan.forceAll = true;
                    }
                }
            }

        ],
        buttons: [
            {
                bind: { text: '{buttonTitle}' }, handler: 'onSaveClick', formBind: true
            },
            // {
            //     text: 'Update', handler: 'onUpdateclick'
            // },
            { text: 'Cancel', handler: 'onCancelClick' }
        ]
    }],

});


