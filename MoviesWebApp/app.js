/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MoviesWebApp.Application',

    name: 'MoviesWebApp',

    requires: [
        // This will automatically load all classes in the MoviesWebApp namespace
        // so that application classes do not need to require each other.
        'MoviesWebApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'MoviesWebApp.view.main.Main'
});
