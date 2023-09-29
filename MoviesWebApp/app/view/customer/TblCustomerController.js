Ext.define('MoviesWebApp.view.customer.TblCustomerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customer',

    onRefreshClick: function (grid) {
        var grid = this.getView(),
            store = grid.getStore();
            
            
        if (store) {
            store.load();
            console.log('store', store.load())
        } else {
            console.error('Store is null or undefined.');
        }
    },
    onSearchButtonClick: function () {
        var grid = this.getView();
        var store = grid.getStore();

        // Get reference to the search field
        var searchField = this.lookupReference('searchField'); // Replace with the actual reference name
        console.log('searchField',searchField)

        // Retrieve the search field value
        var searchText = searchField.getValue(); // Replace with the actual field name
        console.log('searchText',searchText)

        // Modify the store's filters based on the search field value
        store.clearFilter();
        if (searchText) {
            store.filter({
                filterFn: function(record) {
                    var customerFirstName = record.get('customerFirstName');
                    var customerMiddleName = record.get('customerMiddleName');
                    var customerLastName = record.get('customerLastName');
                    var customerStreet = record.get('customerStreet');
                    var customerCity = record.get('customerCity');
                    var customerCellphone = record.get('customerCellphone');
                    var customerTelephone = record.get('customerTelephone');
        
                    // Convert both values to lowercase for case-insensitive comparison
                    customerFirstName = customerFirstName.toLowerCase();
                    customerMiddleName = customerMiddleName.toLowerCase();
                    customerLastName = customerLastName.toLowerCase();
                    customerStreet = customerStreet.toLowerCase();
                    customerCity = customerCity.toLowerCase();
                    searchText = searchText.toLowerCase();
        
                    // Customize the conditions for searching based on your requirements
                    return (
                        customerFirstName.includes(searchText) ||
                        customerMiddleName.includes(searchText)  ||
                        customerLastName.includes(searchText) ||
                        customerStreet.includes(searchText)  ||
                        customerCity.includes(searchText) ||
                        customerCellphone.includes(searchText)  ||
                        customerTelephone.includes(searchText)
                    );
                }
            });
        }
    },
    onCreateClick: function () {
        var form = Ext.create('MoviesWebApp.view.customer.TblCustomerForm');
        form.show();
    },
    onEditClick: function () {
        var selectedRecord = this.getView().getSelection()[0];
        console.log('selectedRecordselectedRecord', selectedRecord)

        if (selectedRecord) {
            var form = Ext.create('MoviesWebApp.view.customer.TblCustomerForm', {
                viewModel: {
                    data: {
                        customer: selectedRecord.getData(),
                        formTitle: 'Edit Customer',
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
        // var viewModel = this.getViewModel();
        // console.log('viewModel', viewModel);

        // var customer = viewModel.get('customer');
        // console.log('customer', customer);
        // var createData = {
        //     customerPicture: customer.customerPicture,
        //     customerFirstName: customer.customerFirstName,
        //     customerMiddleName: customer.customerMiddleName,
        //     customerLastName: customer.customerLastName,
        //     customerDateBirth: customer.customerDateBirth,
        //     customerAge: customer.customerAge,
        //     customerStreet: customer.customerStreet,
        //     customerCity: customer.customerCity,
        //     customerCellphone: customer.customerCellphone,
        //     customerTelephone: customer.customerTelephone
        // };

        // var recordId = customer.customerId;


        // if (recordId) {
        //     // Update existing record
        //     var myStore = Ext.getStore('tblcustomers');
        //     myStore.load();
        //     myStore.on('load', function (store, records, successful, operation) {
        //         if (successful) {
        //             var recordToUpdate = myStore.getById(recordId);
        //             console.log('recordToUpdate', recordToUpdate)
        //             if (recordToUpdate) {
        //                 recordToUpdate.set('customerPicture', customer.customerPicture);
        //                 recordToUpdate.set('customerFirstName', customer.customerFirstName);
        //                 recordToUpdate.set('customerMiddleName', customer.customerMiddleName);
        //                 recordToUpdate.set('customerLastName', customer.customerLastName);
        //                 recordToUpdate.set('customerDateBirth', customer.customerDateBirth);
        //                 recordToUpdate.set('customerAge', customer.customerAge);
        //                 recordToUpdate.set('customerStreet', customer.customerStreet);
        //                 recordToUpdate.set('customerCity', customer.customerCity);
        //                 recordToUpdate.set('customerCellphone', customer.customerCellphone);
        //                 recordToUpdate.set('customerTelephone', customer.customerTelephone);
        //                 recordToUpdate.save({
        //                     success: function (record, operation) {
        //                         Ext.getCmp('customerFormWindow').close();
        //                         Ext.Msg.alert('Success', 'Record updated successfully');
        //                     },
        //                     failure: function (record, operation) {
        //                         Ext.getCmp('customerFormWindow').close();
        //                         console.error('Failed to update record:', operation.getError());
        //                     }
        //                 });
        //                 // myStore.load();
        //             } else {
        //                 console.error('Record not found');
        //             }
        //         } else {
        //             console.log('Failed to load store data');
        //         }
        //     });
        // } else {
        //     // Create new record
        //     fetch('https://localhost:7041/api/TblCustomers/CreateCustomer', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(createData)
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             Ext.getCmp('customerFormWindow').close();
        //             console.log('Record created successfully:', data);
        //             Ext.Msg.alert('Success', 'Record saved successfully');
        //         })
        //         .catch(error => {
        //             Ext.getCmp('customerFormWindow').close();
        //             console.error('Failed to create record:', error);
        //             Ext.Msg.alert('Failed', 'Failed to save record');
        //         });
        // }

        var form = this.getView().down('form');
        console.log('form', form);
        var values = form.getValues();
        console.log('values', values);
        var customerId = values.customerId;
        console.log('customerId',customerId)

        if (customerId) {
            // Update existing record
            if (this.recordToUpdate) {
                var idProperty = this.recordToUpdate.self.idProperty; // Store the original idProperty value

                this.recordToUpdate.self.idProperty = 'customerId'; // Set the idProperty to 'actorId' for the update operation
                this.recordToUpdate.setId(customerId); // Set the actorId as the new id for the record

                this.recordToUpdate.set(values);
                this.recordToUpdate.save({
                    success: function (record, operation) {
                        Ext.getCmp('customerFormWindow').close();
                        Ext.Msg.alert('Success', 'Record updated successfully');
                    },
                    failure: function (record, operation) {
                        Ext.getCmp('customerFormWindow').close();
                        console.error('Failed to update record:', operation.getError());
                    }
                });
            } else {
                console.error('No record to update');
            }
        } else {
            // Create new record
            var customerModel = Ext.create('MoviesWebApp.model.TblCustomer');
            customerModel.set(values);
            customerModel.save({
                success: function (record, operation) {
                    Ext.getCmp('customerFormWindow').close();
                    Ext.Msg.alert('Success', 'Record saved successfully');
                },
                failure: function (record, operation) {
                    Ext.getCmp('customerFormWindow').close();
                    Ext.Msg.alert('Failed', 'Failed to save record');
                    console.error('Failed to update record:', operation.getError());
                }
            });
        }

    },
    
    onDeleteClick: function (sender, record, grid, selection) {
        var selectedRecord = this.getView().getSelection()[0];
        var recordName = selectedRecord.get('customerFirstName');
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

            var customerId = selectedRecord.get('customerId');
            var idProperty = selectedRecord.self.idProperty; // Store the original idProperty value

            selectedRecord.self.idProperty = 'customerId'; // Set the idProperty to 'actorId' for the update operation
            selectedRecord.setId(customerId); // Set the actorId as the new id for the record

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
