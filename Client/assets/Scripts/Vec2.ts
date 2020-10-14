export class Vec2{
    public x: number;
    public y: number;

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    clone(){
        return new Vec2(this.x,this.y);
    }
    /**
     * 判断当前点是否与指定点相等。
     * @param other 指定点
     */
    equal(other: Vec2){
        return (this.x ==other.x)&&(this.y == other.y);
    }


    static equal2(v1: Vec2,v2: Vec2){
        return (v1.x ==v2.x)&&(v1.y == v2.y);
    }
}