"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';

const ValleDeBravoPage = () => {
  useEffect(() => {
    // Importar A-Frame solo en el lado del cliente
    require('aframe');
  }, []);

  return (
    <>
      <Head>
        <title>Valle de Bravo</title>
      </Head>
      <a-scene>
        {/* Importa la imagen 360 */}
        <a-sky src="/images/Valle.jpg"></a-sky>

        {/* Texto que aparecerá en la escena */}
        <a-text
          value="Valle de Bravo"
          position="0 2 -5"
          rotation="0 0 0"
          color="#FFFFFF"
          align="center"
          scale="4 4 4"
        ></a-text>
      </a-scene>
    </>
  );
};

export default ValleDeBravoPage;