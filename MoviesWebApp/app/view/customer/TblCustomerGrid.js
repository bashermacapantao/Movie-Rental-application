Ext.define('MoviesWebApp.view.customer.TblCustomerGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'customergrid',

    store: { type: 'tblcustomers' },

    controller: 'customer',

    viewmodel: 'customer',

    columns: [
        { text: 'Customer Id', dataIndex: 'customerId', flex: 1, readonly: true, hidden: true },
        {
            text: 'Full Name', flex: 1.5,
            renderer: function (value, metaData, record) {
                var fullName = record.get('customerFirstName') + ' ' + record.get('customerMiddleName') + ' ' + record.get('customerLastName');
                return fullName;
            }
        },
        {
            text: 'Date of Birth', dataIndex: 'customerDateBirth',  xtype: 'datecolumn',
            format: 'm-d-Y',
            flex: 1
            // renderer: function (value) {
            //     // if (value) {
            //     //     var formattedDate = Ext.util.Format.date(value, 'Y-m-d');
            //     //     return formattedDate;
            //     // }
            //     // return customerDateBirth;
            //     if (value) {
            //         var formattedDate = Ext.util.Format.date(value, 'Y-m-d');
            //         return formattedDate;
            //     } else {
            //         if (typeof customerDateBirth !== 'undefined') {
            //             return customerDateBirth;
            //         } else {
            //             return ''; // Or any default value you want to display when customerDateBirth is not defined
            //         }
            //     }

            // }
        },
        { text: 'Age', dataIndex: 'customerAge' },
        {
            text: 'Address', flex: 2,
            renderer: function (value, metaData, record) {
                var address = record.get('customerStreet') + ', ' + record.get('customerCity');
                return address;
            }
        },
        {
            text: 'Contact', flex: 1.5,
            renderer: function (value, metaData, record) {
                var contact = record.get('customerCellphone') + ' / ' + record.get('customerTelephone');
                return contact;
            }
        },
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
        items: [
            {
                text: 'Refresh',
                handler: 'onRefreshClick' // Add a handler for the button click event
            },
            {
                text: 'Create',
                handler: 'onCreateClick'
            }, {
                text: 'Edit',
                handler: 'onEditClick',
                bind: {
                    disabled: '{!selectedUser}'
                }
            }, {
                text: 'Delete',
                handler: 'onDeleteClick',
                bind: {
                    disabled: '{!selectedUser}'
                }
            }

        ]
    }],

});

// Ext.define('MoviesWebApp.view.customer.TblCustomerGrid', {
//     extend: 'Ext.grid.Panel',

//     store: { type: 'tblcustomers' },

//     xtype: 'tblcustomergrid',

//     viewModel: 'tblcustomergrid',

//     requires: [
//         'MoviesWebApp.view.customer.TblCustomerGridController',
//         'MoviesWebApp.view.customer.TblCustomerGridViewModel',
//         'MoviesWebApp.model.TblCustomer',
//         'MoviesWebApp.store.TblCustomers'

//         // 'MyApp.view.UserGridController',
//         // 'MyApp.view.UserGridViewModel',
//         // 'MyApp.model.User',
//         // 'MyApp.store.Users'
//     ],
//     controller: 'tblcustomergrid',
//     bind: {
//         store: '{tblcustomers}'
//     },

//     // title: 'Customer Records',

//     columns: [
//         { text: 'Card Number', dataIndex: 'customerCardNumber', flex: 1 },
//         {
//             text: 'Full Name', flex: 1,
//             renderer: function (value, metaData, record) {
//                 var fullName = record.get('customerFirstName') + ' ' + record.get('customerMiddleName') + ' ' + record.get('customerLastName');
//                 return fullName;
//             }
//         },
//         { text: 'Birth Date', dataIndex: 'customerDateBirth', flex: 1 },
//         { text: 'Age', dataIndex: 'customerAge', flex: 1 },
//         {
//             text: 'Address', flex: 1,
//             renderer: function (value, metaData, record) {
//                 var address = record.get('customerStreet') + ', ' + record.get('customerCity');
//                 return address;
//             }
//         },
//         {
//             text: 'Contact', flex: 1,
//             renderer: function (value, metaData, record) {
//                 var contact = record.get('customerCellphone') + ' / ' + record.get('customerTelephone');
//                 return contact;
//             }
//         },
//     ],
//     dockedItems: [{
//         xtype: 'toolbar',
//         dock: 'top',
//         items: [{
//             text: 'Create',
//             handler: 'onCreateClick'
//         }, {
//             text: 'Edit',
//             handler: 'onEditClick',
//             bind: {
//                 disabled: '{!selectedUser}'
//             }
//         }, {
//             text: 'Delete',
//             handler: 'onDeleteClick',
//             bind: {
//                 disabled: '{!selectedUser}'
//             }
//         }]
//     }]

// });
