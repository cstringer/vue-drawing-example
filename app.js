/**
 * Simple drawing application
 *  using Vue.js
 */
var app = new Vue({
  el: '#root',

  template: 
  '<div>' +
    '<header>{{ message }}</header>' + 
    '<svg v-on:mousedown="startPath" v-on:mousemove="addToPath" v-on:mouseup="endPath">' +
      '<path v-bind:d="renderPath"></path>' +
    '</svg>' +
  '</div>'
  ,

  data: {

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
      return this.paths.reduce(function(str, path) {
        return str + path.reduce(function(s, point, idx) {
          var ptStr = (idx === 0) ? 'M ' : 'L ';
          ptStr += point[0] + ',' + point[1];
          return s + ptStr;
        }, '');
      }, '');
    },

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
