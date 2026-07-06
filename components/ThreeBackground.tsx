"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeRibbon(points: THREE.Vector3[], color: number, opacity: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 180, 0.018, 12, false);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.82,
    roughness: 0.28,
    transmission: 0,
    transparent: true,
    opacity,
    clearcoat: 0.85,
    clearcoatRoughness: 0.18
  });

  return new THREE.Mesh(geometry, material);
}

function makeThread(points: THREE.Vector3[], color: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(220));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.48
  });

  return new THREE.Line(geometry, material);
}

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(4, 5, 6);
    scene.add(key);

    const fill = new THREE.PointLight(0xdce3ec, 2.4, 12);
    fill.position.set(-4, -2, 5);
    scene.add(fill);

    const warmAccent = new THREE.PointLight(0xd2b36a, 1.2, 9);
    warmAccent.position.set(-2.8, 2.1, 4.2);
    scene.add(warmAccent);

    const ribbons = [
      makeRibbon(
        [
          new THREE.Vector3(-4.9, 1.7, -1.1),
          new THREE.Vector3(-3.0, 2.25, 0.5),
          new THREE.Vector3(-1.4, 1.35, -0.2),
          new THREE.Vector3(0.6, 1.92, 0.72),
          new THREE.Vector3(3.7, 1.25, -0.8),
          new THREE.Vector3(5.2, 1.75, 0.15)
        ],
        0xc8d0da,
        0.82
      ),
      makeRibbon(
        [
          new THREE.Vector3(-5.4, -1.35, 0.45),
          new THREE.Vector3(-3.8, -0.52, -0.6),
          new THREE.Vector3(-1.1, -1.12, 0.18),
          new THREE.Vector3(1.8, -0.45, -0.72),
          new THREE.Vector3(4.8, -1.15, 0.4)
        ],
        0xb4becb,
        0.78
      ),
      makeRibbon(
        [
          new THREE.Vector3(3.7, 2.9, -1.6),
          new THREE.Vector3(2.9, 1.35, 0.0),
          new THREE.Vector3(3.6, -0.2, 0.9),
          new THREE.Vector3(2.55, -2.15, -0.35),
          new THREE.Vector3(3.4, -3.0, -1.2)
        ],
        0xd8dee6,
        0.7
      ),
      makeRibbon(
        [
          new THREE.Vector3(-5.2, 0.18, -1.55),
          new THREE.Vector3(-3.1, 0.62, -0.72),
          new THREE.Vector3(-0.8, 0.2, -1.15),
          new THREE.Vector3(1.4, 0.58, -0.62),
          new THREE.Vector3(4.9, 0.08, -1.38)
        ],
        0xb69a58,
        0.34
      )
    ];

    ribbons.forEach((ribbon, index) => {
      ribbon.rotation.z = index === 1 ? -0.08 : 0.04;
      group.add(ribbon);
    });

    const threads = [
      makeThread(
        [
          new THREE.Vector3(-4.8, 2.75, -1.4),
          new THREE.Vector3(-2.0, 3.15, 0.5),
          new THREE.Vector3(0.4, 2.48, -0.3),
          new THREE.Vector3(4.8, 2.72, -1.0)
        ],
        0x909ba9
      ),
      makeThread(
        [
          new THREE.Vector3(-5.0, -2.55, -0.5),
          new THREE.Vector3(-2.6, -2.05, 0.7),
          new THREE.Vector3(0.8, -2.82, -0.1),
          new THREE.Vector3(4.8, -2.28, 0.65)
        ],
        0xa8b1bd
      ),
      makeThread(
        [
          new THREE.Vector3(-1.4, 3.2, -1.3),
          new THREE.Vector3(-0.4, 1.5, 0.2),
          new THREE.Vector3(-1.0, -0.7, -0.6),
          new THREE.Vector3(0.2, -3.0, 0.1)
        ],
        0xb9c2cd
      ),
      makeThread(
        [
          new THREE.Vector3(-4.7, 0.55, -0.95),
          new THREE.Vector3(-2.0, 0.95, -0.1),
          new THREE.Vector3(0.6, 0.5, -0.55),
          new THREE.Vector3(3.8, 0.9, -0.15)
        ],
        0xb69a58
      )
    ];

    threads.forEach((thread) => group.add(thread));

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resize);

    let frameId = 0;
    const animate = () => {
      const t = performance.now() * 0.001;
      group.rotation.x = Math.sin(t * 0.22) * 0.045;
      group.rotation.y = Math.sin(t * 0.18) * 0.075;
      group.position.y = Math.sin(t * 0.3) * 0.08;

      ribbons.forEach((ribbon, index) => {
        ribbon.rotation.y = Math.sin(t * 0.24 + index) * 0.08;
      });

      threads.forEach((thread, index) => {
        thread.rotation.z = Math.sin(t * 0.2 + index) * 0.035;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      ribbons.forEach((ribbon) => {
        ribbon.geometry.dispose();
        if (Array.isArray(ribbon.material)) {
          ribbon.material.forEach((material) => material.dispose());
        } else {
          ribbon.material.dispose();
        }
      });
      threads.forEach((thread) => {
        thread.geometry.dispose();
        if (Array.isArray(thread.material)) {
          thread.material.forEach((material) => material.dispose());
        } else {
          thread.material.dispose();
        }
      });
    };
  }, []);

  return <div className="three-background" ref={mountRef} aria-hidden="true" />;
}
