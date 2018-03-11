/**
 * Simple drawing application
 *  using Vue.js
 */
var app = new Vue({
  el: '#root',

  data: {

    // state flag, true during drawing operation
    isDrawing: false,

    // array of array of coordinates of all drawn paths: 
    // [
    //  [ [0,0], [1,1] ... ]
    // ]
    paths: []

  },

  computed: {

    // create "d" attribute for <path> element
    renderPath: function() {
      var pathStr = "", p, points, i, pt;
      for (p = 0; p < this.paths.length; p++) {
        points = this.paths[p];
        for (i = 0; i < points.length; i++) {
          pt = points[i];
          pathStr += i === 0 ? 'M ' : 'L ';
          pathStr += pt[0] + ',' + pt[1];
        }
      }
      return pathStr;
    },

    // display a status message
    message: function() {
      return this.isDrawing ? 'Drawing!' : 'Waiting...';
    }
  },

	methods: {

    // return index of most recent drawn path
    currentPathIndex: function() {
      return this.paths.length - 1;
    },

    // begin a drawing path
    startPath: function(event) {
      this.isDrawing = true;
      this.paths.push([[
        event.pageX, event.pageY
      ]]);
    },

    // add current point to path
    addToPath: function(event) {
      var idx = this.currentPathIndex();
      if (!this.isDrawing) { return; }
      this.paths[idx].push([
        event.pageX, event.pageY
      ]);
    },

    // end the path
    endPath: function(event) {
      var idx = this.currentPathIndex();
      if (!this.isDrawing) { return; }
      this.isDrawing = false;
      this.paths[idx].push([
        event.pageX, event.pageY
      ]);
    },
  }

});
