Ext.define('MoviesWebApp.view.rental.TblRentalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rental',

    stores: {
        myStore: {
            type: 'tblrentals',
            autoLoad: false, // Make sure autoLoad is set to false
        },
        rentals: {
            model: 'MoviesWebApp.model.TblRental',
            autoLoad: false
        },
        customers: {
            model: 'MoviesWebApp.model.TblCustomer',
            autoLoad: false
        },
        movies: {
            model: 'MoviesWebApp.model.TblMovie',
            autoLoad: false
        },
        // selectMovies: {
        //     model: 'MoviesWebApp.model.TblMovie',
        //     autoLoad: false // Set autoLoad to false initially
        // }
    },

    data: {
        formTitle: 'Create new Transaction',
        buttonTitle: 'Save',
        // selectedMovies: [],
        // rental: {
        //     categoryName: ''
        // },
        selectedUser: null
    },
    
    formulas: {
        // isCategoryValid: function (get) {
        //     var rental = get('rental');
        //     // return rental.categoryName.trim().length > 0;
        // },
        // customerFullName: {
        //     bind: {
        //         bindTo: '{tblcustomers}', // Bind to the 'customers' store
        //         deep: true
        //     },
        //     get: function (customers) {
        //         return customers.map(function (customer) {
        //             var fullName = customer.get('customerFirstName') + ' ' + customer.get('customerMiddleName') + ' ' + customer.get('customerLastName');
        //             customer.set('fullName', fullName); // Set the computed field
        //             return customer;
        //         });
        //     }
        // }
    }

})
