Ext.define("MoviesWebApp.view.movie.TblMovieGrid", {
  extend: "Ext.grid.Panel",
  xtype: "moviegrid",

  store: { type: "tblmovies" },

  controller: "movie", //connection in TblMovieController

  viewModel: "movie",

  title: "Movie Records",

  viewConfig: {
    height: 400,
    scrollable: true,
  },

  columns: [
    { text: "Movie ID", dataIndex: "movieId", flex: 1 },
    { text: "Picture", dataIndex: "moviePicture", flex: 1, hidden: true },
    { text: "Title", dataIndex: "movieName", flex: 1 },
    { text: "Description", dataIndex: "movieDescription", flex: 1 },
    {
      text: "Release Date",
      dataIndex: "movieReleaseDate",
      xtype: "datecolumn",
      format: "m-d-Y",
      flex: 1,
    },
    { text: "Price", dataIndex: "moviePrice", flex: 1 },
    { text: "Categories", dataIndex: "categories", flex: 1 },
    { text: "Actors", dataIndex: "actors", flex: 1 },
    // {
    //   text: 'Actors',
    //   dataIndex: 'actorIds',
    //   flex: 1,
    //   renderer: function (value, metaData, record) {
    //     var actorNames = [];
    //     var actorMovies = record.get('actorMovies');

    //     if (actorMovies && actorMovies.length > 0) {
    //       actorNames = actorMovies.map(function (am) {
    //         return am.Actors.actorFullName;
    //       });
    //     }

    //     if (actorNames && actorNames.length > 0) {
    //       return actorNames.join(', ');
    //     }

    //     return '';
    //   }
    // },
    // {
    //   text: 'Categories',
    //   dataIndex: 'categoryIds',
    //   flex: 1,
    //   renderer: function (value, metaData, record) {
    //     var categoryNames = [];
    //     var categoryMovies = record.get('categoryMovies');

    //     if (categoryMovies && categoryMovies.length > 0) {
    //       categoryNames = categoryMovies.map(function (cm) {
    //         return cm.Categories.categoryName;
    //       });
    //     }

    //     if (categoryNames && categoryNames.length > 0) {
    //       return categoryNames.join(', ');
    //     }

    //     return '';
    //   }
    // }
  ],
  tbar: [
    {
      xtype: "textfield",
      // fieldLabel: 'Search',
      reference: "searchField",
      name: "searchText",
      emptyText: "Enter a search term...",
    },
    {
      xtype: "button",
      text: "Search",
      handler: "onSearchButtonClick", // Specify the handler for the button click event
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          text: "Refresh",
          handler: "onRefreshClick",
        },
        {
          text: "Create",
          handler: "onCreateClick",
        },
        {
          text: "Edit",
          handler: "onEditClick",
        },
        {
          text: "Delete",
          handler: "onDeleteClick",
        },
      ],
    },
  ],
});
