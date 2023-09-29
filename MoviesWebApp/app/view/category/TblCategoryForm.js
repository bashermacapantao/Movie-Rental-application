Ext.define('MoviesWebApp.view.category.TblCategoryForm', {
    extend: 'Ext.window.Window',
    xtype: 'category',

    id: 'categoryFormWindow',

    controller: 'category',

    //related on view model
    viewModel: {
        type: 'category'
    },
    viewModel: 'category',

    // title: 'Create new Category',
    bind: {
        title: '{formTitle}'
    },
    items: [{
        xtype: 'form',
        width: 450,
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            labelWidth: 100
        },
        items: [
            { xtype: 'textfield', fieldLabel: 'Category Id', name: 'categoryId', readOnly: true, hidden: true, bind: '{category.categoryId}' },
            { xtype: 'textfield', fieldLabel: 'Categories/Genre ', name: 'categoryName', bind: '{category.categoryName}' },
        ],
        buttons: [
            {
                bind: { text: '{buttonTitle}' }, handler: 'onSaveClick', formBind: true
            },
            { text: 'Cancel', handler: 'onCancelClick' }
        ]
    }]

});