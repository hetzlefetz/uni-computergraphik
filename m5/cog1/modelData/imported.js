/**
 * Empty object for groups in scenegraph.
 *
 * @namespace cog1.data
 * @module empty
 */

define(["exports", "data", "./borsuk"], function (exports, data, borsuk) {
  "use strict";

  /**
   * Create an instance of the model defined in this module.
   *
   * @parameter object with fields:
   * @returns instance of this model.
   */
  exports.create = function (parameter) {
    if (parameter) {
      var scale = parameter.scale;
    }
    // Set default values if parameter is undefined.
    if (scale == undefined) {
      scale = 100;
    }

    var instance = {};

    instance.vertices = [];
    instance.polygonVertices = [];
    instance.polygonColors = [];
    var arr = window.myImportedBorsuk.split(/\r?\n/);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].startsWith("v")) {
        var split = arr[i].split(" ");
        instance.vertices.push([split[1], split[2], split[3]]);
      }
      if (arr[i].startsWith("f")) {
        var split = arr[i].split(" ");
        instance.polygonVertices.push([
          split[1] - 1,
          split[2] - 1,
          split[3] - 1,
        ]); //Obj seems to be one based
      }
    }

    // Instance of the model to be returned.

    data.applyScale.call(instance, scale);
    return instance;
  };
});
