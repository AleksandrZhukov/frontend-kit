Polymer({
  size: '60x60',
  color: '#2196f3',
  showInitials: true,

  computed: {
    width: 'getWidth(size)',
    height: 'getHeight(size)',
    initials: 'fetchInitials(name)'
  },

  ready: function() {
    this.fontSize = Math.floor(this.height / 3);
  },

  getWidth: function(size) {
    return +size.split('x')[0];
  },

  getHeight: function(size) {
    return +size.split('x')[1];
  },

  fetchInitials: function() {
    if (!this.name) return '';
    return this.name.split(/\s/).map(s => s.charAt(0)).join('');
  },

  srcChanged: function() {
    this.showInitials = true;
    var img = new Image();
    img.src = this.src;
    img.onload = function() {
      this.showInitials = false;
    }.bind(this);
  }
});
