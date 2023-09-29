Ext.define('MoviesWebApp.view.movie.TblMovieController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movie',

    onRefreshClick: function (grid) {
        var grid = this.getView(),
            store = grid.getStore();
        console.log('store', store)

        if (store) {
            store.load();
            store.clearFilter();
        } else {
            console.error('Store is null or undefined.');
        }
    },
    
    // onSearchButtonClick: function () {
    //     var grid = this.getView();
    //     var store = grid.getStore();

    //     // Get reference to the search field
    //     var searchField = this.lookupReference('searchField'); // Replace with the actual reference name
    //     console.log('searchField',searchField)

    //     // Retrieve the search field value
    //     var searchText = searchField.getValue(); // Replace with the actual field name
    //     console.log('searchText',searchText)

    //     // Modify the store's filters based on the search field value
    //     store.clearFilter();
    //     if (searchText) {
    //         store.filter({
    //             filterFn: function(record) {
    //                 var actorFullName = record.get('actorFullName');
    //                 var actorPicture = record.get('actorPicture');

    //                 // Convert both values to lowercase for case-insensitive comparison
    //                 actorFullName = actorFullName.toLowerCase();
    //                 actorPicture = actorPicture.toLowerCase();
    //                 searchText = searchText.toLowerCase();

    //                 // Customize the conditions for searching based on your requirements
    //                 return (
    //                     actorFullName.includes(searchText) ||
    //                     actorPicture.includes(searchText)
    //                 );
    //             }
    //         });
    //     }
    // },
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
                    var movieName = record.get('movieName');
                    var movieDescription = record.get('movieDescription');

                    // Convert both values to lowercase for case-insensitive comparison
                    movieName = movieName.toLowerCase();
                    movieDescription = movieDescription.toLowerCase();
                    searchText = searchText.toLowerCase();

                    // Customize the conditions for searching based on your requirements
                    return (
                        movieName.includes(searchText) ||
                        movieDescription.includes(searchText)
                    );
                }
            });
        }
    },
    // onSaveClickbutton: function() {
    //     var form = this.getView();
    //     var values = form.getValues();

    //     // Retrieve the selected actors from the reference field
    //     var actorsField = form.lookupReference('actorsField');
    //     var selectedActors = actorsField.getValue();

    //     // Retrieve the selected categories from the reference field
    //     var categoriesField = form.lookupReference('categoriesField');
    //     var selectedCategories = categoriesField.getValue();

    //     // Combine the form values with the selected actors and categories
    //     var movieData = Ext.apply(values, {
    //         movieActorIds: selectedActors,
    //         movieCategoryIds: selectedCategories
    //     });

    //     // Perform the save operation using the Fetch API
    //     fetch('https://localhost:7041/api/TblMovies/CreateMovie', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(movieData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Movie saved successfully:', data);
    //         // Handle success response here
    //     })
    //     .catch(error => {
    //         console.error('Failed to save movie:', error);
    //         // Handle error response here
    //     });
    // },
    onCreateClick: function () {
        var form = Ext.create('MoviesWebApp.view.movie.TblMovieForm');
        form.show();
    },
    onEditClick: function () {
        var selectedRecord = this.getView().getSelection()[0];
        console.log('selectedRecord', selectedRecord)

        if (selectedRecord) {
            var form = Ext.create('MoviesWebApp.view.movie.TblMovieForm', {
                viewModel: {
                    data: {
                        movie: selectedRecord.getData(),
                        formTitle: 'Edit Movie',
                        buttonTitle: 'Update and Save'
                    }
                }
            });
            form.getController().setUpdateMode(selectedRecord); // Pass the selected record to the form's controller
            form.show();
        }
    },
    setUpdateMode: function (record) {
        this.recordToUpdate = record; // Store the record to be updated in the controller's scope
    },

    onSaveClick: function (options) {
        var form = this.getView().down('form');
        var values = form.getValues();
        var movieId = values.movieId;
        console.log('movieId',movieId)
        console.log('values', values);

        if (movieId) {
            // Update existing record
            if (this.recordToUpdate) {
                var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value

                this.recordToUpdate.self.idProperty = 'movieId'; // Set the idProperty to 'actorId' for the update operation
                this.recordToUpdate.setId(movieId); // Set the actorId as the new id for the record

                this.recordToUpdate.set(values);
                this.recordToUpdate.save({
                    success: function (record, operation) {
                        Ext.getCmp('movieFormWindow').close();
                        Ext.Msg.alert('Success', 'Record updated successfully');
                    },
                    failure: function (record, operation) {
                        Ext.getCmp('movieFormWindow').close();
                        console.error('Failed to update record:', operation.getError());
                    }
                    // ,
                    // callback: function (record, operation, success) {
                    //     // Restore the original idProperty value after the update operation
                    //     this.recordToUpdate.self.idProperty = idProperty;
                    // },
                    // scope: this
                });
            } else {
                console.error('No record to update');
            }
        } else {
            // Create new record
            var movieModel = Ext.create('MoviesWebApp.model.TblMovie');
            movieModel.set(values);
            movieModel.save({
                success: function (record, operation) {
                    Ext.getCmp('movieFormWindow').close();
                    Ext.Msg.alert('Success', 'Record saved successfully');
                },
                failure: function (record, operation) {
                    Ext.getCmp('movieFormWindow').close();
                    Ext.Msg.alert('Failed', 'Failed to save record');
                }
            });
        }
    },
   
    // onSaveClick: function (options) {
    //     var form = this.getView().down('form');
    //     var values = this.getViewModel();

    //     // Retrieve the selected actors from the reference field
    //     var actorsField = form.lookupReference('actorsField');
    //     var selectedActors = actorsField.getValue();
    //     console.log('actorsField', actorsField)
    //     console.log('selectedActors', selectedActors)

    //     // Retrieve the selected categories from the reference field
    //     var categoriesField = form.lookupReference('categoriesField');
    //     var selectedCategories = categoriesField.getValue();

    //     console.log('categoriesField', categoriesField)
    //     console.log('selectedCategories', selectedCategories)

    //     // Combine the form values with the selected actors and categories
    //     var movieData = Ext.apply(values, {
    //         movieActorIds: selectedActors,
    //         movieCategoryIds: selectedCategories
    //     });
    //     var viewModel = this.getViewModel();
    //     console.log('viewModel', viewModel);

    //     var movie = viewModel.get('movie');
    //     console.log('customer', customer);
    //     var createData = {
    //         moviePicture: movie.moviePicture,
    //         movieName: movie.movieName,
    //         movieDescription: movie.movieDescription,
    //         movieReleaseDate: movie.movieReleaseDate,
    //         movieQuantity: movie.movieQuantity,
    //         moviePrice: movie.moviePrice
    //     };

    //     var recordId = movie.movieId;


    //     if (recordId) {
    //         // Update existing record
    //         var myStore = Ext.getStore('tblmovies');
    //         myStore.load();
    //         myStore.on('load', function (store, records, successful, operation) {
    //             if (successful) {
    //                 var recordToUpdate = myStore.getById(recordId);
    //                 console.log('recordToUpdate', recordToUpdate)
    //                 if (recordToUpdate) {
    //                     recordToUpdate.set('moviePicture', movie.moviePicture);
    //                     recordToUpdate.set('movieName', movie.movieName);
    //                     recordToUpdate.set('movieDescription', movie.movieDescription);
    //                     recordToUpdate.set('movieReleaseDate', movie.movieReleaseDate);
    //                     recordToUpdate.set('movieQuantity', movie.movieQuantity);
    //                     recordToUpdate.set('moviePrice', movie.moviePrice);
    //                     recordToUpdate.save({
    //                         success: function (record, operation) {
    //                             Ext.getCmp('movieFormWindow').close();
    //                             Ext.Msg.alert('Success', 'Record updated successfully');
    //                         },
    //                         failure: function (record, operation) {
    //                             Ext.getCmp('movieFormWindow').close();
    //                             console.error('Failed to update record:', operation.getError());
    //                         }
    //                     });
    //                     myStore.load();
    //                 } else {
    //                     console.error('Record not found');
    //                 }
    //             } else {
    //                 console.log('Failed to load store data');
    //             }
    //         });
    //     } else {
    //         // Create new record
    //         fetch('https://localhost:7041/api/TblMovies/CreateMovie', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(createData)
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 Ext.getCmp('movieFormWindow').close();
    //                 console.log('Record created successfully:', data);
    //                 Ext.Msg.alert('Success', 'Record saved successfully');
    //             })
    //             .catch(error => {
    //                 Ext.getCmp('movieFormWindow').close();
    //                 console.error('Failed to create record:', error);
    //                 Ext.Msg.alert('Failed', 'Failed to save record');
    //             });

    //     }

    // },
    onDeleteClick: function (sender, record, grid, selection) {
        var selectedRecord = this.getView().getSelection()[0];
        var recordName = selectedRecord.get('movieName');
        console.log('selectedRecord', selectedRecord)
        Ext.Msg.confirm('Delete', 'Are you sure you want to delete "' + recordName + '" ?', this.onConfirm, this);
    },
    onConfirm: function (choice) {
        Ext.Msg.confirm('Delete', 'Are you sure to delete?', this.onConfirm, this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            var selectedRecord = this.getView().getSelection()[0];


            if (!selectedRecord) {
                console.error('No record selected');
                return;
            }
            console.log('selectedRecord', selectedRecord)

            var movieId = selectedRecord.get('movieId');
            var idProperty = selectedRecord.self.idProperty; // Store the original idProperty value

            selectedRecord.self.idProperty = 'movieId'; // Set the idProperty to 'actorId' for the update operation
            selectedRecord.setId(movieId); // Set the actorId as the new id for the record

            selectedRecord.erase({
                success: function (record, operation) {
                    // Ext.getCmp('actorFormWindow').close();
                    Ext.Msg.alert('Success', 'Record deleted successfully');
                },
                failure: function (record, operation) {
                    // Ext.getCmp('actorFormWindow').close();
                    console.error('Failed to delete record:', operation.getError());
                }
                // callback: function (record, operation, success) {
                //     // Restore the original idProperty value after the update operation
                //     selectedRecord.self.idProperty = idProperty;
                // }
            });
        }
    },

    onCancelClick: function (form) {
        this.getView().close();
    }

});
