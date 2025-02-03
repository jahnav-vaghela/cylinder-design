/**
 *  GUI Init Maker File for init 
 */
///import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import Stats from 'three/examples/jsm/libs/stats.module';

export default class GuiInit 
{
    constructor( cylinderMaker )
    {
        this.scene = undefined;
        this.gui = new GUI;
        this.c_mk = cylinderMaker
    }

    update()
    {
        this.c_mk.update();
    }

    updateFlatern()
    {
        this.c_mk.updateFlatern();
    }

    initialize(cm)
    {
        let gui = this.gui 
        
        var data = this.c_mk.dataOBJ;
        //gui.add(data, 'xyz', 7, 20,1).name("XYZ").onFinishChange( this.update() );
        gui.add(data, 'diameter', 300, 2000).name('Cylinder Diameter'); 
        gui.add(data, 'height', 300, 3000).name('Cylinder Height');
        gui.add(data, 'insulation', [50,75,100,150,200] ).name('Insulation Thickness');
        gui.add(this.c_mk, 'update');

        gui.add(this.c_mk, 'updateFlatern');

        let connections  = ['FemaleBoss 30mm', 'FemaleBoss 40mm', 'FemaleBoss 50mm' ];

        let h1folder = gui.addFolder("Connecton 1");
        h1folder.add(data, 'con1').name("Enable Connection 1")
        h1folder.add(data, 'con1opt', connections).name("Connections type");
        h1folder.add(data, 'con1height').name("Connection Height");
        h1folder.add(data, 'con1ang', 0, Math.PI*2).name("Connection Angle");

        let h2folder = gui.addFolder("Connecton 2");
        h2folder.add(data, 'con2').name("Enable Connection 2")
        h2folder.add(data, 'con2opt', connections).name("Connections type");
        h2folder.add(data, 'con2height').name("Connection Height");
        h2folder.add(data, 'con2ang', 0, Math.PI*2).name("Connection Angle");

        let h3folder = gui.addFolder("Connecton 3");
        h3folder.add(data, 'con3').name("Enable Connection 3")
        h3folder.add(data, 'con3opt', connections).name("Connections type");
        h3folder.add(data, 'con3height').name("Connection Height");
        h3folder.add(data, 'con3ang', 0, Math.PI*2).name("Connection Angle");

        let h4folder = gui.addFolder("Connecton 4");
        h4folder.add(data, 'con4').name("Enable Connection 4")
        h4folder.add(data, 'con4opt', connections).name("Connections type");
        h4folder.add(data, 'con4height').name("Connection Height");
        h4folder.add(data, 'con4ang', 0, Math.PI*2).name("Connection Angle");

        let h5folder = gui.addFolder("Connecton 5");
        h5folder.add(data, 'con5').name("Enable Connection 5")
        h5folder.add(data, 'con5opt', connections).name("Connections type");
        h5folder.add(data, 'con5height').name("Connection Height");
        h5folder.add(data, 'con5ang', 0, Math.PI*2).name("Connection Angle");

        let h6folder = gui.addFolder("Connecton 6");
        h6folder.add(data, 'con6').name("Enable Connection 6")
        h6folder.add(data, 'con6opt', connections).name("Connections type");
        h6folder.add(data, 'con6height').name("Connection Height");
        h6folder.add(data, 'con6ang', 0, Math.PI*2).name("Connection Angle");

        let h7folder = gui.addFolder("Connecton 7");
        h7folder.add(data, 'con7').name("Enable Connection 7")
        h7folder.add(data, 'con7opt', connections).name("Connections type");
        h7folder.add(data, 'con7height').name("Connection Height");
        h7folder.add(data, 'con7ang', 0, Math.PI*2).name("Connection Angle");

        let h8folder = gui.addFolder("Connecton 8");
        h8folder.add(data, 'con8').name("Enable Connection 8")
        h8folder.add(data, 'con8opt', connections).name("Connections type");
        h8folder.add(data, 'con8height').name("Connection Height");
        h8folder.add(data, 'con8ang', 0, Math.PI*2).name("Connection Angle");

        let h9folder = gui.addFolder("Connecton 9");
        h9folder.add(data, 'con9').name("Enable Connection 9")
        h9folder.add(data, 'con9opt', connections).name("Connections type");
        h9folder.add(data, 'con9height').name("Connection Height");
        h9folder.add(data, 'con9ang', 0, Math.PI*2).name("Connection Angle");

        

    }

}