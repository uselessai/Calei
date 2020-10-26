/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Load in the required modules
const Materials = require('Materials');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
const Textures = require('Textures');
const Time = require('Time');
const Patches = require('Patches');
const NativeUI = require('NativeUI');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');



const promise1 = Materials.findFirst('material0');
const promise2 = Textures.findFirst('cameraTexture0');
const promise3 = Scene.root.findFirst('canvas0');


Promise.all([
	promise1,
    promise2,
    Patches.outputs.getScalar('zoom'),
    Patches.outputs.getScalar('repeticiones'),
    promise3,
    Patches.outputs.getPulse('pulso'),
    
	
]).then(assets => {


    // Vertex Shader / Pixel Shader ( Fragment Shader)
	const material = assets[0];  // material asignado al canvas
    const cameraTexture = assets[1]; // la textura de la cámara
    const zoom = assets[2]; // nivel del zoom
    const repeticiones = assets[3]; // número de repeticiones
    const canvas = assets[4];
    var pulse = assets[5];


    // vertex shader
    const uvs = Shaders.vertexAttribute({"variableName" : Shaders.VertexAttribute.TEX_COORDS}); // VERTEX SHADER
    // fragment shader
    const fuv = Shaders.fragmentStage(uvs);

    const color = kaleidoscopeShaderToyTextures2(cameraTexture.signal, fuv, 9, canvas, Reactive.add(1, 1), zoom, repeticiones, pulse);
    // output
    // Define the texture slot of the material to update
    const textureSlot = Shaders.DefaultMaterialTextures.DIFFUSE;


    // Assign the shader signal to the texture slot
    material.setTextureSlot(textureSlot, color); // fragmente shader -> output


});



function kaleidoscopeShaderToyTextures2(tex, uv, steps, canvas, multiplier, zoom, repeticionesPatch, pulse) // https://www.shadertoy.com/view/ttS3zh
{

    // VARIABLES PARA EL BLOQUE
     // zoom  valores de 0.9 a 2.5 
   //   repeticionesPatch; valores de 3.0 a 50 


    const proporcion =  Reactive.ge(repeticionesPatch, 5.0).ifThenElse(Reactive.div(canvas.width,canvas.height), 1.0);


    // empezamos con la coordenada Y
    // proporcion va con la repeticiones
    var  UVy = Reactive.mul(uv.y, Reactive.mul( repeticionesPatch,proporcion));
   
    UVy = Reactive.sin(UVy);

    // duplicacion eje X
    // repetimos lo mismo con la coordenada X
    let UVx = Reactive.mul(uv.x,repeticionesPatch);
    UVx = Reactive.sin(UVx);


   // magia activar para cambiar el efecto
    UVy = Reactive.cos(UVy);
    UVx = Reactive.cos(UVx);


   UVy = Reactive.div(UVy, zoom);
   UVx = Reactive.div(UVx, zoom);

    let blend_color =  Shaders.textureSampler(tex, Reactive.pack2(UVx,UVy) );
    return   blend_color;

}
