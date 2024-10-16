// src/components/Bullets.js
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

let bullets = [];

export const shoot = (position, direction) => {
  const bullet = {
    id: Date.now(),
    position: new THREE.Vector3(...position),
    direction: new THREE.Vector3(...direction).normalize(),
  };
  bullets.push(bullet);
};

export const Bullets = ({ players, onBulletHit }) => {
  useFrame(() => {
    bullets = bullets.filter(bullet => {
      bullet.position.add(bullet.direction.clone().multiplyScalar(0.5)); // Move bullet forward

      // Detect collisions with other players
      players.forEach(player => {
        if (bullet.position.distanceTo(new THREE.Vector3(...player.position)) < 1) {
          onBulletHit(bullet, player);
        }
      });

      // Remove bullet if it goes out of bounds
      return bullet.position.length() < 100;
    });
  });

  return (
    <>
      {bullets.map(bullet => (
        <mesh key={bullet.id} position={bullet.position}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          <meshStandardMaterial color={'yellow'} />
        </mesh>
      ))}
    </>
  );
};
