"use client";

import React, { useRef, useEffect, useState } from "react";

const DistortionEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Obtener el contexto de WebGL
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL no es soportado en este navegador");
      return;
    }

    // Redimensionar el canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Definir los shaders básicos
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        gl_FragColor = texture2D(u_image, uv);
      }
    `;

    // Crear y compilar shaders
    const createShader = (type: GLenum, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Crear programa y enlazar shaders
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Posiciones de los atributos
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    const u_imageLocation = gl.getUniformLocation(program, "u_image");

    // Definir geometría y textura
    const vertices = new Float32Array([
      -1, -1, 0, 0,
      1, -1, 1, 0,
      -1, 1, 0, 1,
      1, 1, 1, 1,
    ]);

    // Crear buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Configurar el atributo de posición
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 4 * 4, 0);

    // Configurar el atributo de coordenada de textura
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 4 * 4, 2 * 4);

    // Cargar la imagen
    const img = new Image();
    img.src = "/images/pich.png";
    img.onload = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Asignar la imagen como textura
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );

      setImageLoaded(true);
    };

    // Dibujar la escena
    const draw = () => {
      if (!imageLoaded) return;

      // Limpiar la pantalla y dibujar la textura
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1i(u_imageLocation, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Ejecutar el renderizado
    const render = () => {
      draw();
      requestAnimationFrame(render);
    };

    render();

    // Manejar eventos del mouse
    window.addEventListener("mousemove", (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    });
  }, [imageLoaded]);

  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default DistortionEffect;