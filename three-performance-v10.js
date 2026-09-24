import * as THREE_BASE from './vendor/three.module.min.js';
export * from './vendor/three.module.min.js';

const configs={
  ultra:{pixelRatio:2,antialias:true,shadows:true},
  standard:{pixelRatio:1.5,antialias:true,shadows:true},
  low:{pixelRatio:1,antialias:false,shadows:false},
  '2d':{pixelRatio:1,antialias:false,shadows:false}
};
function mode(){try{return localStorage.getItem('materials.performance.v10')||'standard';}catch{return 'standard';}}
function config(){return configs[mode()]||configs.standard;}

export class WebGLRenderer extends THREE_BASE.WebGLRenderer{
  constructor(parameters={}){
    const c=config();
    super({...parameters,antialias:c.antialias});
    this._materialsMode='';
    super.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,c.pixelRatio));
  }
  setPixelRatio(value){const c=config();return super.setPixelRatio(Math.min(value||1,c.pixelRatio));}
  render(scene,camera){
    const m=mode(),c=config();
    if(m!==this._materialsMode){
      this._materialsMode=m;
      super.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,c.pixelRatio));
    }
    if(this.shadowMap)this.shadowMap.enabled=c.shadows;
    return super.render(scene,camera);
  }
}
