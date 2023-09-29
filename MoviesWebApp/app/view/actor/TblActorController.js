Ext.define('MoviesWebApp.view.actor.TblActorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.actor',

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
                    var actorFullName = record.get('actorFullName');

                    // Convert both values to lowercase for case-insensitive comparison
                    actorFullName = actorFullName.toLowerCase();
                    searchText = searchText.toLowerCase();

                    // Customize the conditions for searching based on your requirements
                    return (
                        actorFullName.includes(searchText)
                    );
                }
            });
        }
    },
    onCreateClick: function () {
        var form = Ext.create('MoviesWebApp.view.actor.TblActorForm');
        form.show();
    },
    onEditClick: function () {
        var selectedRecord = this.getView().getSelection()[0];
        console.log('selectedRecord', selectedRecord)

        // var recordIded = selectedRecord.getId(id.actorId);
        // console.log('recordIded', recordIded);

        if (selectedRecord) {
            var form = Ext.create('MoviesWebApp.view.actor.TblActorForm', {
                viewModel: {
                    data: {
                        actor: selectedRecord.getData(),
                        formTitle: 'Edit Actor',
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
    onDeleteClick: function (sender, record, grid, selection) {
        var selectedRecord = this.getView().getSelection()[0];
        var recordName = selectedRecord.get('actorFullName');
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
            var actorId = selectedRecord.get('actorId');
            var idProperty = selectedRecord.self.idProperty; // Store the original idProperty value

            selectedRecord.self.idProperty = 'actorId'; // Set the idProperty to 'actorId' for the update operation
            selectedRecord.setId(actorId); // Set the actorId as the new id for the record

            selectedRecord.erase({
                success: function (record, operation) {
                    // Ext.getCmp('actorFormWindow').close();
                    Ext.Msg.alert('Success', 'Record deleted successfully');
                },
                failure: function (record, operation) {
                    Ext.getCmp('actorFormWindow').close();
                    console.error('Failed to delete record:', operation.getError());
                }
                // callback: function (record, operation, success) {
                //     // Restore the original idProperty value after the update operation
                //     selectedRecord.self.idProperty = idProperty;
                // }
            });

            // var recordId = selectedRecord.getId('actorId');
            // console.log('recordId', recordId)

            // if (recordId) {

            //     // Update existing record
            //     var myStore = Ext.create('MoviesWebApp.store.TblActor');
            //     console.log('myStore', myStore)
            //     myStore.load({
            //         callback: function (records, operation, success) {
            //             if (success) {
            //                 // Store is loaded successfully
            //                 var recordToDelete = myStore.getById(recordId);
            //                 recordToDelete.erase({
            //                     success: function (record, operation) {
            //                         // var window = viewModel.getView();
            //                         window.close();
            //                         Ext.Msg.alert('Success', 'Record delete successfully');
            //                     },
            //                     failure: function (record, operation) {
            //                         console.error('Failed to delete record:', operation.getError());
            //                     }
            //                 });
            //                 myStore.load();
            //             } else {
            //                 console.error('Record not found')
            //             }
            //         }
            //     });
            // }
        }
    },
    submitSave: function (options) {
        var actor = this.getViewModel().get('actor');
        var actorModel = Ext.create('MoviesWebApp.model.TblActor', {
            // ActorId: actor.ActorId,
            actorFullName: actor.actorFullName,
            actorPicture: actor.actorPicture
        });
        actorModel.save({
            success: function (record, operation) {
                // Handle success
                Ext.getCmp('actorFormWindow').close();
                Ext.Msg.alert('Success', 'Record saved successfully');
                // console.log('Record created successfully:', record.getData());
            },
            failure: function (record, operation) {
                // Handle failure
                Ext.getCmp('actorFormWindow').close();
                Ext.Msg.alert('Failed', ' Failed to saved record');
                // console.error('Failed to create record:', operation.getError());
            }
        });

    },
    onUpdateclick: function (options) {
        var form = this.getView().down('form');
        var values = form.getValues();

        if (this.recordToUpdate) {
            var actorId = this.recordToUpdate.get('actorId');
            var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value

            this.recordToUpdate.self.idProperty = 'actorId'; // Set the idProperty to 'actorId' for the update operation
            this.recordToUpdate.setId(actorId); // Set the actorId as the new id for the record

            this.recordToUpdate.set(values);
            this.recordToUpdate.save({
                success: function (record, operation) {
                    Ext.getCmp('actorFormWindow').close();
                    Ext.Msg.alert('Success', 'Record updated successfully');
                },
                failure: function (record, operation) {
                    Ext.getCmp('actorFormWindow').close();
                    console.error('Failed to update record:', operation.getError());
                }
                // callback: function (record, operation, success) {
                //     // Restore the original idProperty value after the update operation
                //     this.recordToUpdate.self.idProperty = idProperty;
                // },
                // scope: this
            });
        }
        // var form = this.getView().down('form');
        // var values = form.getValues();
        // console.log('values', values);

        // if (this.recordToUpdate) {
        //     var actorId = this.recordToUpdate.get('actorId');
        //     console.log('actorId', actorId);
        //     var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value
        //     console.log('idProperty', idProperty);

        //     this.recordToUpdate.self.idProperty = 'actorId'; // Set the idProperty to 'actorId' for the update operation
        //     this.recordToUpdate.setId(actorId); // Set the actorId as the new id for the record

        //     this.recordToUpdate.set(values);
        //     this.recordToUpdate.save({
        //         success: function (record, operation) {
        //             Ext.getCmp('actorFormWindow').close();
        //             Ext.Msg.alert('Success', 'Record updated successfully');
        //         },
        //         failure: function (record, operation) {
        //             Ext.getCmp('actorFormWindow').close();
        //             console.error('Failed to update record:', operation.getError());
        //         },
        //         callback: function (record, operation, success) {
        //             // Restore the original idProperty value after the update operation
        //             this.recordToUpdate.self.idProperty = idProperty;
        //         },
        //         scope: this
        //     });
        // }

    },
    onSaveClick: function (options) {
        /*  
          var actor = this.getViewModel().get('actor');
          var actorModel = Ext.create('MoviesWebApp.model.TblActor', {
              // ActorId: actor.ActorId,
              actorFullName: actor.actorFullName,
              actorPicture: actor.actorPicture
          });
          actorModel.save({
              success: function (record, operation) {
                  // Handle success
                  Ext.Msg.alert('Success', 'Record saved successfully');
                  // console.log('Record created successfully:', record.getData());
              },
              failure: function (record, operation) {
                  // Handle failure
                  Ext.Msg.alert('Failed', ' Failed to saved record');
                  // console.error('Failed to create record:', operation.getError());
              }
          });
          */
        var viewModel = this.getViewModel();
        console.log('viewModel', viewModel);

        var actor = viewModel.get('actor');
        console.log('actor', actor);
        var createData = {
            actorFullName: actor.actorFullName,
            actorPicture: actor.actorPicture
        };

        var recordId = actor.actorId;

        if (recordId) {
            // Update existing record
            var myStore = Ext.getStore('tblactors');
            myStore.load();
            myStore.on('load', function (store, records, successful, operation) {
                if (successful) {
                    var recordToUpdate = myStore.getById(recordId);
                    if (recordToUpdate) {
                        recordToUpdate.set('actorPicture', actor.actorPicture);
                        recordToUpdate.set('actorFullName', actor.actorFullName);
                        recordToUpdate.save({
                            success: function (record, operation) {
                                Ext.getCmp('actorFormWindow').close();
                                Ext.Msg.alert('Success', 'Record updated successfully');
                                // var window = viewModel.getView();
                                // window.close();
                            },
                            failure: function (record, operation) {
                                Ext.getCmp('actorFormWindow').close();
                                console.error('Failed to update record:', operation.getError());
                            }
                        });
                        // var window = viewModel.getView();
                        // window.close();
                        // myStore.load();
                    } else {
                        console.error('Record not found');
                    }
                } else {
                    console.log('Failed to load store data');
                }
            });

        } else {
            // Create new record
            fetch('https://localhost:7041/api/TblActors/CreateActor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createData)
            })
                .then(response => response.json())
                .then(data => {
                    Ext.getCmp('actorFormWindow').close();
                    console.log('Record created successfully:', data);
                    Ext.Msg.alert('Success', 'Record saved successfully');
                })
                .catch(error => {
                    Ext.getCmp('actorFormWindow').close();
                    console.error('Failed to create record:', error);
                    Ext.Msg.alert('Failed', 'Failed to save record');
                });
            // var window = viewModel.getView();
            // window.close();
        }
    },
    onCancelClick: function (form) {
        this.getView().close();
    }

});