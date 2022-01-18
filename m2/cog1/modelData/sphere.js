/**
 * Creates a unit sphere by subdividing a unit octahedron.
 * Starts with a unit octahedron and subdivides the faces,
 * projecting the resulting points onto the surface of a unit sphere.
 *
 * For the algorithm see:
 * https://sites.google.com/site/dlampetest/python/triangulating-a-sphere-recursively
 * http://sol.gfxile.net/sphere/index.html
 * http://nipy.sourceforge.net/dipy/reference/dipy.core.triangle_subdivide.html
 * http://skyview.gsfc.nasa.gov/blog/index.php/2008/12/31/skyview-to-include-healpix-and-wmap/
 *
 *        1
 *       /\
 *      /  \
 *    b/____\ c
 *    /\    /\
 *   /  \  /  \
 *  /____\/____\
 * 0      a     2
 *
 * Parameter:
 * 	recursionDepth
 * 	color or -1 = many colors
 *
 * For texture see:
 * http://earthobservatory.nasa.gov/Features/BlueMarble/
 *
 * @namespace cog1.data
 * @module sphere
 */

define(["exports", "data", "glMatrix"], function (exports, data) {
  "use strict";
  const initial_vertices = [
    [1.0, 0.0, 0.0], //0
    [-1.0, 0.0, 0.0], //1
    [0.0, 1.0, 0.0], // 2
    [0.0, -1.0, 0.0], // 3
    [0.0, 0.0, 1.0], // 4
    [0.0, 0.0, -1.0], // 5
  ];
  const intial_poly = [
    [0, 4, 2],
    [2, 4, 1],
    [1, 4, 3],
    [3, 4, 0],
    [0, 2, 5],
    [2, 1, 5],
    [1, 3, 5],
    [3, 0, 5],
  ];
  /**
   * Procedural calculation.
   *
   * @parameter object with fields:
   * @parameter scale
   * @parameter recursionDepth
   * @parameter color [-1 for many colors]
   */
  exports.create = function (parameter) {
    if (parameter) {
      var scale = parameter.scale;
      var recursionDepth = parameter.recursionDepth;
      var color = parameter.color;
      var textureURL = parameter.textureURL;
    }
    // Set default values if parameter is undefined.
    if (scale == undefined) {
      scale = 250;
    }
    if (recursionDepth == undefined) {
      recursionDepth = 3;
    }
    if (color == undefined) {
      color = 9;
    }
    if (textureURL == undefined) {
      textureURL = "";
    }

    // Instance of the model to be returned.
    var instance = {};

    // BEGIN exercise Sphere

    // Starting with octahedron vertices

    // octahedron triangles

    //instance = devide_all(instance, 1);
    instance.vertices = [...initial_vertices];
    instance.polygonVertices = [...intial_poly];
    devide_all.call(instance, recursionDepth);
    // END exercise Sphere

    generateTextureCoordinates.call(instance);

    data.applyScale.call(instance, scale);
    data.setColorForAllPolygons.call(instance, color);

    instance.textureURL = textureURL;

    return instance;
  };
  /**
   * Called with this pointer set to instance.
   * Generate texture coordinates one per each corner of a polygon,
   * thus a vertex can have more than one uv, depending on the polygon it is part of.
   * The coordinates u.v represent the angles theta and phi
   * of point vector to x and y axis.
   * See:
   * http://tpreclik.dyndns.org/codeblog/?p=9
   *
   * Assume that vertices are not yet scaled, thus have length 1.
   *
   */
  function generateTextureCoordinates() {
    // BEGIN exercise Sphere-Earth-Texture

    // As there is not exactly one texture coordinate per vertex,
    // we have to install a different mapping as used for polygonVertices to vertices.
    // For texture coordinate system use openGL standard, where origin is bottom-left.
    this.textureCoord = [];
    this.polygonTextureCoord = [];

    // Loop over vertices/edges in polygon.

    // Shorthands for the current vertex.

    // Calculate longitude (east-west position) phi (u-coordinate).
    // arctangent (of here z/x), representing the angle theta between the positive X axis, and the point.
    // Scale phi to uv range [0,1].

    // Calculate latitude (north-south position) theta (v-coordinate) from y component of vertex.
    // Scale theta to uv range [0,1].

    // Store new uv coordinate in new uv-vector.
    //console.log("phi:" + (~~(phi * 100)) + "  theta:" + (~~(theta * 100)) + " x:" + (~~(x * 100)) + " z:" + (~~(z * 100)));

    // Problem with phi/u: phi=360 and phi=0 are the same point in 3D and also on a tiled texture.
    // But for faces it is a difference if uv-range is 350�-360� [.9-1]or 350�-0� [.9-0].
    // Thus, insert a check/hack (assuming faces cover only a small part of the texture):

    // Check if u-range should be low or high (left or right in texture),
    // by summing up u values (ignoring u=0 values).

    // Check and correct u values if 0;

    // END exercise Sphere-Earth-Texture
  }

  // BEGIN exercise Sphere

  /**
   * Recursively divide all triangles.
   */
  function devide_all(instance, nbRecusions) {
    // nbRecusions is not set from initial call.
    if (nbRecusions == undefined) {
      nbRecusions = 0;
    }

    do {
      var res = divvy_up(instance.vertices, instance.polygonVertices);

      instance.vertices = res[0];
      instance.polygonVertices = res[1];
    } while (--nbRecusions > 0);

    return instance;
  }
  /**
   * Recursively divide all triangles.
   */
  function devide_all(recursionDepth, nbRecusions) {
    // nbRecusions is not set from initial call.
    if (nbRecusions == undefined) {
      nbRecusions = 0;
    }
    // Stop criterion.
    if (nbRecusions == recursionDepth) {
      return;
    }
    //console.log("nbRecusions: "+nbRecusions);

    // Assemble divided polygons in an new array.
    var newPolygon = [];
    for (var v = 0; v < this.polygonVertices.length; v++) {
      // Starting with octahedron vertices
      //  1)  a = (p0+2)/2
      //      b = (p0+1)/2
      //      c = (p1+2)/2
      //
      //  2)  Normalize a, b, c
      //
      //  3)  Construct new triangles:
      //       t1 [p0,b,a]
      //       t2 [b,p1,c]
      //       t3 [a,b,c]
      //       t4 [a,c,p2]
      //
      //        p1
      //       /\
      //      /t2\
      //    b/____\ c
      //    /\ t3 /\
      //   /t1\  /t4\
      //  /____\/____\
      // p0    a     p2

      // get points of triangle
      var p0 = this.polygonVertices[v][0];
      var p1 = this.polygonVertices[v][1];
      var p2 = this.polygonVertices[v][2];

      //console.log("Points: " +p0+ "|" +p1+  "|" +p2);

      //get vectors
      var v0 = this.vertices[p0];
      var v1 = this.vertices[p1];
      var v2 = this.vertices[p2];

      //create new vectors
      var a = vecAdd(v0, v2);
      var b = vecAdd(v0, v1);
      var c = vecAdd(v1, v2);

      a = vecMul(a, 0.5);
      b = vecMul(b, 0.5);
      c = vecMul(c, 0.5);

      // normalize
      a = vecNormalize(a);
      b = vecNormalize(b);
      c = vecNormalize(c);

      //get new indices for vertices
      var indexA = this.vertices.length;
      this.vertices.push(a);
      var indexB = this.vertices.length;
      this.vertices.push(b);
      var indexC = this.vertices.length;
      this.vertices.push(c);

      // construct new Polygon (triangle)
      newPolygon.push([p0, indexB, indexA]);
      newPolygon.push([indexB, p1, indexC]);
      newPolygon.push([indexA, indexB, indexC]);
      newPolygon.push([indexA, indexC, p2]);
    }
    // Swap result.
    this.polygonVertices = newPolygon;
    // Recursion.
    devide_all.call(this, recursionDepth, nbRecusions + 1);

    // END exercise Sphere
  }

  const vecNormalize = (v) => {
    if (v.length != 3) {
      throw new Error("Vector of length 3 expected");
    }
    var vectorLength = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return [v[0] / vectorLength, v[1] / vectorLength, v[2] / vectorLength];
  };

  const vecAdd = (v1, v2) => {
    if (v1.length != v2.length) {
      throw new Error("Vectors must be of same length");
    }
    var tmp = [];
    v1.forEach((element, index) => {
      tmp.push(element + v2[index]);
    });
    return tmp;
  };
  const vecMul = (vec, num) => {
    var tmp = [];
    vec.forEach((element) => {
      tmp.push(element * num);
    });
    return tmp;
  };

  // END exercise Sphere
});
