

'use client';

import 'aframe';
import { useEffect, useState } from 'react';

export default function AframeProject() {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null);

  useEffect(() => {
    const connectHandler = (event: GamepadEvent) => {
      console.log('Gamepad connected:', event.gamepad);
      setGamepadIndex(event.gamepad.index);
    };

    const disconnectHandler = () => {
      console.log('Gamepad disconnected');
      setGamepadIndex(null);
    };

    window.addEventListener('gamepadconnected', connectHandler);
    window.addEventListener('gamepaddisconnected', disconnectHandler);

    return () => {
      window.removeEventListener('gamepadconnected', connectHandler);
      window.removeEventListener('gamepaddisconnected', disconnectHandler);
    };
  }, []);

  useEffect(() => {
    if (gamepadIndex === null) return;

    const handleGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[gamepadIndex];

      if (!gp) return;

      const cameraRig = document.getElementById('cameraRig');
      if (!cameraRig) return;

      const moveSpeed = 0.1;
      const rotateSpeed = 0.1;

      // Movimiento con el joystick izquierdo (adelante/atrás y lados)
      const moveX = gp.axes[0] * moveSpeed;
      const moveZ = gp.axes[1] * moveSpeed;
      cameraRig.object3D.position.x += moveX;
      cameraRig.object3D.position.z += moveZ;

      // Rotación horizontal de la cámara
      cameraRig.object3D.rotation.y += gp.axes[0] * rotateSpeed;

      // Rotación con el joystick derecho
      const camera = document.getElementById('camera');
      if (camera) {
        camera.object3D.rotation.x -= gp.axes[3] * rotateSpeed;
        camera.object3D.rotation.y += gp.axes[2] * rotateSpeed;
      }

      // Simulación de disparo (vibración en la cámara)
      if (gp.buttons[0].pressed) {
        if (camera) {
          // Vibrar la cámara rápidamente
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              camera.object3D.position.x += (Math.random() - 0.5) * 0.05;
              camera.object3D.position.y += (Math.random() - 0.5) * 0.05;
              camera.object3D.position.z += (Math.random() - 0.5) * 0.05;
            }, i * 50);
          }
        }
      }

      // Salto (botón 1)
      if (gp.buttons[1].pressed) {
        cameraRig.object3D.position.y += moveSpeed * 2; // Salto hacia arriba
      }

      // Aplicar gravedad
      cameraRig.object3D.position.y = Math.max(cameraRig.object3D.position.y - 0.01, 1.6); // Ajustar según necesidad

      requestAnimationFrame(handleGamepad);
    };

    handleGamepad(); // Inicia la lectura del gamepad

  }, [gamepadIndex]);

  const createRandomObjects = () => {
    const objects = [];
    const numObjects = Math.floor(Math.random() * 30) + 30; // Entre 30 y 60 objetos

    for (let i = 0; i < numObjects; i++) {
      const x = Math.random() * 500 - 250;
      const y = 0.5;
      const z = Math.random() * 500 - 250;
      const size = Math.random() * 3 + 0.5; // Tamaño aleatorio entre 0.5 y 3.5
      const type = Math.random() < 0.5 ? 'box' : 'sphere';

      if (type === 'box') {
        objects.push(
          <a-box
            key={i}
            position={`${x} ${y} ${z}`}
            rotation={`0 ${Math.random() * 360} 0`}
            depth={size}
            height={size}
            width={size}
            color="#FFC107"
            shadow="cast: true"
          />
        );
      } else {
        objects.push(
          <a-sphere
            key={i}
            position={`${x} ${y} ${z}`}
            radius={size}
            color="#FF5722"
            shadow="cast: true"
          />
        );
      }
    }

    return objects;
  };

  const createRandomTrees = () => {
    const trees = [];
    const numTrees = Math.floor(Math.random() * 15) + 15; // Entre 15 y 30 árboles

    for (let i = 0; i < numTrees; i++) {
      const x = Math.random() * 500 - 250;
      const y = 0;
      const z = Math.random() * 500 - 250;
      const treeHeight = Math.random() * 6 + 4; // Altura aleatoria entre 4 y 10

      trees.push(
        <a-entity key={i} position={`${x} ${y} ${z}`}>
          <a-cone
            radius-bottom="1.5"
            height={treeHeight}
            color="#4CAF50"
            position="0 0.5 0"
            shadow="cast: true"
          ></a-cone>
          <a-cylinder
            radius="0.5"
            height={treeHeight / 2}
            color="#8D6E63"
            position="0 -0.5 0"
          ></a-cylinder>
        </a-entity>
      );
    }

    return trees;
  };

  return (
    <div>
      <div
        className="crosshair"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50px',
          height: '50px',
          border: '2px solid red',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      ></div>
      <a-scene shadow="type: pcfsoft">
        <a-entity light="type: ambient; intensity: 0.5;"></a-entity>
        <a-entity light="type: directional; castShadow: true; intensity: 0.8;" position="5 10 5"></a-entity>

        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="500"
          height="500"
          color="#8BC34A"
          shadow="receive: true"
        ></a-plane>

        {createRandomObjects()}
        {createRandomTrees()}

        <a-entity id="cameraRig" position="0 1.6 4">
          <a-camera id="camera" look-controls wasd-controls></a-camera>
          <a-box
            position="0 -0.8 -1.5"
            depth="0.2"
            height="0.5"
            width="0.2"
            color="#FF5722"
          ></a-box>
          <a-box
            position="0 -0.8 1.5"
            depth="0.2"
            height="0.5"
            width="0.2"
            color="#FF5722"
          ></a-box>
        </a-entity>
      </a-scene>
    </div>
  );
}
