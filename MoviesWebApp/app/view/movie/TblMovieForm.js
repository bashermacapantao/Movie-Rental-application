Ext.define("MoviesWebApp.view.movie.TblMovieForm", {
  extend: "Ext.window.Window",
  xtype: "movie",

  id: "movieFormWindow",

  controller: "movie",

  //related on view model
  viewModel: {
    type: "movie",
  },

  // title: 'Create new actor',
  bind: {
    title: "{formTitle}",
  },

  items: [
    {
      xtype: "form",
      width: 450,
      bodyPadding: 10,
      defaults: {
        anchor: "100%",
        labelWidth: 100,
      },
      items: [
        {
          xtype: "textfield",
          fieldLabel: "ID",
          name: "movieId",
          readOnly: true,
          bind: "{movie.movieId}",
        },
        {
          xtype: "textfield",
          fieldLabel: "Image",
          name: "moviePicture",
          bind: "{movie.moviePicture}",
        },
        {
          xtype: "textfield",
          fieldLabel: "Name",
          name: "movieName",
          bind: "{movie.movieName}",
        },
        {
          xtype: "textfield",
          fieldLabel: "Description",
          name: "movieDescription",
          bind: "{movie.movieDescription}",
        },
        {
          xtype: "datefield",
          fieldLabel: "Release Date",
          name: "movieReleaseDate",
          bind: "{movie.movieReleaseDate}",
          format: "d/m/Y",
          submitFormat: "Y-m-d",
        },
        {
          xtype: "textfield",
          fieldLabel: "Price",
          name: "moviePrice",
          bind: "{movie.moviePrice}",
        },
        {
          xtype: "tagfield",
          name: "actorIds",
          fieldLabel: "Actors",
          bind: {
            store: "{actors}",
            value: "{actorIds}",
          },
          reference: "actorsField", // Reference for retrieving the selected actors
          // store: 'tblactors',
          valueField: "actorId",
          displayField: "actorFullName",
          queryMode: "local",
          forceSelection: true,
          editable: true,
          createNewOnEnter: true,
          createNewOnBlur: true,
          listeners: {
            beforequery: function (queryPlan, eOpts) {
              queryPlan.query = new RegExp(queryPlan.query, "i");
              queryPlan.forceAll = true;
            } // Bind the field to the categories property of the model
          }
        },
        {
          xtype: "tagfield",
          fieldLabel: "Categories",
          name: "categoryIds",
          bind: {
            store: "{categories}",
            value: "{categoryIds}",
          },
          reference: "categoriesField", // Reference for retrieving the selected categories
          // store: 'tblcategories',
          valueField: "categoryId",
          displayField: "categoryName",
          queryMode: "local",
          forceSelection: true,
          editable: true,
          createNewOnEnter: true,
          createNewOnBlur: true,
          listeners: {
            beforequery: function (queryPlan, eOpts) {
              queryPlan.query = new RegExp(queryPlan.query, "i");
              queryPlan.forceAll = true;
            } // Bind the field to the categories property of the model
          }
        }
      ],
      buttons: [
        {
          bind: { text: "{buttonTitle}" },
          handler: "onSaveClick",
          formBind: true,
        },
        { text: "Cancel", handler: "onCancelClick" },
      ]
    }
  ]
});
