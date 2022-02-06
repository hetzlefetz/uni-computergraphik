/**
 * Empty object for groups in scenegraph.
 *
 * @namespace cog1.data
 * @module empty
 */
define(["exports", "data"], function (exports, data) {
  "use strict";
  var polyCount = 0;
  /**
   * Create an instance of the model defined in this module.
   *
   * @parameter object with fields:
   * @returns instance of this model.
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
      scale = 10;
    }
    // Instance of the model to be returned.
    var instance = {};

    instance.vertices = [];
    instance.polygonVertices = [];
    instance.polygonColors = [];

    let s1 = makeSphere(4, 4);
    polyCount += s1[0].length;
    let s2 = makeSphere(3, 9);
    polyCount += s2[0].length;
    let s3 = makeSphere(2, 13);
    polyCount += s3[0].length;
    var c1 = makeCylinder(10, 0.1, 0);
    polyCount += c1[0].length;
    var c2 = makeCylinder(3, 1, 15);
    polyCount += c2[0].length;
    var c3 = makeCylinder(1, 3, 16);

    // instance.vertices = [...c2[0]];
    // instance.polygonVertices = [...c2[1]];
    instance.vertices = [
      ...s1[0],
      ...s2[0],
      ...s3[0],
      ...c1[0],
      ...c2[0],
      ...c3[0],
    ];
    instance.polygonVertices = [
      ...s1[1],
      ...s2[1],
      ...s3[1],
      ...c1[1],
      ...c2[1],
      ...c3[1],
    ];
    data.applyScale.call(instance, scale);
    data.setColorForAllPolygons.call(instance, color);

    instance.textureURL = textureURL;

    return instance;
  };
  const initial_vertices = () => [
    [1.0, 0.0, 0.0], //0
    [-1.0, 0.0, 0.0], //1
    [0.0, 1.0, 0.0], // 2
    [0.0, -1.0, 0.0], // 3
    [0.0, 0.0, 1.0], // 4
    [0.0, 0.0, -1.0], // 5
  ];
  const intial_poly = () => [
    [0, 4, 2],
    [2, 4, 1],
    [1, 4, 3],
    [3, 4, 0],
    [0, 2, 5],
    [2, 1, 5],
    [1, 3, 5],
    [3, 0, 5],
  ];

  const makeCylinder = (radius, height, center, sides = 96) => {
    let p0 = Array.from(Array(sides), () => new Array(3));
    let p1 = Array.from(Array(sides), () => new Array(3));
    let da, c, s; // some temp variables

    let h2 = height * 0.5; // half height of cyliner
    da = Math.PI / sides - 1;
    for (let x = 0; x < sides; x++) {
      const u = x / sides;
      const theta = u * Math.PI * 2 + 0;

      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      p1[x][0] = radius * sinTheta;
      p1[x][2] = h2;
      p1[x][1] = radius * cosTheta;
      p0[x][0] = radius * sinTheta;
      p0[x][2] = -1 * h2;
      p0[x][1] = radius * cosTheta;
    }

    let verts = [...p0, ...p1];
    let polys = [];

    for (let j = 0; j < p0.length; j++) {
      polys.push([
        /* a */ j,
        /* b */ j + 1 >= sides ? 0 : j + 1,
        /* c */ j + sides + 1 >= verts.length ? sides : j + sides + 1,
        /* d */ j + sides,
      ]);
    }
    let cylinder = [verts, polys];

    //Adjust height
    for (let i = 0; i < cylinder[0].length; i++) {
      cylinder[0][i][2] = cylinder[0][i][2] + center;
    }

    //Adjust polys
    for (let i = 0; i < cylinder[1].length; i++) {
      cylinder[1][i][0] = cylinder[1][i][0] + polyCount;
      cylinder[1][i][1] = cylinder[1][i][1] + polyCount;
      cylinder[1][i][2] = cylinder[1][i][2] + polyCount;
      cylinder[1][i][3] = cylinder[1][i][3] + polyCount;
    }
    console.log(verts);
    console.log(polys);
    return [verts, polys];
  };

  const makeSphere = (radius, center) => {
    let baseSphere = [...devide_all(3, 0)];
    //Adjust radius
    for (let i = 0; i < baseSphere[0].length; i++) {
      baseSphere[0][i] = vecMul(baseSphere[0][i], radius);
    }

    //Adjust height
    for (let i = 0; i < baseSphere[0].length; i++) {
      baseSphere[0][i][2] = baseSphere[0][i][2] + center;
    }

    //Adjust polys
    for (let i = 0; i < baseSphere[1].length; i++) {
      baseSphere[1][i][0] = baseSphere[1][i][0] + polyCount;
      baseSphere[1][i][1] = baseSphere[1][i][1] + polyCount;
      baseSphere[1][i][2] = baseSphere[1][i][2] + polyCount;
    }
    return baseSphere;
  };

  function devide_all(
    recursionDepth,
    nbRecusions,
    vert = initial_vertices(),
    poly = intial_poly()
  ) {
    // nbRecusions is not set from initial call.
    if (nbRecusions == undefined) {
      nbRecusions = 0;
    }

    // Assemble divided polygons in an new array.
    var newPolygon = [];
    for (var v = 0; v < poly.length; v++) {
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
      var p0 = poly[v][0];
      var p1 = poly[v][1];
      var p2 = poly[v][2];

      //console.log("Points: " +p0+ "|" +p1+  "|" +p2);

      //get vectors
      var v0 = vert[p0];
      var v1 = vert[p1];
      var v2 = vert[p2];

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
      var indexA = vert.length;
      vert.push(a);
      var indexB = vert.length;
      vert.push(b);
      var indexC = vert.length;
      vert.push(c);

      // construct new Polygon (triangle)
      newPolygon.push([p0, indexB, indexA]);
      newPolygon.push([indexB, p1, indexC]);
      newPolygon.push([indexA, indexB, indexC]);
      newPolygon.push([indexA, indexC, p2]);
    }
    // Swap result.
    poly = newPolygon;
    // Recursion.

    if (nbRecusions == recursionDepth) {
      return [vert, poly];
    } else {
      return devide_all(recursionDepth, nbRecusions + 1, vert, poly);
    }
    // END exercise Sphere
  }
  //#region vecHelper
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
  //#endregion
});
