const maxEntities = 3;
const maxDepth = 7;

class Quadtree {
  myEntities = [];
  containingEntityCount = 0;
  subTrees = null;
  x1;x2;y1;y2;
  depth;

  constructor(x1, y1, x2, y2, depth = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.depth = depth;
  }

  drawAll = (context) => {
    if (!this.subTrees) return;
    const {x1,x2,x3,y1,y2,y3} = this.getxys();
    context.moveTo(x2, y1);
    context.lineTo(x2, y3);
    context.moveTo(x1, y2);
    context.lineTo(x3, y2);

    this.subTrees.forEach(subTree => subTree.drawAll(context));
  }

  getEntityCount = () => {
    return this.myEntities.length;
  }

  getEntities = () => {
    return this.myEntities;
  }

  getAllEntities = () => {
    if (!this.subTrees) return this.myEntities;
    const entities = [];
    this.subTrees.forEach(subTree => {
      subTree.getAllEntities().forEach(entity => {
        if (!entities.some(x => x.id == entity.id)) {
          entities.push(entity);
        }
      });
    });
    return entities;
  }

  getNeighbourIds = (entity) => {
    if(!this.subTrees){
      return this.myEntities.map(x => x.id).filter(id => id != entity.id);
    }
    const subTreeIds = this.getSubTreeIds(entity);
    const neighbourIds = [];

    subTreeIds.forEach(id => {
      let a = this.subTrees[id].getNeighbourIds(entity);
      a.forEach(neighbourId => {
        if (!neighbourIds.some(x => x == neighbourId)) {
          neighbourIds.push(neighbourId);
        }
      });
    });
    return neighbourIds;
  }

  getxys = () => {
    const x1 = this.x1;
    const x2 = Math.floor((this.x1+this.x2)/2);
    const x3 = this.x2;
    const y1 = this.y1;
    const y2 = Math.floor((this.y1+this.y2)/2);
    const y3 = this.y2;
    return {x1,x2,x3,y1,y2,y3};
  }

  createSubTrees = () => {
    const {x1,x2,x3,y1,y2,y3} = this.getxys();
    const subTrees = [];
    subTrees.push(new Quadtree(x1,y1,x2,y2, this.depth + 1));
    subTrees.push(new Quadtree(x2,y1,x3,y2, this.depth + 1));
    subTrees.push(new Quadtree(x1,y2,x2,y3, this.depth + 1));
    subTrees.push(new Quadtree(x2,y2,x3,y3, this.depth + 1));
    return subTrees;
  }

  addEntity = (newEntity) => {
    this.containingEntityCount++;
    const entityCount = this.getEntityCount();
    if((!this.subTrees && entityCount < maxEntities) || this.depth == maxDepth ){
      this.myEntities.push(newEntity);
      return;
    }
    if (!this.subTrees) {
      this.subTrees = this.createSubTrees();
      this.myEntities.forEach(entity => {
        this.addEntityToSubTrees(entity);
      });
      this.myEntities = [];
    }
    this.addEntityToSubTrees(newEntity);
  }

  addEntityToSubTrees = (entity) => {
    const subTreeIds = this.getSubTreeIds(entity);

    subTreeIds.forEach(id => {
      this.subTrees[id].addEntity(entity);
    });
  }

  removeEntity = (entityToRemove) => {
    this.containingEntityCount--;
    if(!this.subTrees){
      this.myEntities = this.myEntities.filter(x => x.id != entityToRemove.id);
      return;
    }
    if (this.containingEntityCount == maxEntities) {
      this.myEntities = [];
      this.getAllEntities().forEach(entity => {
        if (entity.id != entityToRemove.id)
          this.myEntities.push(entity);
      });
      this.subTrees = null;
    }
    else
      this.removeEntityFromSubTrees(entityToRemove);
  }

  removeEntityFromSubTrees = (entity) => {
    const subTreeIds = this.getSubTreeIds(entity);

    subTreeIds.forEach(id => {
      this.subTrees[id].removeEntity(entity);
    });
  }

  moveEntity = (entity, newLocation) => {
    this.removeEntity(entity);
    this.addEntity({...entity, ...newLocation});
  }

  getSubTreeIds = (entity) => {
    const {x, y, radius} = entity;
    const {x2, y2} = this.getxys();

    const inLeft = x-radius < x2;
    const inRight = x+radius > x2;
    const inTop = y-radius < y2;
    const inBottom = y+radius > y2;

    const subTreeIds = [];
    if (inLeft && inTop) subTreeIds.push(0);
    if (inRight && inTop) subTreeIds.push(1);
    if (inLeft && inBottom) subTreeIds.push(2);
    if (inRight && inBottom) subTreeIds.push(3);

    return subTreeIds;
  }

  toString = (pre = '') => {
    let s = '';
    s += `${pre}${this.containingEntityCount} | ${this.depth} | ${this.x1},${this.y1},${this.x2},${this.y2} | [${this.myEntities.map(x => x.id)}]\n`;
    this.subTrees && this.subTrees.forEach(qt => {
      s += `${qt.toString(pre + '\t')}`;
    });
    return s;
  }
}

export default Quadtree;
