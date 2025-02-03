/**
 *  Cylinder Maker File for init 
 */
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import Stats from 'three/examples/jsm/libs/stats.module';
//import {CSG} from "three-csg.js"
import { ADDITION, SUBTRACTION, Brush, Evaluator } from 'three-bvh-csg';

export default class CylinderMaker 
{
    constructor( dataOBJ, scene, grid )
    {
        this.scene = scene;
        this.cylinder = undefined; // group 
        this.FlatSheet = undefined; // group 
        this.dataOBJ = dataOBJ;

        this.grid = grid;
    }
    
    updateDATA(dataOBJ)
    {
        this.dataOBJ = dataOBJ;
    }

    updateFlatern()
    {
        console.log(this.dataOBJ)
        this.removeCylinder();
        this.removeFlatSheet();
        this.makeFlatePatern();
    }

    update()
    {
        console.log(this.dataOBJ)
        this.removeCylinder();
        this.removeFlatSheet();
        this.makeCylinder();
    }

    makeFlatePatern()
    {
        const mat1 = new THREE.MeshPhongMaterial({ color: 0x999999 });
        
        const h1brush = new Brush( new THREE.CylinderGeometry(1,1,10) );
        h1brush.position.x = 5;
        h1brush.position.z = 2;
        h1brush.updateMatrixWorld();

        const h2brush = new Brush( new THREE.CylinderGeometry(2,2,10) );
        h2brush.position.x = -15;
        h2brush.position.z = -5;
        h2brush.updateMatrixWorld();

        const h3brush = new Brush( new THREE.CylinderGeometry(0.5,0.5,5) );
        h3brush.position.x = 7;
        h3brush.position.z = -10;
        h3brush.updateMatrixWorld();

        const sheetbrush2 = new Brush( new THREE.BoxGeometry(50,0.1,30) );
        //brush2.position.y = 5;
        sheetbrush2.updateMatrixWorld();

        const evaluator = new Evaluator();
        let result = evaluator.evaluate( sheetbrush2, h1brush, SUBTRACTION );
        result = evaluator.evaluate( result, h2brush, SUBTRACTION );
        result = evaluator.evaluate( result, h3brush, SUBTRACTION );
        //result.material = mat1;

        this.FlatSheet = result;

        this.scene.add(result);

        console.log("Flat patern");

    }

