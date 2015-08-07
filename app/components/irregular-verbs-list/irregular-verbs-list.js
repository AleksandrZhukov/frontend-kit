Polymer({
  verbs: [{"base":"Be","past":"Was/Were","third":"Been","gerund":"Being","translation":"Быть"},{"base":"Come","past":"Came","third":"Come","gerund":"Coming","translation":"Прийти"}],

  matchVerb: function(items, query) {
    if (items == null) {return [];}
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < this.verbs.length; i++) {
      var verb = this.verbs[i];
      if (letterMatch.test(verb.base)) {
        filtered.push(verb);
      }
    }
    return filtered;
  }
});
