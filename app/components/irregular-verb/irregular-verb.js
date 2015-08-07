Polymer({
  opened: false,
  forms: [{"name":"base","desc":"Base Form"},{"name":"past","desc":"Past Simple"},{"name":"third","desc":"Past Participle"},{"name":"gerund","desc":"Present Participle/Gerund"}],

  toggleVerb: function() {
    this.$.forms.toggle();
  }
});