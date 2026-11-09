/**
 * BUCKINGHAM PALACE 3D - ARCHITECTURAL MASTERPIECE MODEL
 * Engineered with the 3D Web Experience Architecture:
 * - High-fidelity Portland stone with ashlar rustication, cornice entablatures & fluted pilasters
 * - Grand Aston Webb 1913 East Front with Corinthian portico, sculpted Royal Arms pediment & Central Balcony
 * - Brilliant Gilded Winged Victory (Golden Angel) on Carrara marble Victoria Memorial
 * - Animated Marching King's Guards (ceremonial sentry pacing with turn & halt)
 * - Dynamic Sky Dome with drifting 3D volumetric clouds and sun glow
 * - Fountain water spray physics and animated lake water ripples
 * - Night Gala architectural floodlights, glowing chandelier windows, and celebration fireworks
 * - InstancedMesh batching for 60 FPS performance
 */

window.PalaceModel = (function () {
  'use strict';

  // --- HIGH-RESOLUTION PROCEDURAL TEXTURE SUITE ---
  const Textures = {
    // 1. Portland Ashlar Stone with authentic masonry courses & subtle patina
    createStoneTexture: function (isRusticated = false) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Base Portland limestone hue (warm off-white / light cream)
      ctx.fillStyle = isRusticated ? '#e2d9cc' : '#ede7dc';
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine stone grain noise
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 16;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise - 2));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise - 6));
      }
      ctx.putImageData(imgData, 0, 0);

      // Classical stone block joints & rustication grooves
      const rowHeight = isRusticated ? 48 : 64;
      const blockWidth = isRusticated ? 128 : 192;

      for (let y = 0; y < 1024; y += rowHeight) {
        // Horizontal mortar shadow & highlight
        ctx.strokeStyle = 'rgba(110, 100, 90, 0.45)';
        ctx.lineWidth = isRusticated ? 4 : 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y + 2);
        ctx.lineTo(1024, y + 2);
        ctx.stroke();

        // Vertical alternating joints
        const offset = ((y / rowHeight) % 2) * (blockWidth / 2);
        for (let x = offset; x < 1024; x += blockWidth) {
          ctx.strokeStyle = 'rgba(110, 100, 90, 0.35)';
          ctx.lineWidth = isRusticated ? 3 : 1.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + rowHeight);
          ctx.stroke();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    },

    // 2. Multi-pane Georgian Sash Window with Chandelier Glow & Reflections
    createWindowTexture: function (lit = false) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Dark bronze-grey outer frame
      ctx.fillStyle = '#262422';
      ctx.fillRect(0, 0, 256, 512);

      // Glass area
      const margin = 12;
      const innerW = 256 - margin * 2;
      const innerH = 512 - margin * 2;

      if (lit) {
        // Night mode: warm golden chandelier luminescence & silk drapery
        const grad = ctx.createRadialGradient(128, 280, 20, 128, 280, 200);
        grad.addColorStop(0, '#fff4cc');
        grad.addColorStop(0.4, '#ffd369');
        grad.addColorStop(0.8, '#e09822');
        grad.addColorStop(1, '#663c08');
        ctx.fillStyle = grad;
        ctx.fillRect(margin, margin, innerW, innerH);

        // Chandelier silhouette inside
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(128, 220, 28, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Day mode: reflective sky glass with subtle interior depth
        const grad = ctx.createLinearGradient(0, 0, 256, 512);
        grad.addColorStop(0, '#5a7896');
        grad.addColorStop(0.45, '#7fa3c4');
        grad.addColorStop(0.55, '#3b5268');
        grad.addColorStop(1, '#1b2836');
        ctx.fillStyle = grad;
        ctx.fillRect(margin, margin, innerW, innerH);

        // Diagonal glass reflection highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.beginPath();
        ctx.moveTo(margin, margin + 40);
        ctx.lineTo(margin + 120, margin);
        ctx.lineTo(256 - margin, 512 - margin - 120);
        ctx.lineTo(256 - margin, 512 - margin);
        ctx.closePath();
        ctx.fill();
      }

      // Georgian glazing bars (mullions and transoms)
      ctx.strokeStyle = '#f5efe3';
      ctx.lineWidth = 6;

      // Vertical centre mullion
      ctx.beginPath();
      ctx.moveTo(128, margin);
      ctx.lineTo(128, 512 - margin);
      ctx.stroke();

      // Horizontal transoms (6 rows of panes)
      const rows = 6;
      for (let r = 1; r < rows; r++) {
        const y = margin + (innerH / rows) * r;
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(256 - margin, y);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    },

    // 3. Iconic Royal Red Gravel Forecourt Texture
    createForecourtTexture: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Iconic Royal red gravel hue
      ctx.fillStyle = '#a14234';
      ctx.fillRect(0, 0, 512, 512);

      const imgData = ctx.getImageData(0, 0, 512, 512);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 40;
        data[i] = Math.min(255, Math.max(0, data[i] + noise + 12));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.7));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.5));
      }
      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(16, 16);
      return texture;
    },

    // 4. The Royal Standard Flag Texture (The Sovereign's Personal Banner)
    createRoyalStandardTexture: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Q1 & Q4 (England): Scarlet red
      ctx.fillStyle = '#b71226';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillRect(512, 256, 512, 256);

      // Q2 (Scotland): Sovereign yellow
      ctx.fillStyle = '#f5b800';
      ctx.fillRect(512, 0, 512, 256);

      // Q3 (Ireland): Royal azure blue
      ctx.fillStyle = '#0f3f8c';
      ctx.fillRect(0, 256, 512, 256);

      // Gold Lions Passant (England - Q1 & Q4)
      [
        { ox: 60, oy: 40 },
        { ox: 572, oy: 296 },
      ].forEach((q) => {
        ctx.fillStyle = '#ffd700';
        for (let row = 0; row < 3; row++) {
          const ly = q.oy + row * 60;
          ctx.beginPath();
          ctx.ellipse(q.ox + 160, ly + 25, 110, 18, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(q.ox + 270, ly + 18, 15, 0, Math.PI * 2);
          ctx.fill();
          // Crown on lion
          ctx.fillRect(q.ox + 265, ly + 4, 12, 6);
        }
      });

      // Scottish Red Lion Rampant (Q2)
      ctx.fillStyle = '#b71226';
      ctx.beginPath();
      ctx.arc(768, 90, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(752, 100, 36, 90);
      ctx.beginPath();
      ctx.moveTo(752, 110);
      ctx.lineTo(700, 80);
      ctx.lineTo(710, 100);
      ctx.lineTo(752, 130);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(788, 120);
      ctx.lineTo(840, 90);
      ctx.lineTo(830, 110);
      ctx.lineTo(788, 140);
      ctx.fill();

      // Irish Golden Harp (Q3)
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(210, 290);
      ctx.bezierCurveTo(290, 290, 310, 360, 260, 470);
      ctx.lineTo(170, 470);
      ctx.bezierCurveTo(160, 390, 180, 330, 210, 290);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      for (let s = 0; s < 7; s++) {
        ctx.beginPath();
        ctx.moveTo(195 + s * 11, 320 + s * 15);
        ctx.lineTo(185 + s * 8, 460);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    },

    // 5. The Union Flag (Union Jack)
    createUnionJackTexture: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Navy Blue Field
      ctx.fillStyle = '#012169';
      ctx.fillRect(0, 0, 1024, 512);

      // White Saltire (St Andrew & St Patrick)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 100;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(1024, 512);
      ctx.moveTo(1024, 0);
      ctx.lineTo(0, 512);
      ctx.stroke();

      // Red Saltire (St Patrick)
      ctx.strokeStyle = '#c8102e';
      ctx.lineWidth = 36;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(1024, 512);
      ctx.moveTo(1024, 0);
      ctx.lineTo(0, 512);
      ctx.stroke();

      // White St George Cross backing
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(432, 0, 160, 512);
      ctx.fillRect(0, 176, 1024, 160);

      // Red St George Cross
      ctx.fillStyle = '#c8102e';
      ctx.fillRect(464, 0, 96, 512);
      ctx.fillRect(0, 208, 1024, 96);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    },

    // 6. Pediment Sculpted Royal Arms Relief
    createPedimentCoatOfArmsTexture: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Base limestone
      ctx.fillStyle = '#dcd4c5';
      ctx.fillRect(0, 0, 1024, 512);

      // Classical pediment tympanum shadow
      ctx.fillStyle = '#c8beaf';
      ctx.beginPath();
      ctx.arc(512, 280, 130, 0, Math.PI * 2);
      ctx.fill();

      // Royal Shield
      ctx.strokeStyle = '#8a6b28';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Golden Lion Supporter (Dexter)
      ctx.fillStyle = '#8a6b28';
      ctx.beginPath();
      ctx.arc(330, 240, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(320, 270, 42, 80);

      // Gilded Unicorn Supporter (Sinister)
      ctx.beginPath();
      ctx.arc(694, 240, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(664, 270, 42, 80);

      // Imperial State Crown atop shield
      ctx.beginPath();
      ctx.moveTo(452, 150);
      ctx.lineTo(572, 150);
      ctx.lineTo(592, 100);
      ctx.lineTo(540, 124);
      ctx.lineTo(512, 84);
      ctx.lineTo(484, 124);
      ctx.lineTo(432, 100);
      ctx.closePath();
      ctx.fill();

      // Motto Scroll: DIEU ET MON DROIT
      ctx.fillStyle = '#5a461b';
      ctx.fillRect(360, 400, 304, 32);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    },
  };

  // --- MATERIAL REPOSITORY WITH PBR SHADERS ---
  function initMaterials() {
    const stoneTex = Textures.createStoneTexture(false);
    stoneTex.repeat.set(4, 4);

    const rusticatedStoneTex = Textures.createStoneTexture(true);
    rusticatedStoneTex.repeat.set(6, 2);

    const forecourtTex = Textures.createForecourtTexture();
    const windowDayTex = Textures.createWindowTexture(false);
    const windowNightTex = Textures.createWindowTexture(true);

    return {
      stone: new THREE.MeshStandardMaterial({
        color: 0xede7dc,
        roughness: 0.68,
        metalness: 0.08,
        map: stoneTex,
      }),
      stoneRusticated: new THREE.MeshStandardMaterial({
        color: 0xe2d9cc,
        roughness: 0.8,
        metalness: 0.05,
        map: rusticatedStoneTex,
      }),
      stoneDark: new THREE.MeshStandardMaterial({
        color: 0xb5ab9d,
        roughness: 0.75,
        metalness: 0.1,
      }),
      stoneMarble: new THREE.MeshStandardMaterial({
        color: 0xf8f5ee,
        roughness: 0.28,
        metalness: 0.18,
      }),
      roofSlate: new THREE.MeshStandardMaterial({
        color: 0x3a4049,
        roughness: 0.52,
        metalness: 0.3,
      }),
      roofCopper: new THREE.MeshStandardMaterial({
        color: 0x487968,
        roughness: 0.42,
        metalness: 0.4,
      }),
      goldOrnament: new THREE.MeshStandardMaterial({
        color: 0xf5cf47,
        metalness: 0.92,
        roughness: 0.18,
        emissive: 0x4a3400,
        emissiveIntensity: 0.35,
      }),
      wroughtIron: new THREE.MeshStandardMaterial({
        color: 0x141619,
        metalness: 0.75,
        roughness: 0.35,
      }),
      windowDay: new THREE.MeshStandardMaterial({
        color: 0xdde8f2,
        roughness: 0.12,
        metalness: 0.5,
        map: windowDayTex,
      }),
      windowNight: new THREE.MeshStandardMaterial({
        color: 0xffe8a3,
        roughness: 0.15,
        metalness: 0.1,
        emissive: 0xffcb52,
        emissiveIntensity: 1.1,
        map: windowNightTex,
      }),
      royalVelvetCrimson: new THREE.MeshStandardMaterial({
        color: 0x8a0b1e,
        roughness: 0.65,
        metalness: 0.15,
      }),
      tarmacForecourt: new THREE.MeshStandardMaterial({
        color: 0xaa4536,
        roughness: 0.86,
        metalness: 0.04,
        map: forecourtTex,
      }),
      lawnGrass: new THREE.MeshStandardMaterial({
        color: 0x36682c,
        roughness: 0.92,
        metalness: 0.02,
      }),
      pavementStone: new THREE.MeshStandardMaterial({
        color: 0xa8a299,
        roughness: 0.78,
        metalness: 0.05,
      }),
      waterLake: new THREE.MeshStandardMaterial({
        color: 0x1a4a5e,
        roughness: 0.08,
        metalness: 0.82,
        transparent: true,
        opacity: 0.92,
      }),
      tunicRed: new THREE.MeshStandardMaterial({
        color: 0xd81424,
        roughness: 0.6,
        metalness: 0.12,
      }),
      bearskinFur: new THREE.MeshStandardMaterial({
        color: 0x0c0c0e,
        roughness: 0.98,
        metalness: 0.02,
      }),
    };
  }

  // --- MODEL BUILDER CLASS ---
  class BuckinghamPalaceBuilder {
    constructor() {
      this.materials = initMaterials();
      this.animatedObjects = [];
      this.interactiveHotspots = [];
      this.windowMeshes = [];
      this.flagMesh = null;
      this.flagMaterial = null;
      this.currentFlagType = 'royal';
      this.nightMode = false;
      this.royalStandardTex = Textures.createRoyalStandardTexture();
      this.unionJackTex = Textures.createUnionJackTexture();

      // Dynamic Animated Geometry references
      this.lakeGeometry = null;
      this.fountainGeometries = [];
      this.fountainParticles = null;
      this.nightFireworks = null;
      this.cloudsMesh = null;
    }

    buildEntireScene() {
      const rootGroup = new THREE.Group();
      rootGroup.name = 'BuckinghamPalaceScene';

      // 1. Sky Dome & Clouds
      const skyDome = this.buildAtmosphericSkyDome();
      rootGroup.add(skyDome);

      // 2. Terrain & Grounds
      const terrain = this.buildGrounds();
      rootGroup.add(terrain);

      // 3. The Main Palace Building
      const palace = this.buildPalaceStructure();
      rootGroup.add(palace);

      // 4. Forecourt, Gates, Sentry Boxes & Marching Guards
      const forecourt = this.buildForecourtAndGates();
      rootGroup.add(forecourt);

      // 5. Queen Victoria Memorial with Gilded Winged Victory
      const victoriaMemorial = this.buildVictoriaMemorial();
      rootGroup.add(victoriaMemorial);

      // 6. Surroundings, Trees & Vehicles
      const surrounds = this.buildGardensAndTheMall();
      rootGroup.add(surrounds);

      // 7. Night Gala Fireworks & Sparklers
      const nightEffects = this.buildNightFireworks();
      rootGroup.add(nightEffects);

      // 8. Hotspots Setup
      this.setupHotspots();

      return {
        root: rootGroup,
        animatedObjects: this.animatedObjects,
        hotspots: this.interactiveHotspots,
        builder: this,
      };
    }

    // --- 1. ATMOSPHERIC SKY DOME & PROCEDURAL CLOUDS ---
    buildAtmosphericSkyDome() {
      const skyGroup = new THREE.Group();
      skyGroup.name = 'AtmosphericSky';

      // Drifting 3D Fluffy Cumulus Clouds
      const cloudGroup = new THREE.Group();
      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.95,
        transparent: true,
        opacity: 0.85,
        flatShading: true,
      });

      const cloudPuffs = [
        { x: -90, y: 75, z: 40, s: 1.4 },
        { x: 30, y: 85, z: 90, s: 1.8 },
        { x: 110, y: 70, z: -30, s: 1.5 },
        { x: -50, y: 80, z: -110, s: 1.7 },
        { x: 80, y: 90, z: 130, s: 2.0 },
      ];

      cloudPuffs.forEach((cp, idx) => {
        const cluster = new THREE.Group();
        for (let p = 0; p < 5; p++) {
          const puffGeo = new THREE.DodecahedronGeometry(
            (6 + Math.random() * 5) * cp.s,
            1
          );
          const puff = new THREE.Mesh(puffGeo, cloudMat);
          puff.position.set(
            (Math.random() - 0.5) * 16 * cp.s,
            (Math.random() - 0.5) * 6 * cp.s,
            (Math.random() - 0.5) * 16 * cp.s
          );
          cluster.add(puff);
        }
        cluster.position.set(cp.x, cp.y, cp.z);
        cloudGroup.add(cluster);

        this.animatedObjects.push({
          type: 'cloud_drift',
          mesh: cluster,
          speed: 0.04 + idx * 0.015,
        });
      });

      skyGroup.add(cloudGroup);
      this.cloudsMesh = cloudGroup;

      return skyGroup;
    }

    // --- 2. GROUNDS & ANIMATED LAKE ---
    buildGrounds() {
      const groundsGroup = new THREE.Group();
      groundsGroup.name = 'Grounds';

      // Base royal park lawn
      const groundGeo = new THREE.PlaneGeometry(420, 360);
      const groundMesh = new THREE.Mesh(groundGeo, this.materials.lawnGrass);
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.position.set(0, -0.05, 0);
      groundMesh.receiveShadow = true;
      groundsGroup.add(groundMesh);

      // Royal Private Garden Lake (with dynamic water ripples)
      const lakeGeo = new THREE.CircleGeometry(38, 64);
      this.lakeGeometry = lakeGeo;
      const lakeMesh = new THREE.Mesh(lakeGeo, this.materials.waterLake);
      lakeMesh.rotation.x = -Math.PI / 2;
      lakeMesh.position.set(0, 0.04, -75);
      groundsGroup.add(lakeMesh);

      // Red Tarmac Forecourt
      const forecourtGeo = new THREE.CylinderGeometry(
        46,
        46,
        0.1,
        64,
        1,
        false,
        0,
        Math.PI
      );
      const forecourtMesh = new THREE.Mesh(
        forecourtGeo,
        this.materials.tarmacForecourt
      );
      forecourtMesh.position.set(0, 0, 16);
      forecourtMesh.receiveShadow = true;
      groundsGroup.add(forecourtMesh);

      const forecourtRectGeo = new THREE.BoxGeometry(92, 0.1, 16);
      const forecourtRect = new THREE.Mesh(
        forecourtRectGeo,
        this.materials.tarmacForecourt
      );
      forecourtRect.position.set(0, 0, 8);
      forecourtRect.receiveShadow = true;
      groundsGroup.add(forecourtRect);

      // The Mall (Ceremonial Red Way)
      const mallGeo = new THREE.BoxGeometry(28, 0.12, 110);
      const mallMesh = new THREE.Mesh(mallGeo, this.materials.tarmacForecourt);
      mallMesh.position.set(0, 0.01, 120);
      mallMesh.receiveShadow = true;
      groundsGroup.add(mallMesh);

      // Stone curbs
      const curbGeo = new THREE.RingGeometry(46, 50, 64, 1, 0, Math.PI);
      const curbMesh = new THREE.Mesh(curbGeo, this.materials.pavementStone);
      curbMesh.rotation.x = -Math.PI / 2;
      curbMesh.position.set(0, 0.06, 16);
      curbMesh.receiveShadow = true;
      groundsGroup.add(curbMesh);

      return groundsGroup;
    }

    // --- 3. PALACE ARCHITECTURE (SIR ASTON WEBB 1913 FAÇADE) ---
    buildPalaceStructure() {
      const palaceGroup = new THREE.Group();
      palaceGroup.name = 'PalaceArchitecture';
      const palaceZ = 0;

      // Ground Floor (Rusticated Portland Stone Base)
      const groundFloorGeo = new THREE.BoxGeometry(104, 6.5, 16);
      const groundFloor = new THREE.Mesh(
        groundFloorGeo,
        this.materials.stoneRusticated
      );
      groundFloor.position.set(0, 3.25, palaceZ);
      groundFloor.castShadow = true;
      groundFloor.receiveShadow = true;
      palaceGroup.add(groundFloor);

      // Rusticated arches along Ground Floor
      for (let x = -48; x <= 48; x += 4.8) {
        if (Math.abs(x) < 4) continue;
        const archWindow = this.createArchedWindowMesh();
        archWindow.position.set(x, 3.2, palaceZ + 8.08);
        palaceGroup.add(archWindow);
      }

      // Grand Centre Carriage Archway
      const centerArchGeo = new THREE.BoxGeometry(6.4, 5.2, 16.5);
      const centerArchMesh = new THREE.Mesh(
        centerArchGeo,
        this.materials.wroughtIron
      );
      centerArchMesh.position.set(0, 2.6, palaceZ);
      palaceGroup.add(centerArchMesh);

      // First Floor (Piano Nobile) & Second Floor (Attic)
      const upperFloorsGeo = new THREE.BoxGeometry(104, 12, 15.6);
      const upperFloors = new THREE.Mesh(
        upperFloorsGeo,
        this.materials.stone
      );
      upperFloors.position.set(0, 12.5, palaceZ);
      upperFloors.castShadow = true;
      upperFloors.receiveShadow = true;
      palaceGroup.add(upperFloors);

      // Entablature Belt Cornice
      const beltCorniceGeo = new THREE.BoxGeometry(106, 0.6, 16.6);
      const beltCornice = new THREE.Mesh(
        beltCorniceGeo,
        this.materials.stone
      );
      beltCornice.position.set(0, 6.6, palaceZ);
      beltCornice.castShadow = true;
      palaceGroup.add(beltCornice);

      // Windows and Classical Fluted Pilasters
      for (let x = -48; x <= 48; x += 4.8) {
        if (Math.abs(x) < 7) continue;

        const win1st = this.createPedimentedWindowMesh(
          Math.round(x) % 2 === 0
        );
        win1st.position.set(x, 10.5, palaceZ + 7.85);
        palaceGroup.add(win1st);

        const win2nd = this.createSquareWindowMesh();
        win2nd.position.set(x, 15.8, palaceZ + 7.85);
        palaceGroup.add(win2nd);

        // Corinthian pilaster shaft
        const pilasterGeo = new THREE.BoxGeometry(0.8, 11.5, 0.4);
        const pilaster = new THREE.Mesh(pilasterGeo, this.materials.stone);
        pilaster.position.set(x + 2.4, 12.5, palaceZ + 7.9);
        pilaster.castShadow = true;
        palaceGroup.add(pilaster);
      }

      // North & South End Pavilions
      [-50, 50].forEach((posX) => {
        const pavilionFrontGeo = new THREE.BoxGeometry(11, 19, 2);
        const pavilion = new THREE.Mesh(pavilionFrontGeo, this.materials.stone);
        pavilion.position.set(posX, 9.5, palaceZ + 8.8);
        pavilion.castShadow = true;
        palaceGroup.add(pavilion);

        const pavPedimentGeo = new THREE.ConeGeometry(7.5, 3.2, 4);
        const pavPediment = new THREE.Mesh(
          pavPedimentGeo,
          this.materials.stone
        );
        pavPediment.rotation.y = Math.PI / 4;
        pavPediment.position.set(posX, 20.2, palaceZ + 8.8);
        pavPediment.castShadow = true;
        palaceGroup.add(pavPediment);
      });

      // Central Portico & The World-Famous Royal Balcony
      const centralSection = this.buildCentralPortico(palaceZ);
      palaceGroup.add(centralSection);

      // Roofline Balustrade with Instanced Urns
      const roofBalustrade = this.buildRoofBalustrade(palaceZ);
      palaceGroup.add(roofBalustrade);

      // Quadrangle & West Garden Front
      const quadrangle = this.buildQuadrangleWings(palaceZ);
      palaceGroup.add(quadrangle);

      return palaceGroup;
    }

    // --- 3D. CENTRAL PORTICO & THE ROYAL BALCONY ---
    buildCentralPortico(palaceZ) {
      const porticoGroup = new THREE.Group();
      porticoGroup.name = 'RoyalPorticoAndBalcony';

      const porticoBaseGeo = new THREE.BoxGeometry(19, 6.6, 2.8);
      const porticoBase = new THREE.Mesh(
        porticoBaseGeo,
        this.materials.stoneRusticated
      );
      porticoBase.position.set(0, 3.3, palaceZ + 9.2);
      porticoBase.castShadow = true;
      porticoGroup.add(porticoBase);

      const entranceDoorGeo = new THREE.BoxGeometry(4.8, 5.2, 0.4);
      const entranceDoor = new THREE.Mesh(
        entranceDoorGeo,
        this.materials.wroughtIron
      );
      entranceDoor.position.set(0, 2.7, palaceZ + 10.65);
      porticoGroup.add(entranceDoor);

      // Gilded Royal Cypher
      const cypherGeo = new THREE.TorusGeometry(0.8, 0.14, 12, 24);
      const cypher = new THREE.Mesh(cypherGeo, this.materials.goldOrnament);
      cypher.position.set(0, 5.3, palaceZ + 10.7);
      porticoGroup.add(cypher);

      // THE FAMOUS ROYAL BALCONY
      const balconyFloorGeo = new THREE.BoxGeometry(7.2, 0.5, 2.4);
      const balconyFloor = new THREE.Mesh(
        balconyFloorGeo,
        this.materials.stoneMarble
      );
      balconyFloor.position.set(0, 6.75, palaceZ + 10.2);
      balconyFloor.castShadow = true;
      porticoGroup.add(balconyFloor);

      // Crimson Velvet Hanging Drapery with Gold Trim
      const crimsonBannerGeo = new THREE.BoxGeometry(6.8, 1.4, 0.1);
      const crimsonBanner = new THREE.Mesh(
        crimsonBannerGeo,
        this.materials.royalVelvetCrimson
      );
      crimsonBanner.position.set(0, 6.0, palaceZ + 11.45);
      porticoGroup.add(crimsonBanner);

      const goldFringeGeo = new THREE.BoxGeometry(6.9, 0.15, 0.14);
      const goldFringe = new THREE.Mesh(
        goldFringeGeo,
        this.materials.goldOrnament
      );
      goldFringe.position.set(0, 5.25, palaceZ + 11.45);
      porticoGroup.add(goldFringe);

      // Balustrade Rail
      const balustradeRailGeo = new THREE.BoxGeometry(7.2, 0.25, 2.4);
      const balustradeRail = new THREE.Mesh(
        balustradeRailGeo,
        this.materials.stoneMarble
      );
      balustradeRail.position.set(0, 7.8, palaceZ + 10.2);
      porticoGroup.add(balustradeRail);

      for (let bx = -3.2; bx <= 3.2; bx += 0.8) {
        const balusterGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.9, 8);
        const baluster = new THREE.Mesh(
          balusterGeo,
          this.materials.stoneMarble
        );
        baluster.position.set(bx, 7.3, palaceZ + 11.35);
        porticoGroup.add(baluster);
      }

      // French Doors leading onto Balcony
      const balconyDoorGeo = new THREE.PlaneGeometry(3.6, 4.4);
      const balconyDoor = new THREE.Mesh(
        balconyDoorGeo,
        this.materials.windowDay
      );
      balconyDoor.position.set(0, 9.2, palaceZ + 7.86);
      this.windowMeshes.push(balconyDoor);
      porticoGroup.add(balconyDoor);

      // Giant Corinthian Columns (6 Columns across front of central portico)
      const columnPositions = [-8, -4.8, -1.6, 1.6, 4.8, 8];
      columnPositions.forEach((cx) => {
        const plinthGeo = new THREE.BoxGeometry(1.2, 0.6, 1.2);
        const plinth = new THREE.Mesh(plinthGeo, this.materials.stone);
        plinth.position.set(cx, 6.9, palaceZ + 10.2);
        porticoGroup.add(plinth);

        const colGeo = new THREE.CylinderGeometry(0.44, 0.52, 11, 16);
        const column = new THREE.Mesh(colGeo, this.materials.stone);
        column.position.set(cx, 12.7, palaceZ + 10.2);
        column.castShadow = true;
        porticoGroup.add(column);

        const capGeo = new THREE.BoxGeometry(1.2, 0.7, 1.2);
        const cap = new THREE.Mesh(capGeo, this.materials.stoneMarble);
        cap.position.set(cx, 18.3, palaceZ + 10.2);
        porticoGroup.add(cap);
      });

      // Classical Entablature
      const entablatureGeo = new THREE.BoxGeometry(19.6, 1.4, 3.2);
      const entablature = new THREE.Mesh(
        entablatureGeo,
        this.materials.stone
      );
      entablature.position.set(0, 19.3, palaceZ + 10.0);
      entablature.castShadow = true;
      porticoGroup.add(entablature);

      // GRAND TRIANGULAR PEDIMENT
      const pedimentShape = new THREE.Shape();
      pedimentShape.moveTo(-9.8, 0);
      pedimentShape.lineTo(9.8, 0);
      pedimentShape.lineTo(0, 4.8);
      pedimentShape.closePath();

      const extrudeSettings = {
        depth: 2.2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.2,
        bevelThickness: 0.2,
      };

      const pedimentGeo = new THREE.ExtrudeGeometry(
        pedimentShape,
        extrudeSettings
      );
      const pediment = new THREE.Mesh(pedimentGeo, this.materials.stone);
      pediment.position.set(0, 20.0, palaceZ + 8.8);
      pediment.castShadow = true;
      porticoGroup.add(pediment);

      // Royal Coat of Arms relief on pediment
      const armsPlaneGeo = new THREE.PlaneGeometry(8, 3.6);
      const armsMat = new THREE.MeshStandardMaterial({
        map: Textures.createPedimentCoatOfArmsTexture(),
        roughness: 0.55,
        metalness: 0.3,
      });
      const armsPlane = new THREE.Mesh(armsPlaneGeo, armsMat);
      armsPlane.position.set(0, 21.4, palaceZ + 11.05);
      porticoGroup.add(armsPlane);

      // Rooftop Attic & Flagpole
      const atticCenterGeo = new THREE.BoxGeometry(12, 3.4, 7);
      const atticCenter = new THREE.Mesh(
        atticCenterGeo,
        this.materials.stone
      );
      atticCenter.position.set(0, 21.2, palaceZ + 4.5);
      porticoGroup.add(atticCenter);

      const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 14, 12);
      const pole = new THREE.Mesh(poleGeo, this.materials.wroughtIron);
      pole.position.set(0, 29, palaceZ + 4.5);
      porticoGroup.add(pole);

      const poleTopGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const poleTop = new THREE.Mesh(poleTopGeo, this.materials.goldOrnament);
      poleTop.position.set(0, 36.1, palaceZ + 4.5);
      porticoGroup.add(poleTop);

      // Waving Flag with vertex sine dynamics
      const flagGeo = new THREE.PlaneGeometry(5.4, 3.2, 16, 10);
      this.flagMaterial = new THREE.MeshStandardMaterial({
        map: this.royalStandardTex,
        roughness: 0.45,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });
      const flagMesh = new THREE.Mesh(flagGeo, this.flagMaterial);
      flagMesh.position.set(2.8, 34.2, palaceZ + 4.5);
      porticoGroup.add(flagMesh);

      this.flagMesh = flagMesh;
      this.animatedObjects.push({
        type: 'flag',
        mesh: flagMesh,
        geo: flagGeo,
      });

      return porticoGroup;
    }

    // --- 3E. ROOFLINE BALUSTRADE & STATUES ---
    buildRoofBalustrade(palaceZ) {
      const balustradeGroup = new THREE.Group();
      balustradeGroup.name = 'RoofBalustradesAndUrns';

      const parapetGeo = new THREE.BoxGeometry(105, 1.2, 0.8);
      const parapet = new THREE.Mesh(parapetGeo, this.materials.stone);
      parapet.position.set(0, 19.1, palaceZ + 7.8);
      parapet.castShadow = true;
      balustradeGroup.add(parapet);

      // Instanced Urns on roofline
      const urnPositions = [];
      for (let x = -50; x <= 50; x += 4.8) {
        if (Math.abs(x) < 10) continue;
        urnPositions.push(new THREE.Vector3(x, 20.35, palaceZ + 7.8));
      }

      const urnBodyGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const instancedUrns = new THREE.InstancedMesh(
        urnBodyGeo,
        this.materials.stoneMarble,
        urnPositions.length
      );
      instancedUrns.castShadow = true;

      const dummy = new THREE.Object3D();
      urnPositions.forEach((pos, idx) => {
        dummy.position.copy(pos);
        dummy.scale.set(1, 1.3, 1);
        dummy.updateMatrix();
        instancedUrns.setMatrixAt(idx, dummy.matrix);
      });
      instancedUrns.instanceMatrix.needsUpdate = true;
      balustradeGroup.add(instancedUrns);

      // Mansard Roof
      const mansardGeo = new THREE.BoxGeometry(102, 3.5, 14);
      const mansard = new THREE.Mesh(mansardGeo, this.materials.roofSlate);
      mansard.position.set(0, 20.2, palaceZ);
      balustradeGroup.add(mansard);

      // Chimney stacks
      [-42, -24, 24, 42].forEach((cx) => {
        const chimneyGeo = new THREE.BoxGeometry(1.8, 3.8, 1.8);
        const chimney = new THREE.Mesh(chimneyGeo, this.materials.stone);
        chimney.position.set(cx, 22.5, palaceZ);
        chimney.castShadow = true;
        balustradeGroup.add(chimney);

        for (let p = -0.4; p <= 0.4; p += 0.8) {
          const potGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.8, 8);
          const pot = new THREE.Mesh(potGeo, this.materials.stoneDark);
          pot.position.set(cx + p, 24.6, palaceZ);
          balustradeGroup.add(pot);
        }
      });

      return balustradeGroup;
    }

    // --- 3F. QUADRANGLE WINGS & WEST GARDEN FRONT ---
    buildQuadrangleWings(palaceZ) {
      const wingsGroup = new THREE.Group();
      wingsGroup.name = 'QuadrangleAndGardenFront';

      const wingGeo = new THREE.BoxGeometry(14, 18, 54);
      const northWing = new THREE.Mesh(wingGeo, this.materials.stone);
      northWing.position.set(-45, 9, palaceZ - 32);
      northWing.castShadow = true;
      wingsGroup.add(northWing);

      const southWing = new THREE.Mesh(wingGeo, this.materials.stone);
      southWing.position.set(45, 9, palaceZ - 32);
      southWing.castShadow = true;
      wingsGroup.add(southWing);

      // West Front (Garden Facade)
      const westFrontGeo = new THREE.BoxGeometry(104, 18, 14);
      const westFront = new THREE.Mesh(westFrontGeo, this.materials.stone);
      westFront.position.set(0, 9, palaceZ - 56);
      westFront.castShadow = true;
      wingsGroup.add(westFront);

      // Nash's Bow Room Rotunda & Verdigris Dome
      const bowRoomGeo = new THREE.CylinderGeometry(7, 7, 18, 32);
      const bowRoom = new THREE.Mesh(bowRoomGeo, this.materials.stone);
      bowRoom.position.set(0, 9, palaceZ - 63);
      bowRoom.castShadow = true;
      wingsGroup.add(bowRoom);

      const domeGeo = new THREE.SphereGeometry(
        7.2,
        32,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const dome = new THREE.Mesh(domeGeo, this.materials.roofCopper);
      dome.position.set(0, 18, palaceZ - 63);
      dome.castShadow = true;
      wingsGroup.add(dome);

      // Courtyard Ground
      const quadCourtyardGeo = new THREE.PlaneGeometry(76, 50);
      const quadCourtyard = new THREE.Mesh(
        quadCourtyardGeo,
        this.materials.pavementStone
      );
      quadCourtyard.rotation.x = -Math.PI / 2;
      quadCourtyard.position.set(0, 0.05, palaceZ - 30);
      quadCourtyard.receiveShadow = true;
      wingsGroup.add(quadCourtyard);

      return wingsGroup;
    }

    // --- 4. FORECOURT, GATES & MARCHING SENTRIES ---
    buildForecourtAndGates() {
      const fcGroup = new THREE.Group();
      fcGroup.name = 'ForecourtAndGates';

      const radius = 46;
      const centerZ = 16;

      // Semicircular Wrought Iron Railings
      const segments = 44;
      const spearPositions = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (Math.PI / segments) * i;
        const x = Math.cos(angle) * radius;
        const z = centerZ + Math.sin(angle) * radius;

        const isCenterGate = Math.abs(x) < 7.5;
        const isNorthGate = Math.abs(x - 30) < 4.5;
        const isSouthGate = Math.abs(x + 30) < 4.5;
        if (isCenterGate || isNorthGate || isSouthGate) continue;

        spearPositions.push(new THREE.Vector3(x, 2.1, z));
      }

      const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.2, 6);
      const instancedPosts = new THREE.InstancedMesh(
        postGeo,
        this.materials.wroughtIron,
        spearPositions.length
      );
      const spearTipGeo = new THREE.ConeGeometry(0.14, 0.5, 6);
      const instancedTips = new THREE.InstancedMesh(
        spearTipGeo,
        this.materials.goldOrnament,
        spearPositions.length
      );

      const dummy = new THREE.Object3D();
      spearPositions.forEach((pos, idx) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        instancedPosts.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pos.x, 4.4, pos.z);
        dummy.updateMatrix();
        instancedTips.setMatrixAt(idx, dummy.matrix);
      });

      instancedPosts.instanceMatrix.needsUpdate = true;
      instancedTips.instanceMatrix.needsUpdate = true;
      fcGroup.add(instancedPosts);
      fcGroup.add(instancedTips);

      // Stone Gate Piers & Centre Gates
      [-7.5, 7.5].forEach((gx) => {
        const pier = this.createGatePierMesh();
        pier.position.set(gx, 0, centerZ + radius);
        fcGroup.add(pier);
      });

      const gatePanelGeo = new THREE.BoxGeometry(7.0, 4.8, 0.25);
      const centerGate = new THREE.Mesh(
        gatePanelGeo,
        this.materials.wroughtIron
      );
      centerGate.position.set(0, 2.4, centerZ + radius);
      fcGroup.add(centerGate);

      const gateCrestGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.15, 24);
      const gateCrest = new THREE.Mesh(
        gateCrestGeo,
        this.materials.goldOrnament
      );
      gateCrest.rotation.x = Math.PI / 2;
      gateCrest.position.set(0, 2.8, centerZ + radius + 0.15);
      fcGroup.add(gateCrest);

      // Sentry Boxes & ANIMATED MARCHING GUARDS
      const sentryPositions = [
        { x: -16, z: 12, rot: 0, marchDir: 1 },
        { x: -8, z: 12, rot: 0, marchDir: -1 },
        { x: 8, z: 12, rot: 0, marchDir: 1 },
        { x: 16, z: 12, rot: 0, marchDir: -1 },
      ];

      sentryPositions.forEach((pos, idx) => {
        const sentryBox = this.createSentryBoxMesh();
        sentryBox.position.set(pos.x, 0, pos.z);
        sentryBox.rotation.y = pos.rot;
        fcGroup.add(sentryBox);

        // Marching Foot Guard Sentry
        const guard = this.createKingsGuardMesh(idx);
        guard.position.set(pos.x, 0, pos.z + 2.0);
        guard.rotation.y = Math.PI;
        fcGroup.add(guard);

        // Sentry Pacing Animation Controller
        this.animatedObjects.push({
          type: 'guard_marching',
          mesh: guard,
          baseX: pos.x,
          baseZ: pos.z + 2.0,
          range: 3.5,
          speed: 0.85,
          cycle: idx * 2.2,
        });
      });

      return fcGroup;
    }

    // --- 5. QUEEN VICTORIA MEMORIAL & GILDED WINGED VICTORY ---
    buildVictoriaMemorial() {
      const memorialGroup = new THREE.Group();
      memorialGroup.name = 'QueenVictoriaMemorial';

      const memX = 0;
      const memY = 0;
      const memZ = 82;

      // Tiered Carrara Marble Plinths
      const tier1Geo = new THREE.CylinderGeometry(18, 19, 1.2, 48);
      const tier1 = new THREE.Mesh(tier1Geo, this.materials.stoneMarble);
      tier1.position.set(memX, memY + 0.6, memZ);
      tier1.receiveShadow = true;
      memorialGroup.add(tier1);

      const tier2Geo = new THREE.CylinderGeometry(14, 15, 1.4, 48);
      const tier2 = new THREE.Mesh(tier2Geo, this.materials.stoneMarble);
      tier2.position.set(memX, memY + 1.9, memZ);
      tier2.receiveShadow = true;
      memorialGroup.add(tier2);

      // Fountain Basins & Water Discs
      [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((ang) => {
        const basinX = memX + Math.cos(ang) * 14.5;
        const basinZ = memZ + Math.sin(ang) * 14.5;

        const basinGeo = new THREE.CylinderGeometry(2.4, 2.0, 1.2, 16);
        const basin = new THREE.Mesh(basinGeo, this.materials.stoneMarble);
        basin.position.set(basinX, memY + 1.4, basinZ);
        memorialGroup.add(basin);

        const waterGeo = new THREE.CircleGeometry(2.2, 24);
        this.fountainGeometries.push(waterGeo);
        const water = new THREE.Mesh(waterGeo, this.materials.waterLake);
        water.rotation.x = -Math.PI / 2;
        water.position.set(basinX, memY + 2.02, basinZ);
        memorialGroup.add(water);
      });

      // Fountain Water Spray Particles
      const particleCount = 200;
      const particleGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(particleCount * 3);
      const pVelocities = [];

      for (let i = 0; i < particleCount; i++) {
        const basinIdx = i % 4;
        const ang = (Math.PI / 2) * basinIdx;
        const bx = memX + Math.cos(ang) * 14.5;
        const bz = memZ + Math.sin(ang) * 14.5;

        pPositions[i * 3] = bx + (Math.random() - 0.5) * 1.2;
        pPositions[i * 3 + 1] = memY + 2.1 + Math.random() * 2.5;
        pPositions[i * 3 + 2] = bz + (Math.random() - 0.5) * 1.2;

        pVelocities.push({
          x: (Math.random() - 0.5) * 0.4,
          y: 1.5 + Math.random() * 1.2,
          z: (Math.random() - 0.5) * 0.4,
          baseX: bx,
          baseZ: bz,
        });
      }

      particleGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(pPositions, 3)
      );
      const particleMat = new THREE.PointsMaterial({
        color: 0xcde8ff,
        size: 0.32,
        transparent: true,
        opacity: 0.8,
      });

      const fountainParticles = new THREE.Points(particleGeo, particleMat);
      memorialGroup.add(fountainParticles);

      this.fountainParticles = {
        mesh: fountainParticles,
        geo: particleGeo,
        velocities: pVelocities,
        count: particleCount,
      };

      // Marble Pylon & Seated Queen Victoria
      const pylonGeo = new THREE.BoxGeometry(6.4, 12, 6.4);
      const pylon = new THREE.Mesh(pylonGeo, this.materials.stoneMarble);
      pylon.position.set(memX, memY + 8.6, memZ);
      pylon.castShadow = true;
      memorialGroup.add(pylon);

      const victoriaStatueGeo = new THREE.BoxGeometry(2.8, 4.2, 2.2);
      const victoriaStatue = new THREE.Mesh(
        victoriaStatueGeo,
        this.materials.stoneMarble
      );
      victoriaStatue.position.set(memX, memY + 5.2, memZ + 3.8);
      memorialGroup.add(victoriaStatue);

      // BRILLIANT GILDED BRONZE WINGED VICTORY (The Golden Angel)
      const orbGeo = new THREE.SphereGeometry(1.2, 24, 24);
      const orb = new THREE.Mesh(orbGeo, this.materials.goldOrnament);
      orb.position.set(memX, memY + 15.4, memZ);
      orb.castShadow = true;
      memorialGroup.add(orb);

      const angelBodyGeo = new THREE.CylinderGeometry(0.35, 0.45, 3.6, 12);
      const angelBody = new THREE.Mesh(
        angelBodyGeo,
        this.materials.goldOrnament
      );
      angelBody.position.set(memX, memY + 17.6, memZ);
      angelBody.castShadow = true;
      memorialGroup.add(angelBody);

      // Outstretched Golden Wings
      [-1, 1].forEach((dir) => {
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.lineTo(dir * 3.2, 2.4);
        wingShape.lineTo(dir * 4.2, 4.8);
        wingShape.lineTo(dir * 2.2, 3.6);
        wingShape.lineTo(0, 1.4);
        wingShape.closePath();

        const wingGeo = new THREE.ShapeGeometry(wingShape);
        const wing = new THREE.Mesh(wingGeo, this.materials.goldOrnament);
        wing.position.set(memX, memY + 17.6, memZ);
        wing.rotation.y = dir * 0.25;
        memorialGroup.add(wing);
      });

      // Palm Branch in hand
      const branchGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 6);
      const branch = new THREE.Mesh(branchGeo, this.materials.goldOrnament);
      branch.position.set(memX + 0.8, memY + 19.2, memZ + 0.6);
      branch.rotation.z = -0.4;
      memorialGroup.add(branch);

      return memorialGroup;
    }

    // --- 6. SURROUNDINGS, TREES & TRAFFIC ---
    buildGardensAndTheMall() {
      const envGroup = new THREE.Group();
      envGroup.name = 'SurroundingEnvironment';

      // Trees along The Mall
      for (let z = 95; z <= 155; z += 15) {
        [-16, 16].forEach((tx) => {
          const tree = this.createLondonPlaneTree();
          tree.position.set(tx, 0, z);
          envGroup.add(tree);

          const lamp = this.createVictorianStreetLamp(tx > 0);
          lamp.position.set(tx > 0 ? tx - 2.8 : tx + 2.8, 0, z);
          envGroup.add(lamp);
        });
      }

      // Specimen Trees in West Gardens
      const gardenTreeCoords = [
        { x: -35, z: -40, s: 1.2 },
        { x: -55, z: -55, s: 1.4 },
        { x: -28, z: -75, s: 1.1 },
        { x: 35, z: -40, s: 1.2 },
        { x: 55, z: -60, s: 1.3 },
        { x: 25, z: -78, s: 1.5 },
      ];

      gardenTreeCoords.forEach((tc) => {
        const gardenTree = this.createLondonPlaneTree(tc.s);
        gardenTree.position.set(tc.x, 0, tc.z);
        envGroup.add(gardenTree);
      });

      // London Red Double-Decker Bus & Black Cab
      const bus = this.createLondonBusMesh();
      bus.position.set(22, 0, 82);
      bus.rotation.y = Math.PI;
      envGroup.add(bus);

      const cab = this.createBlackCabMesh();
      cab.position.set(-20, 0, 76);
      cab.rotation.y = 0;
      envGroup.add(cab);

      this.animatedObjects.push({
        type: 'vehicle_bus',
        mesh: bus,
        radius: 22,
        speed: 0.18,
        angle: 0,
      });

      this.animatedObjects.push({
        type: 'vehicle_cab',
        mesh: cab,
        radius: 20,
        speed: 0.28,
        angle: Math.PI,
      });

      return envGroup;
    }

    // --- 7. CELEBRATION ROYAL FIREWORKS (NIGHT MODE) ---
    buildNightFireworks() {
      const emberCount = 350;
      const emberGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(emberCount * 3);
      const speeds = [];

      for (let i = 0; i < emberCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 110;
        positions[i * 3 + 1] = 4 + Math.random() * 45;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        speeds.push({
          y: 0.08 + Math.random() * 0.14,
          drift: (Math.random() - 0.5) * 0.05,
        });
      }

      emberGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );

      const emberMat = new THREE.PointsMaterial({
        color: 0xffd375,
        size: 0.55,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });

      const embersMesh = new THREE.Points(emberGeo, emberMat);
      embersMesh.name = 'RoyalNightEmbers';

      this.nightFireworks = {
        mesh: embersMesh,
        geo: emberGeo,
        speeds: speeds,
        count: emberCount,
      };

      return embersMesh;
    }

    // --- MESH HELPERS ---
    createPedimentedWindowMesh(isTriangular = true) {
      const winGroup = new THREE.Group();

      const glassGeo = new THREE.PlaneGeometry(2.4, 4.2);
      const glass = new THREE.Mesh(glassGeo, this.materials.windowDay);
      this.windowMeshes.push(glass);
      winGroup.add(glass);

      const frameGeo = new THREE.BoxGeometry(2.6, 4.4, 0.2);
      const frame = new THREE.Mesh(frameGeo, this.materials.stoneDark);
      frame.position.z = -0.11;
      winGroup.add(frame);

      if (isTriangular) {
        const pedShape = new THREE.Shape();
        pedShape.moveTo(-1.5, 0);
        pedShape.lineTo(1.5, 0);
        pedShape.lineTo(0, 0.9);
        pedShape.closePath();
        const pedGeo = new THREE.ShapeGeometry(pedShape);
        const ped = new THREE.Mesh(pedGeo, this.materials.stone);
        ped.position.set(0, 2.2, 0.1);
        winGroup.add(ped);
      } else {
        const archShape = new THREE.Shape();
        archShape.moveTo(-1.5, 0);
        archShape.quadraticCurveTo(0, 1.1, 1.5, 0);
        archShape.closePath();
        const archGeo = new THREE.ShapeGeometry(archShape);
        const arch = new THREE.Mesh(archGeo, this.materials.stone);
        arch.position.set(0, 2.2, 0.1);
        winGroup.add(arch);
      }

      const sillGeo = new THREE.BoxGeometry(2.8, 0.25, 0.35);
      const sill = new THREE.Mesh(sillGeo, this.materials.stone);
      sill.position.set(0, -2.2, 0.1);
      winGroup.add(sill);

      return winGroup;
    }

    createSquareWindowMesh() {
      const winGroup = new THREE.Group();

      const glassGeo = new THREE.PlaneGeometry(2.2, 2.2);
      const glass = new THREE.Mesh(glassGeo, this.materials.windowDay);
      this.windowMeshes.push(glass);
      winGroup.add(glass);

      const frameGeo = new THREE.BoxGeometry(2.5, 2.5, 0.18);
      const frame = new THREE.Mesh(frameGeo, this.materials.stoneDark);
      frame.position.z = -0.1;
      winGroup.add(frame);

      const sillGeo = new THREE.BoxGeometry(2.6, 0.2, 0.3);
      const sill = new THREE.Mesh(sillGeo, this.materials.stone);
      sill.position.set(0, -1.2, 0.1);
      winGroup.add(sill);

      return winGroup;
    }

    createArchedWindowMesh() {
      const winGroup = new THREE.Group();

      const glassGeo = new THREE.PlaneGeometry(2.2, 3.2);
      const glass = new THREE.Mesh(glassGeo, this.materials.windowDay);
      this.windowMeshes.push(glass);
      winGroup.add(glass);

      const archArchGeo = new THREE.CylinderGeometry(
        1.1,
        1.1,
        0.2,
        16,
        1,
        false,
        0,
        Math.PI
      );
      const archHead = new THREE.Mesh(
        archArchGeo,
        this.materials.stoneRusticated
      );
      archHead.rotation.z = Math.PI / 2;
      archHead.position.set(0, 1.6, 0.05);
      winGroup.add(archHead);

      const keyGeo = new THREE.BoxGeometry(0.5, 0.6, 0.3);
      const key = new THREE.Mesh(keyGeo, this.materials.stone);
      key.position.set(0, 2.4, 0.15);
      winGroup.add(key);

      return winGroup;
    }

    createGatePierMesh() {
      const pierGroup = new THREE.Group();

      const baseGeo = new THREE.BoxGeometry(1.6, 1.2, 1.6);
      const base = new THREE.Mesh(baseGeo, this.materials.stone);
      base.position.y = 0.6;
      pierGroup.add(base);

      const shaftGeo = new THREE.BoxGeometry(1.3, 4.4, 1.3);
      const shaft = new THREE.Mesh(shaftGeo, this.materials.stoneRusticated);
      shaft.position.y = 3.4;
      shaft.castShadow = true;
      pierGroup.add(shaft);

      const capGeo = new THREE.BoxGeometry(1.6, 0.6, 1.6);
      const cap = new THREE.Mesh(capGeo, this.materials.stone);
      cap.position.y = 5.9;
      pierGroup.add(cap);

      const finialGeo = new THREE.SphereGeometry(0.45, 12, 12);
      const finial = new THREE.Mesh(finialGeo, this.materials.goldOrnament);
      finial.position.y = 6.6;
      pierGroup.add(finial);

      return pierGroup;
    }

    createSentryBoxMesh() {
      const boxGroup = new THREE.Group();

      const wallsGeo = new THREE.BoxGeometry(1.6, 3.8, 1.4);
      const walls = new THREE.Mesh(wallsGeo, this.materials.wroughtIron);
      walls.position.y = 1.9;
      boxGroup.add(walls);

      const doorCutoutGeo = new THREE.BoxGeometry(1.0, 3.0, 0.3);
      const doorCutout = new THREE.Mesh(
        doorCutoutGeo,
        this.materials.stoneMarble
      );
      doorCutout.position.set(0, 1.5, 0.6);
      boxGroup.add(doorCutout);

      const roofShape = new THREE.ConeGeometry(1.3, 0.9, 4);
      const roof = new THREE.Mesh(roofShape, this.materials.wroughtIron);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 4.1;
      boxGroup.add(roof);

      return boxGroup;
    }

    createKingsGuardMesh(index = 0) {
      const guardGroup = new THREE.Group();
      guardGroup.name = `KingsGuard_${index}`;

      const bootGeo = new THREE.BoxGeometry(0.24, 0.35, 0.45);
      [-0.2, 0.2].forEach((bx) => {
        const boot = new THREE.Mesh(bootGeo, this.materials.wroughtIron);
        boot.position.set(bx, 0.18, 0);
        guardGroup.add(boot);
      });

      const legsGeo = new THREE.BoxGeometry(0.68, 1.1, 0.34);
      const legs = new THREE.Mesh(legsGeo, this.materials.wroughtIron);
      legs.position.y = 0.9;
      guardGroup.add(legs);

      const tunicGeo = new THREE.BoxGeometry(0.72, 1.25, 0.38);
      const tunic = new THREE.Mesh(tunicGeo, this.materials.tunicRed);
      tunic.position.y = 1.95;
      tunic.castShadow = true;
      guardGroup.add(tunic);

      const beltGeo = new THREE.BoxGeometry(0.74, 0.12, 0.4);
      const belt = new THREE.Mesh(beltGeo, this.materials.stoneMarble);
      belt.position.y = 1.6;
      guardGroup.add(belt);

      for (let b = 0; b < 4; b++) {
        const buttonGeo = new THREE.SphereGeometry(0.03, 6, 6);
        const button = new THREE.Mesh(buttonGeo, this.materials.goldOrnament);
        button.position.set(0, 1.75 + b * 0.18, 0.2);
        guardGroup.add(button);
      }

      const headGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const head = new THREE.Mesh(
        headGeo,
        new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.6 })
      );
      head.position.y = 2.75;
      guardGroup.add(head);

      const bearskinGeo = new THREE.CylinderGeometry(0.26, 0.24, 1.05, 12);
      const bearskin = new THREE.Mesh(bearskinGeo, this.materials.bearskinFur);
      bearskin.position.y = 3.3;
      bearskin.castShadow = true;
      guardGroup.add(bearskin);

      const plumeColor = index % 2 === 0 ? 0xffffff : 0xcc0000;
      const plumeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6);
      const plume = new THREE.Mesh(
        plumeGeo,
        new THREE.MeshBasicMaterial({ color: plumeColor })
      );
      plume.position.set(-0.24, 3.2, 0.08);
      guardGroup.add(plume);

      const rifleGeo = new THREE.BoxGeometry(0.08, 1.8, 0.12);
      const rifle = new THREE.Mesh(rifleGeo, this.materials.wroughtIron);
      rifle.position.set(0.42, 1.9, 0.15);
      guardGroup.add(rifle);

      return guardGroup;
    }

    createLondonPlaneTree(scale = 1.0) {
      const treeGroup = new THREE.Group();
      treeGroup.scale.set(scale, scale, scale);

      const trunkGeo = new THREE.CylinderGeometry(0.4, 0.7, 7, 10);
      const trunkMat = new THREE.MeshStandardMaterial({
        color: 0x4a3a2d,
        roughness: 0.9,
      });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 3.5;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x3d662f,
        roughness: 0.85,
        flatShading: true,
      });

      const canopyLayers = [
        { r: 4.2, y: 7.5, sy: 0.75 },
        { r: 3.4, y: 9.8, sy: 0.85 },
        { r: 2.2, y: 11.5, sy: 0.9 },
      ];

      canopyLayers.forEach((layer) => {
        const fGeo = new THREE.DodecahedronGeometry(layer.r, 1);
        const fMesh = new THREE.Mesh(fGeo, foliageMat);
        fMesh.scale.y = layer.sy;
        fMesh.position.y = layer.y;
        fMesh.castShadow = true;
        treeGroup.add(fMesh);
      });

      return treeGroup;
    }

    createVictorianStreetLamp(hasBanner = true) {
      const lampGroup = new THREE.Group();

      const postGeo = new THREE.CylinderGeometry(0.1, 0.18, 5.2, 8);
      const post = new THREE.Mesh(postGeo, this.materials.wroughtIron);
      post.position.y = 2.6;
      lampGroup.add(post);

      const lanternGeo = new THREE.CylinderGeometry(0.35, 0.22, 0.8, 6);
      const lanternMat = new THREE.MeshStandardMaterial({
        color: 0xfff0c2,
        roughness: 0.2,
        metalness: 0.1,
        emissive: 0xffc857,
        emissiveIntensity: 0.8,
      });
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.position.y = 5.5;
      lampGroup.add(lantern);

      const crownGeo = new THREE.ConeGeometry(0.25, 0.4, 6);
      const crown = new THREE.Mesh(crownGeo, this.materials.goldOrnament);
      crown.position.y = 6.05;
      lampGroup.add(crown);

      if (hasBanner) {
        const bannerGeo = new THREE.PlaneGeometry(1.2, 2.4);
        const bannerMat = new THREE.MeshStandardMaterial({
          map: this.unionJackTex,
          side: THREE.DoubleSide,
        });
        const banner = new THREE.Mesh(bannerGeo, bannerMat);
        banner.position.set(0.8, 3.8, 0);
        lampGroup.add(banner);
      }

      return lampGroup;
    }

    createLondonBusMesh() {
      const busGroup = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xcc1111,
        roughness: 0.35,
        metalness: 0.3,
      });
      const bodyGeo = new THREE.BoxGeometry(2.4, 3.6, 7.2);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 2.1;
      body.castShadow = true;
      busGroup.add(body);

      const winMat = new THREE.MeshStandardMaterial({
        color: 0x112233,
        roughness: 0.1,
        metalness: 0.8,
      });
      const winGeo = new THREE.BoxGeometry(2.45, 0.8, 6.2);
      const winLower = new THREE.Mesh(winGeo, winMat);
      winLower.position.y = 1.8;
      busGroup.add(winLower);

      const winUpper = new THREE.Mesh(winGeo, winMat);
      winUpper.position.y = 3.1;
      busGroup.add(winUpper);

      const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.4, 16);
      wheelGeo.rotateZ(Math.PI / 2);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });

      [-1.2, 1.2].forEach((wx) => {
        [-2.2, 2.2].forEach((wz) => {
          const wheel = new THREE.Mesh(wheelGeo, wheelMat);
          wheel.position.set(wx, 0.45, wz);
          busGroup.add(wheel);
        });
      });

      return busGroup;
    }

    createBlackCabMesh() {
      const cabGroup = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x141416,
        roughness: 0.25,
        metalness: 0.5,
      });
      const bodyGeo = new THREE.BoxGeometry(1.8, 1.6, 3.8);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 1.0;
      body.castShadow = true;
      cabGroup.add(body);

      const cabWinMat = new THREE.MeshStandardMaterial({
        color: 0x243444,
        roughness: 0.1,
        metalness: 0.7,
      });
      const cabWinGeo = new THREE.BoxGeometry(1.7, 0.7, 2.2);
      const cabWin = new THREE.Mesh(cabWinGeo, cabWinMat);
      cabWin.position.set(0, 1.5, -0.2);
      cabGroup.add(cabWin);

      const signMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff8800,
        emissiveIntensity: 0.8,
      });
      const signGeo = new THREE.BoxGeometry(0.8, 0.2, 0.25);
      const sign = new THREE.Mesh(signGeo, signMat);
      sign.position.set(0, 2.0, 0.4);
      cabGroup.add(sign);

      return cabGroup;
    }

    // --- 8. HOTSPOTS DATA ---
    setupHotspots() {
      this.interactiveHotspots = [
        {
          id: 'balcony',
          title: 'The Royal Balcony',
          category: 'Iconic Landmark',
          badge: 'Most Famous',
          position: new THREE.Vector3(0, 9.8, 11.5),
          cameraTarget: new THREE.Vector3(0, 10.5, 26),
          cameraLookAt: new THREE.Vector3(0, 10.0, 5),
          shortDesc:
            'Where the Royal Family appears during momentous national celebrations, weddings, and Jubilees.',
          fullContent: `
            <h4>A Window on British Royal History</h4>
            <p>The iconic Central Balcony was introduced by Prince Albert in 1851 during the reign of Queen Victoria, allowing the Sovereign to connect directly with the British public.</p>
            <ul>
              <li><strong>First Public Appearance:</strong> 1851 by Queen Victoria during the Great Exhibition.</li>
              <li><strong>Famous Moments:</strong> VE Day in 1945 with Sir Winston Churchill; Royal Weddings of Prince William & Catherine (2011) and King Charles III's Coronation (2023).</li>
              <li><strong>The Red Drape:</strong> Ceremonial crimson velvet cloth with gold bullion fringe embroidered with the Sovereign's Royal Cypher.</li>
              <li><strong>RAF Flypasts:</strong> The Royal Family gathers here each June for Trooping the Colour to watch the Red Arrows and military flypast.</li>
            </ul>
          `,
          tip: 'Arrive at the Victoria Memorial or The Mall 2 hours before major royal flypasts or celebrations to secure a direct line of sight!',
        },
        {
          id: 'flag',
          title: 'The Royal Flagpole & Standard',
          category: 'Royal Protocol',
          badge: 'Live Status',
          position: new THREE.Vector3(0, 31, 4.5),
          cameraTarget: new THREE.Vector3(0, 32, 28),
          cameraLookAt: new THREE.Vector3(0, 30, 4.5),
          shortDesc:
            'Discover whether His Majesty King Charles III is currently residing inside the Palace.',
          fullContent: `
            <h4>The Sovereign's Flag Code Explained</h4>
            <p>Buckingham Palace never flies a flag at half-mast, even upon the death of a monarch, because the throne is never vacant: <em>"The King is dead, long live The King."</em></p>
            <ul>
              <li><strong>The Royal Standard:</strong> Flown only when The King is physically present inside Buckingham Palace. Features the English Lions, Scottish Lion Rampant, and Irish Harp.</li>
              <li><strong>The Union Jack:</strong> Flown whenever The King is NOT in residence (e.g., staying at Windsor Castle, Sandringham, or Balmoral).</li>
              <li><strong>Flag Etiquette:</strong> The Royal Standard takes precedence over all other national and foreign flags on British soil.</li>
            </ul>
          `,
          tip: 'Look up at the flagpole the moment you arrive. If the 4-quadrant Royal Standard is flying, The King is home right now!',
        },
        {
          id: 'guard',
          title: 'Changing of the Guard',
          category: 'Ceremony',
          badge: 'Top Attraction',
          position: new THREE.Vector3(0, 2.5, 24),
          cameraTarget: new THREE.Vector3(-14, 6, 36),
          cameraLookAt: new THREE.Vector3(0, 2, 20),
          shortDesc:
            'The world-famous handover ceremony between the Old Guard and New Guard.',
          fullContent: `
            <h4>Guard Mounting (Changing of the Guard)</h4>
            <p>Carried out by the Foot Guards of the Household Division in their world-famous scarlet tunics and tall black bearskin hats made from Canadian black bear fur.</p>
            <ul>
              <li><strong>Schedule:</strong> 11:00 AM on Mondays, Wednesdays, Fridays, and Sundays (weather permitting; always check RCT schedules).</li>
              <li><strong>Timeline:</strong> 10:30 AM Old Guard forms at St James's Palace; 10:45 AM New Guard departs Wellington Barracks; 11:00 AM Ceremony commences inside the forecourt; 11:45 AM Dismissal.</li>
              <li><strong>The Five Regiments:</strong> Grenadier (single buttons, white plume left), Coldstream (pairs of buttons, red plume right), Scots (groups of 3, no plume), Irish (groups of 4, blue plume right), Welsh (groups of 5, white-green plume left).</li>
            </ul>
          `,
          tip: 'Best viewing vantage: Stand on the raised marble steps of the Queen Victoria Memorial facing the Palace gates by 10:15 AM.',
        },
        {
          id: 'victoria_memorial',
          title: 'Queen Victoria Memorial',
          category: 'Monument',
          badge: 'Gilded Landmark',
          position: new THREE.Vector3(0, 16, 82),
          cameraTarget: new THREE.Vector3(0, 15, 114),
          cameraLookAt: new THREE.Vector3(0, 12, 82),
          shortDesc:
            'Sir Thomas Brock’s monumental tribute featuring 2,300 tonnes of gleaming Carrara marble.',
          fullContent: `
            <h4>A Monument to Britain’s Golden Age</h4>
            <p>Unveiled in 1911 by King George V, this grandiose memorial stands at the head of The Mall. It was funded by donations from across the British Empire.</p>
            <ul>
              <li><strong>Winged Victory:</strong> Gilded bronze angel standing on a golden orb at the summit, flanked by statues of Courage and Constancy.</li>
              <li><strong>Seated Victoria:</strong> A 13-foot seated marble effigy of Queen Victoria facing down The Mall towards Admiralty Arch and Trafalgar Square.</li>
              <li><strong>Surrounding Sculptures:</strong> Personifications of Truth, Justice, and Motherhood/Charity, plus bronze naval figures and fountains.</li>
            </ul>
          `,
          tip: 'Take your iconic postcard photo from the east side of the memorial, framing both the gilded Winged Victory and the Palace facade in one shot.',
        },
        {
          id: 'state_rooms',
          title: 'The State Rooms & Grand Ballroom',
          category: 'Palace Interior',
          badge: 'Summer Opening',
          position: new THREE.Vector3(45, 12, -25),
          cameraTarget: new THREE.Vector3(70, 24, -10),
          cameraLookAt: new THREE.Vector3(35, 10, -25),
          shortDesc:
            '19 breathtaking staterooms housing masterworks by Rembrandt, Vermeer, and Rubens.',
          fullContent: `
            <h4>The Heart of the Working Monarchy</h4>
            <p>During August and September, The King opens the 19 State Rooms to public visitors while the Royal Family departs for Balmoral Castle in Scotland.</p>
            <ul>
              <li><strong>The Throne Room:</strong> Home to the single-step dais holding the Chairs of Estate used at coronation ceremonies.</li>
              <li><strong>The White Drawing Room:</strong> Famous for its hidden secret door concealed within a mirrored cabinet, through which the Monarch enters.</li>
              <li><strong>The Ballroom:</strong> Added by Queen Victoria in 1855, it is the largest room in the palace, seating 170 guests for glittering State Banquets.</li>
              <li><strong>Picture Gallery:</strong> 47-meter long gallery displaying masterpieces by Rembrandt, Titian, Vermeer, Canaletto, and Van Dyck.</li>
            </ul>
          `,
          tip: 'State Room summer tickets sell out months in advance. Always book via the official Royal Collection Trust website before traveling!',
        },
        {
          id: 'gardens',
          title: 'The 39-Acre Royal Gardens',
          category: 'Royal Oasis',
          badge: 'Private Grounds',
          position: new THREE.Vector3(0, 2, -75),
          cameraTarget: new THREE.Vector3(-35, 20, -105),
          cameraLookAt: new THREE.Vector3(0, 2, -60),
          shortDesc:
            'London’s largest private walled garden, host to the annual Royal Garden Parties.',
          fullContent: `
            <h4>London’s Most Exclusive Sanctuary</h4>
            <p>Spanning 39 acres behind the Palace, this lush private landscape features over 300 types of British wildflowers, 150 varieties of mature trees, and a 3-acre ornamental lake created in 1828.</p>
            <ul>
              <li><strong>Royal Garden Parties:</strong> Every summer, The King invites over 30,000 members of the public from charities and community service to tea on the lawn.</li>
              <li><strong>Royal Beehives:</strong> 4 historic hives on the garden island produce Buckingham Palace Honey for official state banquets.</li>
              <li><strong>Helicopter Landing Pad:</strong> The private lawn accommodates royal helicopter departures for state duties.</li>
            </ul>
          `,
          tip: 'When visiting the State Rooms, your tour exits onto the Palace Garden Terrace where you can enjoy tea and scones with a view of the private lawn!',
        },
      ];
    }

    // --- INTERACTIVE CONTROLS API ---
    setFlag(type) {
      if (!this.flagMaterial) return;
      this.currentFlagType = type;
      if (type === 'royal') {
        this.flagMaterial.map = this.royalStandardTex;
      } else {
        this.flagMaterial.map = this.unionJackTex;
      }
      this.flagMaterial.needsUpdate = true;
    }

    setLightingMode(mode) {
      this.nightMode = mode === 'night';
      const isNight = this.nightMode;

      this.windowMeshes.forEach((mesh) => {
        mesh.material = isNight
          ? this.materials.windowNight
          : this.materials.windowDay;
      });

      if (this.nightFireworks && this.nightFireworks.mesh) {
        this.nightFireworks.mesh.material.opacity = isNight ? 0.9 : 0;
      }
    }

    // --- ANIMATION UPDATE LOOP ---
    update(time) {
      const t = time * 0.001;

      // 1. Waving Flag Simulation
      if (this.flagMesh && this.flagMesh.geometry) {
        const pos = this.flagMesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const wave =
            Math.sin(u * 2.2 - t * 4.5) * 0.22 * Math.max(0, (u + 2.7) / 5.4);
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
      }

      // 2. Lake Water Ripples
      if (this.lakeGeometry) {
        const pos = this.lakeGeometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const dist = Math.sqrt(x * x + y * y);
          const ripple =
            Math.sin(dist * 0.4 - t * 2.8) *
            0.08 *
            Math.min(1, dist / 15);
          pos.setZ(i, ripple);
        }
        pos.needsUpdate = true;
      }

      // 3. Fountain Water Spray Physics
      if (this.fountainParticles) {
        const fp = this.fountainParticles;
        const pPos = fp.geo.attributes.position;
        for (let i = 0; i < fp.count; i++) {
          let y = pPos.getY(i);
          let vel = fp.velocities[i];

          y += vel.y * 0.02;
          vel.y -= 0.08;

          pPos.setX(i, pPos.getX(i) + vel.x * 0.015);
          pPos.setZ(i, pPos.getZ(i) + vel.z * 0.015);
          pPos.setY(i, y);

          if (y < 2.05) {
            pPos.setX(i, vel.baseX + (Math.random() - 0.5) * 0.8);
            pPos.setY(i, 2.1);
            pPos.setZ(i, vel.baseZ + (Math.random() - 0.5) * 0.8);
            vel.y = 1.8 + Math.random() * 1.4;
          }
        }
        pPos.needsUpdate = true;
      }

      // 4. Night Mode Celebration Fireworks / Embers
      if (this.nightFireworks && this.nightMode) {
        const ne = this.nightFireworks;
        const ePos = ne.geo.attributes.position;
        for (let i = 0; i < ne.count; i++) {
          let y = ePos.getY(i) + ne.speeds[i].y;
          let x = ePos.getX(i) + Math.sin(t + i) * 0.04;
          if (y > 55) {
            y = 5;
            x = (Math.random() - 0.5) * 110;
          }
          ePos.setX(i, x);
          ePos.setY(i, y);
        }
        ePos.needsUpdate = true;
      }

      // 5. Animated Marching King's Guards & Vehicles
      this.animatedObjects.forEach((obj) => {
        // Marching sentry pacing
        if (obj.type === 'guard_marching') {
          // Pace: back and forth along X
          const phase = Math.sin(t * obj.speed + obj.cycle);
          obj.mesh.position.x = obj.baseX + phase * obj.range;
          // Turn body in direction of march
          const marchingRight = Math.cos(t * obj.speed + obj.cycle) > 0;
          obj.mesh.rotation.y = marchingRight ? Math.PI / 2 : -Math.PI / 2;
          // Step bobbing
          obj.mesh.position.y = Math.abs(Math.sin(t * obj.speed * 4)) * 0.08;
        }

        // Cloud drift across sky
        if (obj.type === 'cloud_drift') {
          obj.mesh.position.x += obj.speed * 0.05;
          if (obj.mesh.position.x > 180) {
            obj.mesh.position.x = -180;
          }
        }

        // Vehicles around Victoria Memorial
        if (obj.type === 'vehicle_bus' || obj.type === 'vehicle_cab') {
          obj.angle += obj.speed * 0.016;
          const memZ = 82;
          obj.mesh.position.x = Math.cos(obj.angle) * obj.radius;
          obj.mesh.position.z = memZ + Math.sin(obj.angle) * obj.radius;
          obj.mesh.rotation.y = -obj.angle + Math.PI / 2;
        }
      });
    }
  }

  return {
    createPalaceBuilder: function () {
      return new BuckinghamPalaceBuilder();
    },
  };
})();
