Ext.define('MoviesWebApp.view.actor.TblActorForm', {
    extend: 'Ext.window.Window',
    xtype: 'actor',

    id: 'actorFormWindow',

    controller: 'actor',


    //related on view model
    viewModel: {
        type: 'actor'
    },

    // title: 'Create new actor',
    bind: {
        title: '{formTitle}'
    },
    items: [{
        xtype: 'form',
       
        // reference: 'userForm',
        width: 450,
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            labelWidth: 100
        },
        items: [
            { xtype: 'textfield', fieldLabel: 'Actor Id', name: 'actorId', readOnly: true, bind: '{actor.actorId}' },
            { xtype: 'textfield', fieldLabel: 'Full Name', name: 'actorFullName', bind: '{actor.actorFullName}' },
            { xtype: 'textfield', fieldLabel: 'Image', name: 'actorPicture', bind: '{actor.actorPicture}'}
        ],
        buttons: [
            // {
            //     bind: { text: '{buttonTitle}' }, handler: 'onSaveClick', formBind: true
            //     // bind: {
            //     //     disabled: '{isActorValid}'
            //     // }
            // },
            {
                text: 'Add', handler: 'submitSave', formBind: true
                // bind: {
                //     disabled: '{isActorValid}'
                // }
            },
            {
                text: 'Update', handler: 'onUpdateclick', formBind: true
            },
            { text: 'Cancel', handler: 'onCancelClick' }
        ]
    }]

});