    makeCylinder()
    {
        // this.getFlatPatern();
        //return;

        let diameter = this.dataOBJ.diameter/100;
        let height = this.dataOBJ.height/100;
        let insulation = this.dataOBJ.insulation/100;
        let cyliR = diameter/2;
        let caseR = cyliR + insulation;
        let cyliH = height - cyliR/2;
        let caseHeight = height+ (insulation*2) + cyliR/2 ;
        let lidH = cyliR/2;
        let lidR1 = cyliR*1.3; //Math.sqrt( (cyliR * cyliR) - ( (cyliR-lidH) * (cyliR-lidH) )  );
        
        console.log(lidR1);

        //this.grid.position.y = -caseHeight/2;

        // materials 
        // const caseMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        // const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
        const cylinderMaterial = new THREE.MeshLambertMaterial( {
            color: 0x00ffff,
            opacity: 1.0,
            side: THREE.DoubleSide,
            transparent: false,
            flatShading: true,
		});
        
        const caseMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff,
            opacity: 0.4,
            side: THREE.DoubleSide,
            transparent: true,
            flatShading: true,
		});

        
        const cylinderGeometry = new THREE.CylinderGeometry(cyliR, cyliR, cyliH );
        const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        const outerCase = new THREE.CylinderGeometry(caseR, caseR, caseHeight);
        const caseMesh = new THREE.Mesh(outerCase, caseMaterial);
        // caseMesh.material.transparent = true;
        // caseMesh.material.opacity = 0.4;

        //cylinderMesh.position.y = 0; //(height/2);
        //caseMesh.position.y = (height/2) ;

        let upHight = (caseHeight/2);

        cylinderMesh.position.y = upHight;
        caseMesh.position.y = upHight;

        const group = new THREE.Group();
        group.add(cylinderMesh); 
        group.add(caseMesh); 

        // let lidR = cyliR + insulation;
        // // top bottom lid 
        // const LidGeometry  = new THREE.SphereGeometry(lidR + 0.7, 32, 16, 0, Math.PI*2, 0, 0.9 );
        // const topLid = new THREE.Mesh(LidGeometry, cylinderMaterial);
        // topLid.position.y = 6;

        // const LidGeometry1  = new THREE.SphereGeometry(lidR + 0.7, 32, 16, 0, Math.PI*2, 0, 0.9 );
        // const bottomLid = new THREE.Mesh(LidGeometry1, cylinderMaterial);
        // bottomLid.position.y = 6;
        // bottomLid.rotateX(Math.PI);

        //-group.add(topLid); 
        //-group.add(bottomLid); 

        // stend 
        let standR = (cyliR/2)+1;
        const stendGeometry = new THREE.CylinderGeometry(standR, standR, lidH);
        const stand  = new THREE.Mesh(stendGeometry, cylinderMaterial);
        stand.position.y = -(height/2 + insulation)  + upHight;
        group.add(stand);


        // make dom 
        
        var domLid = this.createDomeWithPoints(lidR1,lidH,32);
        //domLid.material = cylinderMaterial;
        // domLid.side = THREE.DoubleSide;
        // domLid.position.y = 8;
        // domLid.rotation.z = Math.PI/6;
        // group.add(domLid);
		let dodecahedronGeometry = domLid.geometry;
        dodecahedronGeometry.deleteAttribute( 'normal' );
		dodecahedronGeometry.deleteAttribute( 'uv' );
        dodecahedronGeometry = BufferGeometryUtils.mergeVertices( dodecahedronGeometry );
        const vertices = [];
		const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );
        for ( let i = 0; i < positionAttribute.count; i ++ ) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute( positionAttribute, i );
            vertices.push( vertex );
        }
        // convex hull
        const meshMaterial = new THREE.MeshLambertMaterial( {
            color: 0x00ffff,
            opacity: 1.0,
            side: THREE.DoubleSide,
            transparent: false,
            flatShading: true,
        });
        const meshGeometry = new ConvexGeometry( vertices );
        const meshTopLid = new THREE.Mesh( meshGeometry, meshMaterial );
        const meshBotLid = new THREE.Mesh( meshGeometry, meshMaterial );
		group.add( meshTopLid );
        group.add( meshBotLid );
        meshTopLid.position.y = -lidR1+ lidH + cyliH/2 -0.1 + upHight;
        meshBotLid.rotation.z = Math.PI;
        meshBotLid.position.y = +lidR1 - lidH - cyliH/2 +0.1 + upHight;


        //flat patern 
        //const flat = this.getFlatPatern();
        //group.add(flat);

        let orbitR = caseR;

        // connection 1 
        if ( this.dataOBJ.con1 ){
            let con1R = 10/100;
            let con1L = 100/100;    
            let orbitAng = this.dataOBJ.con1ang;
            let con1height = this.dataOBJ.con1height/100;

            const con1Geometry = new THREE.CylinderGeometry(con1R, con1R, con1L);
            const con1Mesh = new THREE.Mesh(con1Geometry, cylinderMaterial);
            con1Mesh.position.set( Math.cos(orbitAng) * (orbitR) , con1height , Math.sin(orbitAng) * (orbitR) );
            con1Mesh.rotation.set( Math.PI/2, 0 , orbitAng + Math.PI/2 );
            group.add(con1Mesh);
        }

        
        // connection 2 
        if ( this.dataOBJ.con2 ){
            let con2R = 10/100;
            let con2L = 100/100;
            let orbitAng2 = this.dataOBJ.con2ang;
            let con2height = this.dataOBJ.con2height/100;

            const con2Geometry = new THREE.CylinderGeometry(con2R, con2R, con2L);
            const con2Mesh = new THREE.Mesh(con2Geometry, cylinderMaterial);
            con2Mesh.position.set( Math.cos(orbitAng2) * (orbitR) , con2height , Math.sin(orbitAng2) * (orbitR) );
            con2Mesh.rotation.set( Math.PI/2, 0 , orbitAng2 + Math.PI/2 );
            group.add(con2Mesh);
        }

        // connection 3 
        if ( this.dataOBJ.con3 ){
            let con3R = 10/100;
            let con3L = 100/100;
            let orbitAng3 = this.dataOBJ.con3ang;
            let con3height = this.dataOBJ.con3height/100;

            const con3Geometry = new THREE.CylinderGeometry(con3R, con3R, con3L);
            const con3Mesh = new THREE.Mesh(con3Geometry, cylinderMaterial);
            con3Mesh.position.set( Math.cos(orbitAng3) * (orbitR) , con3height , Math.sin(orbitAng3) * (orbitR) );
            con3Mesh.rotation.set( Math.PI/2, 0 , orbitAng3 + Math.PI/2 );
            group.add(con3Mesh);
        }



        this.cylinder = group;
        this.scene.add(group);

        console.log("Cylinder ");

    }

    getFlatPatern()
    {
        var geometry_Y = new THREE.BoxBufferGeometry( 15, 5, 0.1 );
        var geometry_A = new THREE.BoxBufferGeometry( 5, 5, 5 );
        //geometry_A.translate( 0.5, 0.5, 0 );

        var bsp_A = new ThreeBSP(geometry_A);
        var bsp_Y = new ThreeBSP(geometry_Y);

        var bsp_YsubA = bsp_Y.subtract(bsp_A);
        var bsp_mesh = bsp_YsubA.toMesh();
        bsp_mesh.material = new THREE.MeshPhongMaterial({ color: 0x999999 });

        this.scene.add( bsp_mesh );
        //return bsp_mesh;
    } 

    removeCylinder()
    {
        console.log(this.cylinder);
        this.scene.remove(this.cylinder);
    }
    
    removeFlatSheet()
    {
        console.log(this.FlatSheet);
        this.scene.remove(this.FlatSheet);
    }

    

    /**
     * Create a dome shape using radius and height
     * @param {number} radius - The radius of the dome
     * @param {number} height - The height of the dome
     * @returns {THREE.Mesh} - A Three.js Mesh object representing the dome
     */
    createDome(radius, height) {
        // Ensure the height is not more than the radius
        if (height > radius) {
            console.warn("Height cannot exceed the radius. Adjusting height to equal radius.");
            height = radius;
        }

        // Create a full sphere geometry
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);

        // Clip the bottom part of the sphere to create a dome
        const vertices = sphereGeometry.attributes.position.array;

        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            const z = vertices[i + 2];

            // Remove vertices below the specified height
            if (y < height - radius) {
                vertices[i] = 0;
                vertices[i + 1] = 0;
                vertices[i + 2] = 0;
            }
        }

        // Update the geometry
        sphereGeometry.attributes.position.needsUpdate = true;
        sphereGeometry.computeVertexNormals();

        // Create a material (color can be customized)
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

        // Create a mesh
        const dome = new THREE.Mesh(sphereGeometry, material);

        // Return the dome mesh
        return dome;
    }

    

    /**
     * Create a dome shape using 3D points.
     * @param {number} radius - The radius of the dome.
     * @param {number} height - The height of the dome.
     * @param {number} segments - The number of segments (resolution of the dome).
     * @returns {THREE.Mesh} - A Three.js Mesh object representing the dome.
     */
    createDomeWithPoints(radius, height, segments) {
        // Ensure height does not exceed radius
        if (height > radius) {
            console.warn("Height cannot exceed the radius. Adjusting height to equal radius.");
            height = radius;
        }

        // Array to store vertices and indices
        const vertices = [];
        const indices = [];

        // Loop through spherical coordinates to calculate dome vertices
        for (let i = 0; i <= segments; i++) {
            const phi = (Math.PI / 2) * (i / segments); // From 0 to π/2 for a dome
            for (let j = 0; j <= segments; j++) {
                const theta = (2 * Math.PI * j) / segments; // From 0 to 2π

                // Convert spherical coordinates to Cartesian
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);

                // Only include points above the height cutoff
                if (y >= radius - height) {
                    vertices.push(x, y, z);
                }
            }
        }

        // Create faces (triangles) by connecting vertices
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * (segments + 1) + j;
                const b = a + segments + 1;
                const c = a + 1;
                const d = b + 1;

                //console.log({a,b,c,d});

                // Add two triangles for each quad
                indices.push(a, b, c); // Triangle 1
                indices.push(c, b, d); // Triangle 2
            }
        }

        // Create BufferGeometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();

        // Create material
        //const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const meshMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff,
            opacity: 1,
            side: THREE.DoubleSide,
            transparent: false,
            flatShading: true,
		});

        // Create mesh
        const dome = new THREE.Mesh(geometry, meshMaterial);
       
        return dome;
    }


}