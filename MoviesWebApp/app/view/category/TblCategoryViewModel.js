Ext.define('MoviesWebApp.view.category.TblCategoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.category',

    data: {
        formTitle: 'Create new category',
        buttonTitle: 'Save',
        category: {
            categoryName: ''
        },
        selectedUser: null
    },

    formulas: {
        isCategoryValid: function (get) {
            var category = get('category');
            return category.categoryName.trim().length > 0;
        }
    }

})
