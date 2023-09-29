Ext.define('MoviesWebApp.model.TblRental', {
    extend: 'MoviesWebApp.model.Base',

    store: 'MoviesWebApp.store.TblRental',
    fields: [
        { name: 'rentalId', type: 'int' },
        { name: 'rentalReturnDate', type: 'date' },
        { name: 'rentalPlanReturnDate', type: 'date' },
        { name: 'rentalTotalPrice', type: 'number' },
        { name: 'rentalStatus', type: 'string' },
        { name: 'rentalCustomerId', type: 'int' },
        { name: 'customerId', reference:'MoviesWebApp.model.TblCustomer', unique: true },
        { name: 'rentalCustomerFullName', type: 'string' },
        { name: 'movieIds', reference:'MoviesWebApp.model.TblMovie', unique: true },
        { name: 'rentalMovieName', type: 'string' },
        { name: 'rentalDurationInDays', type: 'int' }
    ],
    idProperty: 'rentalId',
    belongsTo: {
        model: 'MoviesWebApp.model.TblCustomer',
        associationKey: 'tblcustomer',
        foreignKey: 'rentalCustomerId',
        getterName: 'getTblCustomer',
        setterName: 'setTblCustomer',
        instanceName: 'tblcustomer',
        name: 'tblcustomer'
    },
    hasMany: {
        model: 'MoviesWebApp.model.TblMovie',
        associationKey: 'tblmovie',
        foreignKey: 'rentalMovieId',
        getterName: 'getTblMovie',
        setterName: 'setTblMovie',
        instanceName: 'tblmovie',
        name: 'tblmovie'
    },
    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:7041/api/TblRentals/CreateRental',
            read: 'https://localhost:7041/api/TblRentals/GetAllRentals',
            // read: 'https://localhost:7041/api/TblRentals/RentMovies',
            update: 'https://localhost:7041/api/TblRentals/UpdateRental',
            destroy: 'https://localhost:7041/api/TblRentals/DeleteRental'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            transform: {
                fn: function (data, request) {
                    // Transform the data as needed before sending
                    return Ext.JSON.encode(data);
                }
            },
            headers: {
                'Content-type': 'application/json'
            }
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    // Override the constructor to set idProperty and persist dynamically based on the customId

    autoLoad: false,
    autoSync: false,
});