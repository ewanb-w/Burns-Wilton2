"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [

        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),

        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),

        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        
        vec3(0.0, 0.5, 0.0),
        vec3(0.0, 0.5, 0.0),
        vec3(0.0, 0.5, 0.0),

        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),

        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),

        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),

        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),

        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),

        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.5, 0.0),

        // vec3(1.0, 1.0, 0.0),
        // vec3(0.0, 1.0, 1.0),
        // vec3(1.0, 0.0, 1.0),
        // vec3(1.0, 1.0, 1.0),
    ];

    // And, add our vertices point into our array of points
    points = [
        vec2( -1, -1 ), //1st triangle
        vec2( -1,  0 ), 
        vec2(  0,  0 ),

        vec2(-.3,  0 ), //2nd triangle
        vec2( .3,  0 ), 
        vec2(  0, 1 ),

        vec2(  1, -1 ), //3rd triangle
        vec2(  1,  0 ), 
        vec2(  0,  0 ),
        
        vec2(  0, -.7 ), //4th triangle
        vec2( -1,  0  ), 
        vec2(  0,  0  ),

        vec2(  0, -.7 ), //5th triangle
        vec2(  1,  0  ), 
        vec2(  0,  0  ),

        vec2(-.15,  0 ), //6th triangle
        vec2( .15,  0 ), 
        vec2(   0, .6 ),

        vec2(-.5, -.7 ), //7th triangle
        vec2(-.5, -1  ), 
        vec2(-.3, -.6 ),

        vec2( .5, -.7 ), //8th triangle
        vec2( .5,  -1 ), 
        vec2( .3, -.6 ),

        vec2( -.1, -.7 ), //9th triangle
        vec2( -.3, -1  ), 
        vec2( -.1, -.9 ),


        vec2( .1, -.7 ), //10th triangle
        vec2( .3, -1  ), 
        vec2( .1, -.9 ),
    ];

        // vec2(  0,  0 ), //3rd triangle
        // vec2(  0,  1 ),
        // vec2(  1,  0 ),
        // vec2(  1,  1 ), 

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
