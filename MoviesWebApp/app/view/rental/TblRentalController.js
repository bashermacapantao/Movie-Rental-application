Ext.define('MoviesWebApp.view.rental.TblRentalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rental',

    // function fetchCustomerData() {
    //     var customerStore = Ext.create('MoviesWebApp.store.TblCustomer');
    //     customerStore.load({
    //         callback: function (records, operation, success) {
    //             if (success) {
    //                 // Populate the combo box with the fetched customer data
    //                 var combo = Ext.getCmp('customerCombo');
    //                 combo.getStore().loadData(records);
    //             }
    //         }
    //     });
    // }
    onRefreshClick: function (grid) {
        var grid = this.getView(),
            store = grid.getStore();
        console.log('store', store)

        if (store) {
            store.load();
        } else {
            console.error('Store is null or undefined.');
        }
    },
    onSearchButtonClick: function () {
        var grid = this.getView();
        var store = grid.getStore();

        // Get reference to the search field
        var searchField = this.lookupReference('searchField'); // Replace with the actual reference name
        console.log('searchField', searchField)

        // Retrieve the search field value
        var searchText = searchField.getValue(); // Replace with the actual field name
        console.log('searchText', searchText)

        // Modify the store's filters based on the search field value
        store.clearFilter();
        if (searchText) {
            store.filter({
                filterFn: function (record) {
                    var customerName = record.get('customerName');
                    var rentalStatus = record.get('rentalStatus');

                    // Convert both values to lowercase for case-insensitive comparison
                    customerName = customerName.toLowerCase();
                    rentalStatus = rentalStatus.toLowerCase();
                    searchText = searchText.toLowerCase();

                    // Customize the conditions for searching based on your requirements
                    return (
                        customerName.includes(searchText) ||
                        rentalStatus.includes(searchText)
                    );
                }
            });
        }
    },
    returnMovieClick: function (button) {
        var grid = button.up('selectmoviegrid');
        var selectedRecords = grid.getSelection();
        console.log('gridgrid', grid);
        console.log('selectedRecords', selectedRecords);

        if (selectedRecords.length === 0) {
            Ext.Msg.alert('Error', 'Please select a movie to return.');
            return;
        }

        var rentalId = selectedRecords[0].get('rentalId');
        console.log('rentrentalIdalId', rentalId);

        // Retrieve the customer ID associated with the selected rental
        var customerId = selectedRecords[0].get('rentalCustomerId');
        console.log('customerId', customerId);

        // Handle the return movie button click here
        // You can use the fetch API or any other mechanism to make an HTTP request to the server
        // and call the 'ReturnMovie' endpoint

        // Example using fetch API
        fetch('https://localhost:7041/api/TblRentals/ReturnMovie/' + rentalId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data as needed

                // Fetch the updated rental data for the customer
                return fetch('https://localhost:7041/api/TblRentals/GetAllMovieList/' + customerId);
            })
            .then(response => response.json())
            .then(data => {
                // Update the grid store with the new data
                var store = grid.getStore();
                store.loadData(data);

                // Show a success message
                Ext.Msg.alert('Success', 'Movie returned successfully.');
            })
            .catch(error => {
                // Handle the error
                Ext.Msg.alert('Error', 'An error occurred while returning the movie.');
            });

        // var grid = button.up('selectmoviegrid');
        // var selectedRecords = grid.getSelection();
        // console.log('gridgrid', grid)
        // console.log('selectedRecords', selectedRecords)

        // if (selectedRecords.length === 0) {
        //     Ext.Msg.alert('Error', 'Please select a movie to return.');
        //     return;
        // }

        // var rentalId = selectedRecords[0].get('rentalId');
        // console.log('rentrentalIdalId', rentalId)

        // // Handle the return movie button click here
        // // You can use the fetch API or any other mechanism to make an HTTP request to the server
        // // and call the 'ReturnMovie' endpoint

        // // Example using fetch API
        // fetch('https://localhost:7041/api/TblRentals/ReturnMovie/' + rentalId, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // Handle the response data as needed

        //         // Refresh the grid after returning the movie
        //         // grid.getStore().reload();

        //         // Show a success message
        //         Ext.Msg.alert('Success', 'Movie returned successfully.');
        //     })
        //     .catch(error => {
        //         // Handle the error
        //         Ext.Msg.alert('Error', 'An error occurred while returning the movie.');
        //     });
    },
    
    openMoviesCollection: function () {
        var rentalGrid = this.getView();
        var selectedRecord = rentalGrid.getSelectionModel().getSelection()[0];

        if (!selectedRecord) {
            Ext.Msg.alert('Error', 'Please select a rental record.');
            return;
        }

        var store = rentalGrid.getStore();
        var customerId = selectedRecord.get('rentalCustomerId');

        // Load the movies for the selected customer using Fetch API
        fetch('https://localhost:7041/api/TblRentals/GetAllMovieList/' + customerId)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to load movie data.');
                }
            })
            .then(function (moviesData) {
                var rentedMoviesStore = Ext.getStore('tblrentals');


                if (!rentedMoviesStore) {
                    // Create the store if it doesn't exist
                    rentedMoviesStore = Ext.create('MoviesWebApp.store.TblRental');
                }

                rentedMoviesStore.setData(moviesData);

                // Create the movies grid
                var moviesGrid = Ext.create('MoviesWebApp.view.rental.SelectMovieGrid', {
                    store: rentedMoviesStore
                });
                console.log('moviesGrid', moviesGrid)

                // Create a window to display the movies grid
                var window = Ext.create('Ext.window.Window', {
                    title: 'Rental/Transaction Records',
                    width: 700,
                    height: 500,
                    layout: 'fit',
                    items: [moviesGrid],
                    onClose: function () {
                        rentedMoviesStore.removeAll();
                    }
                });

                window.show();
            })
        // var rentalGrid = this.getView();
        // var selectedRecord = rentalGrid.getSelectionModel().getSelection()[0];

        // if (!selectedRecord) {
        //     Ext.Msg.alert('Error', 'Please select a rental record.');
        //     return;
        // }

        // var customerId = selectedRecord.get('rentalCustomerId');
        // var rentedMoviesStore = Ext.getStore('tblrentals');
        // console.log('customerId', customerId)
        // console.log('rentedMoviesStore', rentedMoviesStore)

        // // Check if the customer ID already exists in the store
        // var existingIndex = rentedMoviesStore.findBy(function (record) {
        //     return record.get('rentalcustomerId') === rentalcustomerId;
        // });
        // console.log('existingIndex', existingIndex)

        // if (existingIndex !== -1) {
        //     // If the customer ID exists, retrieve the movies from the existing record
        //     var existingRecord = rentedMoviesStore.getAt(existingIndex);
        //     var moviesData = existingRecord.get('moviesData');
        //     showMoviesGrid(moviesData);
        // } else {
        //     // If the customer ID doesn't exist, make an API request to fetch the movies
        //     fetch('https://localhost:7041/api/TblRentals/GetAllMovieList/' + customerId)
        //         .then(function (response) {
        //             if (response.ok) {
        //                 return response.json();
        //             } else {
        //                 throw new Error('Failed to load movie data.');
        //             }
        //         })
        //         .then(function (moviesData) {
        //             // Save the movies data in the store
        //             rentedMoviesStore.add({
        //                 customerId: customerId,
        //                 moviesData: moviesData
        //             });

        //             showMoviesGrid(moviesData);
        //         })
        //         .catch(function (error) {
        //             Ext.Msg.alert('Error', error.message);
        //         });
        // }

        // function showMoviesGrid(moviesData) {
        //     var moviesGrid = Ext.create('MoviesWebApp.view.rental.SelectMovieGrid', {
        //         store: rentedMoviesStore
        //     });

        //     var window = Ext.create('Ext.window.Window', {
        //         title: 'Movies Collection',
        //         width: 600,
        //         height: 400,
        //         layout: 'fit',
        //         items: [moviesGrid]
        //     });

        //     window.show(); // Corrected method to show the window
        // }

        // var rentalGrid = this.getView();
        // var selectedRecord = rentalGrid.getSelectionModel().getSelection()[0];
        // console.log('rentalGrid', rentalGrid)
        // console.log('selectedRecord', selectedRecord)
        // if (!selectedRecord) {
        //     Ext.Msg.alert('Error', 'Please select a rental record.');
        //     return;
        // }
        // var store = rentalGrid.getStore();
        // console.log('store', store)
        // // Get the selected customer ID
        // var customerId = selectedRecord.get('rentalCustomerId');
        // console.log('customerId', customerId)


        // // Load the movies for the selected customer using Fetch API
        // fetch('https://localhost:7041/api/TblRentals/GetAllMovieList/' + customerId)
        //     .then(function (response) {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             throw new Error('Failed to load movie data.');
        //         }
        //     })
        //     .then(function (moviesData) {
        //         var rentedMoviesStore = Ext.getStore('tblrentals');;
        //         //   var rentedMoviesStore = Ext.create('MMoviesWebApp.store.TblRental');
        //         rentedMoviesStore.setData(moviesData);
        //         console.log('rentedMoviesStore',rentedMoviesStore)

        //         // Create the movies grid
        //         var moviesGrid = Ext.create('MoviesWebApp.view.rental.SelectMovieGrid', {
        //             store: rentedMoviesStore
        //         });

        //         // Create a window to display the movies grid
        //         var window = Ext.create('Ext.window.Window', {
        //             title: 'Movies Collection',
        //             width: 600,
        //             height: 400,
        //             layout: 'fit',
        //             items: [moviesGrid]
        //         });

        //         window.show();
        //     });
        // .catch(function (error) {
        //     Ext.Msg.alert('Error', error.message);
        // });

        // window.show();
    },
    onCreateClick: function () {
        var rentalForm = Ext.create('MoviesWebApp.view.rental.TblRentalForm');
        var viewModel = rentalForm.getViewModel();
        var moviesStore = viewModel.getStore('movies');
        var customersStore = viewModel.getStore('customers');

        moviesStore.load({
            callback: function (records, operation, success) {
                if (success) {
                    // Movies loaded successfully, open the form
                    customersStore.load({
                        callback: function (records, operation, success) {
                            if (success) {
                                rentalForm.show();
                            } else {
                                // Error occurred while loading customers
                                Ext.Msg.alert('Error', 'Failed to load customers.');
                            }
                        }
                    });
                } else {
                    // Error occurred while loading movies
                    Ext.Msg.alert('Error', 'Failed to load movies.');
                }
            }
        });

        // var rentalForm = Ext.create('MoviesWebApp.view.rental.TblRentalForm');
        // var viewModel = rentalForm.getViewModel();
        // var moviesStore = viewModel.getStore('movies');
        // console.log('rentalForm',rentalForm)
        // console.log('viewModel',viewModel)
        // console.log('moviesStore',moviesStore)

        // moviesStore.load({
        //     callback: function (records, operation, success) {
        //         if (success) {
        //             // Movies loaded successfully, open the form
        //             rentalForm.show();
        //         } else {
        //             // Error occurred while loading movies
        //             Ext.Msg.alert('Error', 'Failed to load movies.');
        //         }
        //     }
        // });
        // var form = Ext.create('MoviesWebApp.view.rental.TblRentalForm');

        // // Assuming you have a combo box with itemId set to 'customerCombo'
        // var customerCombo = form.down('#customerCombo');

        // // Retrieve the store from the view model
        // var customerStore = this.getViewModel().getStore('customers');
        // // console.log(',')

        // customerStore.load({
        //     callback: function (records, operation, success) {
        //         if (success) {
        //             customerCombo.getStore().loadData(records);
        //         }
        //     }
        // });
        // form.show();



        // var form = Ext.create('MoviesWebApp.view.rental.TblRentalForm');
        // form.show();
        // var rentalForm = Ext.create('MoviesWebApp.view.rental.TblRentalForm');
        // var viewModel = rentalForm.getViewModel();
        // var moviesStore = viewModel.getStore('movies');
        // console.log('rentalForm',rentalForm)
        // console.log('viewModel',viewModel)
        // console.log('moviesStore',moviesStore)

        // var customerCombo = form.down('#customerCombo');
        // console.log('customerCombo',customerCombo)
        // // Retrieve the store from the view model
        // var customerStore = this.getViewModel().getStore('customers');
        // console.log('customerStore',customerStore)

        // moviesStore.load({
        //     callback: function (records, operation, success) {
        //         if (success) {
        //             // Movies loaded successfully, open the form
        //             rentalForm.show();
        //         } else {
        //             // Error occurred while loading movies
        //             Ext.Msg.alert('Error', 'Failed to load movies.');
        //         }
        //     }
        // });

    },
    onEditClick: function () {
        var selectedRecord = this.getView().getSelection()[0];

        console.log('selectedRecord', selectedRecord)

        // var recordIded = selectedRecord.getId(id.actorId);
        // console.log('recordIded', recordIded);

        if (selectedRecord) {
            var form = Ext.create('MoviesWebApp.view.rental.TblRentalForm', {
                viewModel: {
                    data: {
                        rental: selectedRecord.getData(),
                        formTitle: 'Edit Rental',
                        buttonTitle: 'Update and Save'
                    }
                }
            });

            form.show();
        }
    },
    onSaveClick: function () {
        var form = this.getView().down('form');
        var viewModel = this.getViewModel();
        var rental = Ext.create('MoviesWebApp.model.TblRental');
        form.updateRecord(rental);
        var selectedMovies = viewModel.get('selectedMovies');
        rental.set('rentalMovies', selectedMovies);

        if (form.isValid()) {
            var rentalData = rental.getData();

            fetch('https://localhost:7041/api/TblRentals/CreateRental', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rentalData)
            })
                .then(function (response) {
                    if (response.ok) {
                        Ext.Msg.alert('Success', 'Rental created successfully.');
                        viewModel.set('selectedMovies', []); // Clear the selected movies after saving
                        form.reset();
                    } else {
                        Ext.Msg.alert('Error', 'Failed to create rental.');
                    }
                })
                .catch(function (error) {
                    Ext.Msg.alert('Error', 'An error occurred while saving the rental.');
                });
        }
    },
    onCancelClick: function (form) {
        this.getView().close();
    }
})