Ext.define('MoviesWebApp.view.customer.TblCustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customer',

    stores: {
        myStore: {
            type: 'tblcustomers',
            autoLoad: false // Make sure autoLoad is set to false
        }
    },

    data: {
        formTitle: 'Create new customer',
        buttonTitle: 'Save',
        customer: {
            customerFirstName: '',
            customerMiddleName: '',
            customerLastName: '',
            customerDateBirth: '',
            customerAge: '',
            customerStreet: '',
            customerCity: '',
            customerCellphone: '',
            customerTelephone: '',
            customerPicture:''
        },
        selectedUser: null
    },

    formulas: {
        iscustomerValid: function (get) {
            var customer = get('customer');
            return customer.customerFirstName.trim().length > 0;
        }
    }

})
