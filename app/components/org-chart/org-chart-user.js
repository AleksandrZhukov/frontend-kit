Polymer({
  ready: function() {
    this.usersWithOutSubordinates = this.user.subordinates.filter(subordinate => !subordinate.subordinates.length);

    this.usersWithSubordinates = this.user.subordinates.filter(subordinate => subordinate.subordinates.length);

    var halfOfManagers = Math.ceil(this.usersWithSubordinates.length / 2);

    this.leftPartOfManagers = this.usersWithSubordinates.slice(0, halfOfManagers);
    this.rightPartOfManagers = this.usersWithSubordinates.slice(halfOfManagers);
  },

  domReady: function() {
    var managerBlock = this.$.manager,
        line = this.parentNode.querySelector(".line"),
        container = this.$.container,
        shift = 0,
        midPoint = 0,
        parentShift = 0,
        parentMidPoint = 0,
        elementShift = 0;

    if (this.usersWithSubordinates.length === 1 && this.usersWithOutSubordinates.length === 0) shift = 0;
    else {
      shift = -(container.querySelector("#left-part").offsetWidth - container.querySelector("#right-part").offsetWidth) / 2;
    }
    container.style.transform = "matrix(1, 0, 0, 1, " + shift + ", 0)";
    this.style.paddingLeft = (-shift) + "px";
    if (-shift < 0) this.style.marginLeft = (-shift) + "px";
    this.style.marginRight = shift + "px";
    this.forChild = parseInt(this.getAttribute("parentShift")) + shift;
    if (this.getAttribute("parentShift")) parentShift = parseInt(this.getAttribute("parentShift"));
    midPoint = managerBlock.offsetLeft + managerBlock.offsetWidth / 2 + parentShift;
    this.parentMidPoint = midPoint;
    if (this.getAttribute("parentMidPoint")) parentMidPoint = parseInt(this.getAttribute("parentMidPoint"));
    if (this.getAttribute("elementShift")) elementShift = parseInt(this.getAttribute("elementShift"));

    if (parentMidPoint > midPoint) {
      line.style.left = midPoint - elementShift - parentShift + "px";
      line.style.width = parentMidPoint - midPoint + "px";
    }
    else {
      line.style.width = midPoint - parentMidPoint + "px";
      line.style.left = parentMidPoint - elementShift - parentShift + "px";
    }
  }
});
