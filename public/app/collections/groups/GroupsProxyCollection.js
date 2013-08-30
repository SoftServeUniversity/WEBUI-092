define([
  'jquery',
  'underscore',
  'backbone',
  'models/group/GroupProxyModel'
  ],
  function($, _, Backbone, GroupProxyModel)
  {
    var GroupsCollection = Backbone.Collection.extend({
      model:GroupProxyModel,
      url: '/groups/'
    });
    return GroupsCollection;
  });
