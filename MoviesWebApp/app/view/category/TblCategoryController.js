Ext.define('MoviesWebApp.view.category.TblCategoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.category',

    // onGridRendered: function () {
    //     var store = this.getViewModel().getStore('tblcategories');
    //     if (!store.isLoading() && !this.getViewModel().get('isStoreLoaded')) {
    //         store.load();
    //     }
    // },
    // onStoreLoad: function (store, records, successful, operation, options) {
    //     if (successful) {
    //         this.set('isStoreLoaded', successful);
    //         console.log('Store loaded successfully:', store);
    //         // Additional logic here after the store is loaded successfully
    //     } else {
    //         console.error('Failed to load store:', operation.getError());
    //         // Additional error handling logic here
    //     }
    // },


    onRefreshClick: function (grid) {
        var grid = this.getView(),
            store = grid.getStore();

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
                    var categoryName = record.get('categoryName');

                    // Convert both values to lowercase for case-insensitive comparison
                    categoryName = categoryName.toLowerCase();
                    searchText = searchText.toLowerCase();

                    // Customize the conditions for searching based on your requirements
                    return (
                        categoryName.includes(searchText)
                    );
                }
            });
        }
    },
    onCreateClick: function () {
        var form = Ext.create('MoviesWebApp.view.category.TblCategoryForm');
        form.show();
    },
    onEditClick: function () {
        var selectedRecord = this.getView().getSelection()[0];
        console.log('selectedRecord', selectedRecord)

        if (selectedRecord) {
            var form = Ext.create('MoviesWebApp.view.category.TblCategoryForm', {
                viewModel: {
                    data: {
                        category: selectedRecord.getData(),
                        formTitle: 'Edit Category',
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
        var categoryId = values.categoryId;
        console.log('categoryId',categoryId)
        console.log('values', values);

        if (categoryId) {
            // Update existing record
            if (this.recordToUpdate) {
                var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value

                this.recordToUpdate.self.idProperty = 'categoryId'; // Set the idProperty to 'actorId' for the update operation
                this.recordToUpdate.setId(categoryId); // Set the actorId as the new id for the record

                this.recordToUpdate.set(values);
                this.recordToUpdate.save({
                    success: function (record, operation) {
                        Ext.getCmp('categoryFormWindow').close();
                        Ext.Msg.alert('Success', 'Record updated successfully');
                    },
                    failure: function (record, operation) {
                        Ext.getCmp('categoryFormWindow').close();
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
            var categoryModel = Ext.create('MoviesWebApp.model.TblCategory');
            categoryModel.set(values);
            categoryModel.save({
                success: function (record, operation) {
                    Ext.getCmp('categoryFormWindow').close();
                    Ext.Msg.alert('Success', 'Record saved successfully');
                },
                failure: function (record, operation) {
                    Ext.getCmp('categoryFormWindow').close();
                    Ext.Msg.alert('Failed', 'Failed to save record');
                }
            });
        }


        // var form = this.getView().down('form');
        // var values = form.getValues();

        // if (this.recordToUpdate) {
        //     // Update existing record
        //     var categoryId = this.recordToUpdate.get('categoryId');
        //     var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value

        //     this.recordToUpdate.self.idProperty = 'categoryId'; // Set the idProperty to 'actorId' for the update operation
        //     this.recordToUpdate.setId(categoryId); // Set the actorId as the new id for the record

        //     this.recordToUpdate.set(values);
        //     this.recordToUpdate.save({
        //         success: function (record, operation) {
        //             Ext.getCmp('categoryFormWindow').close();
        //             Ext.Msg.alert('Success', 'Record updated successfully');
        //         },
        //         failure: function (record, operation) {
        //             Ext.getCmp('categoryFormWindow').close();
        //             console.error('Failed to update record:', operation.getError());
        //         }
        //         // ,
        //         // callback: function (record, operation, success) {
        //         //     // Restore the original idProperty value after the update operation
        //         //     this.recordToUpdate.self.idProperty = idProperty;
        //         // },
        //         // scope: this
        //     });
        // } else {
        //     // Create new record
        //     var categoryModel = Ext.create('MoviesWebApp.model.TblCategory');
        //     categoryModel.set(values);
        //     categoryModel.save({
        //         success: function (record, operation) {
        //             Ext.getCmp('categoryFormWindow').close();
        //             Ext.Msg.alert('Success', 'Record saved successfully');
        //         },
        //         failure: function (record, operation) {
        //             Ext.getCmp('categoryFormWindow').close();
        //             Ext.Msg.alert('Failed', 'Failed to save record');
        //         }
        //     });
        // }

    },

    onDeleteClick: function (sender, record, grid, selection) {
        var selectedRecord = this.getView().getSelection()[0];
        var recordName = selectedRecord.get('categoryName');
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

            var categoryId = selectedRecord.get('categoryId');
            var idProperty = selectedRecord.self.idProperty; // Store the original idProperty value

            selectedRecord.self.idProperty = 'categoryId'; // Set the idProperty to 'actorId' for the update operation
            selectedRecord.setId(categoryId); // Set the actorId as the new id for the record

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

})