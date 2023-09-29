Ext.define('MoviesWebApp.view.customer.TblCustomerForm', {
    extend: 'Ext.window.Window',
    xtype: 'customer',

    id: 'customerFormWindow',

    viewModel: {
        type: 'customer'
    },
    controller: 'customer',

    viewModel: 'customer',

    bind: {
        title: '{formTitle}'
    },

    items: [{
        xtype: 'form',
        width: 850,
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            labelWidth: 100
        },
        items: [
            {
                xtype: 'textfield', fieldLabel: 'Customer Id', name: 'customerId', readOnly: true, bind: '{customer.customerId}'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                height: 45,
                items: [
                    { xtype: 'textfield', fieldLabel: 'First Name', name: 'customerFirstName', bind: '{customer.customerFirstName}' },
                    { xtype: 'textfield', fieldLabel: 'Middle Name', name: 'customerMiddleName', bind: '{customer.customerMiddleName}' },
                    { xtype: 'textfield', fieldLabel: 'Last Name', name: 'customerLastName', bind: '{customer.customerLastName}' }
                ]
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Birth of Date',
                name: 'customerDateBirth',
                bind: '{customer.customerDateBirth}',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d',
                listeners: {
                    change: function (dateField, newValue, oldValue) {
                        // var formattedDate = Ext.Date.format(newValue, 'Y-m-d');
                        // dateField.setValue(formattedDate); // Update the field value with the formatted date

                        var ageField = dateField.up('form').down('[name=customerAge]');
                        if (ageField) {
                            var birthDate = newValue;
                            var currentDate = new Date();
                            var currentAge = Ext.Date.diff(birthDate, currentDate, Ext.Date.YEAR);
                            var age = Math.floor(currentAge);
                            ageField.setValue(parseInt(age));
                        }
                    }
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Age',
                name: 'customerAge',
                bind: '{customerAge}',
                readOnly: true
            },
            // {
            //     xtype: 'datefield', fieldLabel: 'Birth of Date', name: 'customerDateBirth', bind: '{customer.customerDateBirth}'
            //     ,
            //      renderer: function (value) {
            //         if (value) {
            //             var formattedDate = Ext.util.Format.date(value, 'm-d-Y');
            //             return formattedDate;
            //         }
            //         return customerDateBirth;
            //     }
            //     bind: '{customer.customerDateBirth}',
            //     listeners: {
            //         change: function (dateField, newValue, oldValue) {
            //             var ageField = dateField.up('form').down('[name=customerAge]');
            //             if (ageField) {
            //                 var birthDate = newValue;
            //                 var currentDate = new Date();
            //                 var currentage = Ext.Date.diff(birthDate, currentDate, Ext.Date.YEAR);
            //                 var age = Math.floor(currentage);
            //                 ageField.setValue(age);
            //             }
            //         }
            //     }
            // },
            // { xtype: 'textfield', fieldLabel: 'Age', name: 'customerAge',  bind: '{customer.customerAge}' },
            { xtype: 'textfield', fieldLabel: 'Street', name: 'customerStreet', bind: '{customer.customerStreet}' },
            { xtype: 'textfield', fieldLabel: 'City', name: 'customerCity', bind: '{customer.customerCity}' },
            {
                xtype: 'container',
                layout: 'hbox',
                height: 45,
                items: [
                    { xtype: 'textfield', fieldLabel: 'Cell #', name: 'customerCellphone', bind: '{customer.customerCellphone}' },
                    { xtype: 'textfield', fieldLabel: 'Tel', name: 'customerTelephone', bind: '{customer.customerTelephone}' },
                ]

            },
            { xtype: 'textfield', fieldLabel: 'Picture', name: 'customerPicture', bind: '{customer.customerPicture}' }
        ],
        buttons: [
            { bind: { text: '{buttonTitle}' }, handler: 'onSaveClick', formBind: true },
            { text: 'Cancel', handler: 'onCancelClick' }
        ]
    }]
});
