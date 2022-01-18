/**
 * Empty object for groups in scenegraph.
 *
 * @namespace cog1.data
 * @module empty
 */
define(["exports", "data"], function (exports, data) {
  "use strict";

  /**
   * Create an instance of the model defined in this module.
   *
   * @parameter object with fields:
   * @returns instance of this model.
   */
  exports.create = function (parameter) {
    var scale = 200;

    // Instance of the model to be returned.
    var instance = {};

    instance.vertices = [
      // bottom (y=-1)
      [0, 0, 0],
      [1, 1, 0],
    ];
    instance.polygonVertices = [[0, 1]];
    instance.polygonColors = [2];
    data.applyScale.call(instance, scale);

    return instance;
  };
});
