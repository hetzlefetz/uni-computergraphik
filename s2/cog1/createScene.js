/**
 * Populate the scene-graph with nodes,
 * calling methods form the scene-graph and node modules.
 *
 * Texture files have to exist in the "textures" sub-directory.
 *
 * @namespace cog1
 * @module createScene
 */
define(["exports", "scenegraph", "animation"], function (
  //
  exports,
  scenegraph,
  animation
) {
  "use strict";

  /**
   * 	Call methods form the scene-graph (tree) module to create the scene.
   *
   */
  function init() {
    const AU = 2000;
    const Year = 0.01;
    const Day = 1;

    var sun = scenegraph.createNodeWithModel("Sonne", "sphere", {
      recursionDepth: 1,
      scale: 120,
      color: 5,
    });

    sun.rotate([-100, -200, 0]);

    var mercury = scenegraph.createNodeWithModel(
      "Mercury",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 0 },
      sun
    );
    mercury.translate([0.39 * AU, 0, 0]);
    var venus = scenegraph.createNodeWithModel(
      "Venus",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 5 },
      sun
    );
    venus.translate([0.72 * AU, 0, 0]);

    var earth = scenegraph.createNodeWithModel(
      "Earth",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 2 },
      sun
    );
    earth.translate([1 * AU, 0, 0]);
    var moon = scenegraph.createNodeWithModel(
      "Moon",
      "sphere",
      { recursionDepth: 1, scale: 30, color: 7 },
      earth
    );
    moon.translate([300, 0, 0]);

    var mars = scenegraph.createNodeWithModel(
      "Mars",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 0 },
      sun
    );
    mars.translate([1.524 * AU, 0, 0]);
    var phobos = scenegraph.createNodeWithModel(
      "Phobos",
      "sphere",
      { recursionDepth: 1, scale: 5, color: 7 },
      mars
    );
    phobos.translate([300, 0, 0]);
    var deimos = scenegraph.createNodeWithModel(
      "Deimos",
      "sphere",
      { recursionDepth: 1, scale: 3, color: 7 },
      mars
    );
    deimos.translate([250, 0, 0]);
    var jupiter = scenegraph.createNodeWithModel(
      "Jupiter",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 8 },
      sun
    );
    jupiter.translate([5.203 * AU, 0, 0]);
    var saturn = scenegraph.createNodeWithModel(
      "Saturn",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 2 },
      sun
    );
    saturn.translate([9.539 * AU, 0, 0]);
    var uranus = scenegraph.createNodeWithModel(
      "Uranus",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 1 },
      sun
    );
    uranus.translate([19.18 * AU, 0, 0]);
    var neptune = scenegraph.createNodeWithModel(
      "Neptune",
      "sphere",
      { recursionDepth: 1, scale: 100, color: 4 },
      sun
    );
    neptune.translate([39.53 * AU, 0, 0]);
    animation.assign(sun, "rotate", { rotationSpeed: [0, 0.2 * Year, 0] });

    animation.assign(mercury, "rotate", { rotationSpeed: [0, 58.7 * Day, 0] });
    animation.assign(venus, "rotate", { rotationSpeed: [0, 243 * Day, 0] });
    animation.assign(earth, "rotate", { rotationSpeed: [0, Day, 0] });
    animation.assign(moon, "rotate", { rotationSpeed: [0, 24 * Day, 0] });
    animation.assign(mars, "rotate", { rotationSpeed: [0, 1.026 * Day, 0] });
    animation.assign(phobos, "rotate", { rotationSpeed: [0, 0.03, 0] });
    animation.assign(deimos, "rotate", { rotationSpeed: [0, 0.03, 0] });
    animation.assign(jupiter, "rotate", {
      rotationSpeed: [0, 11, 0.41 * Day, 0],
    });
    animation.assign(saturn, "rotate", { rotationSpeed: [0, 0.425 * Day, 0] });
    animation.assign(uranus, "rotate", {
      rotationSpeed: [0, 0.62 * Day, 0],
    });
    animation.assign(neptune, "rotate", {
      rotationSpeed: [0, 247.7 * Year, 0],
    });

    sun.setVisible(true);
    earth.setVisible(true);
    moon.setVisible(true);
    // BEGIN exercise myModel

    // END exercise myModel

    return;

    //var cubeNode = scenegraph.createNodeWithModel("cube", "cube", {scale:100, textureURL:"brickWall.jpg"});
    var cubeNode1 = scenegraph.createNodeWithModel("cube 1", "cube", {
      scale: 70,
      textureURL: "stoneWall.jpg",
    });
    cubeNode1.translate([50, 200, 0]);
    //cubeNode1.rotate([1,1,1]);
    var cubeNode2 = scenegraph.createNodeWithModel("cube 2", "cube", {
      scale: 50,
      textureURL: "uvTest.jpg",
    });
    cubeNode2.translate([-100, -400, 0]);
    //cubeNode2.rotate([-1,-1,-1]);
    var cubeNode3 = scenegraph.createNodeWithModel(
      "cube procedural texture",
      "cube",
      { scale: 50, textureURL: "sampleProceduralRGB" }
    );
    var cubeNode4 = scenegraph.createNodeWithModel(
      "cube six faces texture",
      "cube",
      { scale: 200, textureURL: "OrbitCube.gif", sixFacesTexture: true }
    );
    var cubeNode5 = scenegraph.createNodeWithModel("cube 3x3 texture", "cube", {
      scale: 50,
      textureURL: "cubeColor.png",
      sixFacesTexture: true,
    });
    var cubeNode6 = scenegraph.createNodeWithModel(
      "cube Escher texture",
      "cube",
      { scale: 200, textureURL: "EscherCubeFish.gif", sixFacesTexture: true }
    );

    var insideOutPolyNode = scenegraph.createNodeWithModel(
      "insideOutPoly",
      "insideOutPoly"
    );

    var diamondNode = scenegraph.createNodeWithModel("diamond", "diamond");

    var torusNode = scenegraph.createNodeWithModel("torus", "torus");
    var torusNode1 = scenegraph.createNodeWithModel("torus 13", "torus", {
      r2: 50,
      n2: 13,
      color: 8,
    });

    var teapotNode = scenegraph.createNodeWithModel("teapot", "teapot", {
      color: 0,
      scale: 40,
    });
    var dirtyTeapotNode = scenegraph.createNodeWithModel(
      "dirtyTeapot",
      "teapot_dirty",
      { color: 8 }
    );
    //teapotNode.rotate([1,1,1]);

    var waltheadNode = scenegraph.createNodeWithModel("walthead", "walthead", {
      color: 8,
    });

    var plainNode1 = scenegraph.createNodeWithModel("plain", "plain", {
      scale: 200,
      color: 9,
      textureURL: "land_ocean_ice_2048.jpg",
    });

    var emptyNode1 = scenegraph.createNodeWithModel("empty", "empty");

    // BEGIN exercise Scenegraph

    // Set parent-child relationships for scene-graph nodes.

    // END exercise Scenegraph

    // Assign animations.
    // animation.assign(cubeNode, "move");
    // animation.assign(cubeNode1, "move");
    // animation.assign(cubeNode2, "rotate");

    // BEGIN exercise Rotating-Planet-Animation

    // Mind the the order of transformation types get mixed up
    // then traversing the hierarchy in the scene-graph.
    //
    // Animation of a Planet with an also rotation moon or a ring.
    // The planet rotates around an small sun.

    // END exercise Rotating-Planet-Animation

    // Set visibility of nodes (hide: set to false).
    // Comment out what you want to see as the default is visible.
    // cubeNode.setVisible(false);
    cubeNode1.setVisible(false);
    cubeNode2.setVisible(false);
    cubeNode3.setVisible(false);
    cubeNode4.setVisible(false);
    cubeNode5.setVisible(false);
    cubeNode6.setVisible(false);
    insideOutPolyNode.setVisible(false);
    diamondNode.setVisible(false);
    torusNode.setVisible(false);
    torusNode1.setVisible(false);
    teapotNode.setVisible(false);
    dirtyTeapotNode.setVisible(false);
    waltheadNode.setVisible(false);
    plainNode1.setVisible(false);
    emptyNode1.setVisible(false);

    // Set the initially interactive node [by name].
    // If not set, it is the first node created.
    //scenegraph.setInteractiveNodeByName("sphere");
    //scenegraph.setInteractiveNode(torusNode);

    // Create a node for the light, which is not visible by default.
    var lightnode = scenegraph.createPointLightNode("light", "diamond");

    // Set light parameter.
    // ambientLI, pointLI, pointPos, specularLI, specularLIExpo
    scenegraph.setLights(0.5, 0.6, [200, 200, 300], 4.0, 10);
  }

  // Public API.
  exports.init = init;
});
